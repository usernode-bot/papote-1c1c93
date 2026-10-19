const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// The platform signs user-identity tokens with an RSA private key it never
// shares. Containers get only the PUBLIC half, so this app can verify who a
// user is but cannot mint an identity — and neither can any other app.
const JWT_PUBLIC_KEY = (process.env.USERNODE_JWT_PUBLIC_KEY || '')
  .replace(/\\n/g, '\n');

// Tokens are minted for one app: the audience is this app's numeric id, so a
// token issued for a different app is rejected below rather than accepted as
// a valid user.
const APP_AUDIENCE = process.env.USERNODE_APP_ID
  ? 'usernode:app:' + process.env.USERNODE_APP_ID
  : null;

// Visitors with no Homeroom account ("guests") may look around this app at
// its own address, read-only (every public app). The platform marks
// them with a token of their own: ES256, signed by a key of its own (its
// public half is USERNODE_GUEST_JWT_PUBLIC_KEY), this audience, `pur:
// 'guest'`, `guest: true`, and no id or username. Such a visitor is
// `req.guest`, never `req.user`, and every write they try is answered 401
// `account_required`, which the bridge turns into "Make an account to
// continue".
const GUEST_AUDIENCE = APP_AUDIENCE ? APP_AUDIENCE + ':guest' : null;
const GUEST_PUBLIC_KEY = (process.env.USERNODE_GUEST_JWT_PUBLIC_KEY || '')
  .replace(/\\n/g, '\n');

// Paths that stay open without authentication. Add a path here (and add it
// with `app.get`/`app.post` below) if you deliberately want it public.
// Everything else requires a valid platform-issued JWT.
const PUBLIC_API_PATHS = new Set(['/health']);

app.use(express.json());

// The platform's three centrally hosted files — the bridge, the native UI
// kit and the Tailwind runtime — are reachable at these paths on this app's
// OWN origin, so index.html can load them with a RELATIVE path and never
// name the platform's hostname. A hostname baked into an app is what breaks
// every app at once when the platform's domain moves.
//
// In production and on a staging preview the platform's edge answers these
// before the request ever reaches this process (a per-app Ingress rule on
// Kubernetes, the wildcard site's matcher on the docker runtime). This
// handler is what makes the same relative paths work under a plain
// `node server.js`, where there is no edge in front of the app at all.
//
// Registered BEFORE the auth middleware because these three files are
// public: the platform serves them anonymously from any app origin, and a
// login redirect arriving where a <script> was expected is exactly the
// failure a relative path is meant to avoid.
// The platform's origin, at RUNTIME, and ONLY from the variable the platform
// injects. No hostname is written into this file: a baked-in one is what left
// the whole fleet pointing at a domain the platform had moved away from.
// Unset only outside the platform (a plain local `node server.js`) — set
// USERNODE_PLATFORM_ORIGIN there too if you want the hosted assets locally.
const PLATFORM_ORIGIN = (process.env.USERNODE_PLATFORM_ORIGIN || '')
  .replace(/\/+$/, '');

app.get(/^\/usernode-(?:bridge|native|tailwind)\//, async (req, res) => {
  try {
    if (!PLATFORM_ORIGIN) return res.sendStatus(503);
    const upstream = await fetch(PLATFORM_ORIGIN + req.path);
    if (!upstream.ok) return res.sendStatus(upstream.status);
    const type = upstream.headers.get('content-type');
    if (type) res.type(type);
    // max-age=0 with revalidation, never a long TTL: the whole point of
    // central hosting is that a platform-side fix lands on the next load.
    res.set('Cache-Control', 'public, max-age=0, must-revalidate');
    return res.send(Buffer.from(await upstream.arrayBuffer()));
  } catch (err) {
    console.warn('hosted asset fetch failed: ' + err.message);
    return res.sendStatus(502);
  }
});

// "Now" for this request, as a Date: `req.now`, set for every request by
// the middleware below. Read the day and the time through it (and
// `usernode.now()` in the page), never `new Date()` or SQL's NOW(),
// wherever they decide what shows: a reminder, a rota, a deadline.
// Production always gets the real time. A staging preview may be shown as of
// a chosen moment: the platform opens it with `?un-now=<ISO time>`, and the
// page sends `usernode.now()` on as the `x-usernode-now` header. Only a
// staging container reads either. See "Time-dependent features" in the
// platform conventions.
const IS_STAGING = process.env.USERNODE_ENV === 'staging';
const PREVIEW_NOW = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/;
function requestNow(req) {
  const raw = IS_STAGING ? (req.headers['x-usernode-now'] || req.query['un-now']) : null;
  return typeof raw === 'string' && PREVIEW_NOW.test(raw) ? new Date(raw) : new Date();
}

// Verify platform-issued JWT if one was passed, then enforce auth on
// anything not explicitly marked public. The iframe adds `?token=…`
// on load; the frontend script forwards the token via `x-usernode-token`
// on subsequent fetches.
app.use((req, res, next) => {
  req.now = requestNow(req);
  const token = req.query.token || req.headers['x-usernode-token'];
  if (token && JWT_PUBLIC_KEY && APP_AUDIENCE) {
    try {
      // Pin the algorithm, issuer and audience. Without `algorithms` a
      // caller could hand us an HS256 token signed with the public PEM
      // (which every app knows) and forge any user.
      const claims = jwt.verify(token, JWT_PUBLIC_KEY, {
        algorithms: ['RS256'],
        issuer: 'usernode',
        audience: APP_AUDIENCE,
      });
      // `pur` names what the token is for. Only user-identity tokens
      // authenticate a person here.
      if (claims && claims.pur === 'iframe') req.user = claims;
    } catch {}
  }
  if (!req.user && token && GUEST_PUBLIC_KEY && GUEST_AUDIENCE) {
    try {
      const guest = jwt.verify(token, GUEST_PUBLIC_KEY, {
        algorithms: ['ES256'],
        issuer: 'usernode',
        audience: GUEST_AUDIENCE,
      });
      if (guest && guest.pur === 'guest' && guest.guest === true) req.guest = true;
    } catch {}
  }

  // Static assets (CSS/JS/images) are always served; the API and the HTML
  // shell are gated so direct hits to the staging/prod subdomain don't
  // leak app data to the public internet. A guest may READ: every GET,
  // `/api/*` included, so read routes must not assume req.user (use
  // `req.user ? req.user.id : null`). Every write needs an account.
  if (req.method !== 'GET' || req.path.startsWith('/api/')) {
    if (PUBLIC_API_PATHS.has(req.path)) return next();
    if (!req.user && req.guest) {
      if (req.method === 'GET' || req.method === 'HEAD') return next();
      return res.status(401).json({ error: 'account_required' });
    }
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// The template ships no favicon file; index.html carries an inline SVG
// icon instead. Answer 204 here so anything that still probes
// /favicon.ico (older browsers, direct visits) doesn't fall through to
// the auth-gated catch-all and surface a 401 in the console on every
// fresh load.
app.get('/favicon.ico', (_req, res) => res.status(204).end());

// ── Topics ────────────────────────────────────────────────────────────────
// The same hand-written library the client renders; the server only uses it
// to check that a topic id in a request actually exists.
const PAPOTE_TOPICS = require('./public/topics.js');

// The word of the day lives in the same hand-written library the client
// renders; the server only loads it to check the file's shape at boot.
const PAPOTE_WORDS = require('./public/words.js');

// ── Schema (applied idempotently on boot) ─────────────────────────────────
// Every table is personal data (names, ages, habits), so all three are
// marked `staging:private`: the schema is copied to staging, never the rows.
async function applySchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS papote_profiles (
      id bigserial PRIMARY KEY,
      user_id text NOT NULL,
      child_name text NOT NULL CHECK (char_length(child_name) BETWEEN 1 AND 40),
      child_age int NOT NULL CHECK (child_age BETWEEN 3 AND 16),
      reminder_time text CHECK (reminder_time IS NULL OR reminder_time ~ '^[0-2][0-9]:[0-5][0-9]$'),
      chosen boolean NOT NULL DEFAULT false,
      is_demo boolean NOT NULL DEFAULT false,
      created_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS papote_talks (
      user_id text NOT NULL,
      topic_id text NOT NULL,
      day date NOT NULL,
      is_demo boolean NOT NULL DEFAULT false,
      created_at timestamptz NOT NULL DEFAULT now(),
      PRIMARY KEY (user_id, topic_id, day)
    );
    CREATE TABLE IF NOT EXISTS papote_favorites (
      user_id text NOT NULL,
      topic_id text NOT NULL,
      is_demo boolean NOT NULL DEFAULT false,
      created_at timestamptz NOT NULL DEFAULT now(),
      PRIMARY KEY (user_id, topic_id)
    );
  `);
  // Upgrade of the first version's one-row-per-user table: give each row an
  // id, keep the existing child as the chosen one, and move the primary key
  // from user_id to id. Every statement is idempotent.
  await pool.query(`
    ALTER TABLE papote_profiles ADD COLUMN IF NOT EXISTS id bigserial;
    ALTER TABLE papote_profiles ADD COLUMN IF NOT EXISTS chosen boolean NOT NULL DEFAULT false;
    DO $$ BEGIN
      IF EXISTS (SELECT 1 FROM pg_index i
                 JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
                 WHERE i.indrelid = 'papote_profiles'::regclass AND i.indisprimary AND a.attname = 'user_id') THEN
        UPDATE papote_profiles SET chosen = true;
        ALTER TABLE papote_profiles DROP CONSTRAINT papote_profiles_pkey;
        ALTER TABLE papote_profiles ADD PRIMARY KEY (id);
      END IF;
    END $$;
    CREATE INDEX IF NOT EXISTS papote_profiles_user ON papote_profiles (user_id);
    CREATE UNIQUE INDEX IF NOT EXISTS papote_profiles_one_chosen ON papote_profiles (user_id) WHERE chosen;
  `);
  await pool.query("COMMENT ON TABLE papote_profiles IS 'staging:private'");
  await pool.query("COMMENT ON TABLE papote_talks IS 'staging:private'");
  await pool.query("COMMENT ON TABLE papote_favorites IS 'staging:private'");
}

// ── Day helpers ───────────────────────────────────────────────────────────
// The client sends its LOCAL day as YYYY-MM-DD (its "today" may differ from
// the server's). A value within one day of `req.now` is accepted; anything
// else (malformed, far future or past) is rejected.

// Calendar date -> days since the Unix epoch (UTC, whole days).
function daysSinceEpoch(day) {
  const [y, m, d] = day.split('-').map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86400000);
}

// Validate a client-supplied day against `req.now`; null when unusable.
function validDay(raw, now) {
  if (typeof raw !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
  const [y, m, d] = raw.split('-').map(Number);
  if (!y || m < 1 || m > 12 || d < 1 || d > 31) return null;
  const date = new Date(Date.UTC(y, m - 1, d));
  if (Number.isNaN(date.getTime())) return null;
  const nowDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  if (Math.abs(date - nowDay) > 86400000) return null;
  return raw;
}

// YYYY-MM-DD -> the previous / next calendar day.
function shiftDay(day, days) {
  return new Date(daysSinceEpoch(day) * 86400000 + days * 86400000)
    .toISOString().slice(0, 10);
}

// The Monday-start week containing `day`, as [{date, talked}].
function weekOf(day) {
  const dow = new Date(daysSinceEpoch(day) * 86400000).getUTCDay(); // 0=Sunday
  const monday = daysSinceEpoch(day) - ((dow + 6) % 7);
  return Array.from({ length: 7 }, (_, i) => new Date((monday + i) * 86400000).toISOString().slice(0, 10));
}

// Consecutive days with at least one talk, ending today — or yesterday when
// today has none yet: a streak still counts until the end of the day after
// the last talk.
function streakFrom(daysSet, today) {
  let cursor = daysSet.has(today) ? today : shiftDay(today, -1);
  let n = 0;
  while (daysSet.has(cursor)) {
    n += 1;
    cursor = shiftDay(cursor, -1);
  }
  return n;
}

const TOPIC_IDS = new Set(PAPOTE_TOPICS.topics.map((t) => t.id));

// The English twin file must mirror topics.js exactly (same topics, same
// order, same ids, every band complete): the topic of the day is one shared
// stream and the client falls back to French only if a band is missing. A
// mismatch fails at boot, so a broken translation can never deploy.
const PAPOTE_TOPICS_EN = require('./public/topics.en.js');
(function validateEnTopics() {
  const fr = PAPOTE_TOPICS.topics;
  const en = PAPOTE_TOPICS_EN.topics;
  if (!Array.isArray(en) || en.length !== fr.length) {
    throw new Error('topics.en.js: expected ' + fr.length + ' topics in the same order');
  }
  for (let i = 0; i < fr.length; i += 1) {
    if (en[i].id !== fr[i].id) {
      throw new Error('topics.en.js: topic ' + i + ' has id "' + en[i].id + '", expected "' + fr[i].id + '"');
    }
    for (const band of ['3-5', '6-9', '10-12', '13-16']) {
      const v = en[i][band];
      if (!v || typeof v.q !== 'string' || !v.q.trim()
        || !Array.isArray(v.followups) || v.followups.length !== 2 || v.followups.some((f) => typeof f !== 'string' || !f.trim())
        || typeof v.tip !== 'string' || !v.tip.trim()) {
        throw new Error('topics.en.js: topic "' + en[i].id + '" band "' + band + '" is missing q, two followups or a tip');
      }
    }
  }
})();

// The English twin file must mirror words.js exactly (same words, same
// order, same ids and kinds, every band complete): the word of the day is
// one shared stream and the client falls back to French only if a band is
// missing. A mismatch fails at boot, so a broken translation can never
// deploy.
const PAPOTE_WORDS_EN = require('./public/words.en.js');
(function validateWords() {
  const fr = PAPOTE_WORDS.words;
  if (!Array.isArray(fr) || fr.length !== 30) {
    throw new Error('words.js: expected 30 words, found ' + (fr ? fr.length : typeof fr));
  }
  const seen = new Set();
  for (let i = 0; i < fr.length; i += 1) {
    const w = fr[i];
    if (!w || typeof w.id !== 'string' || !w.id.trim()) {
      throw new Error('words.js: word ' + i + ' has no id');
    }
    if (seen.has(w.id)) throw new Error('words.js: duplicate id "' + w.id + '"');
    seen.add(w.id);
    if (w.kind !== 'verb' && w.kind !== 'noun' && w.kind !== 'adj') {
      throw new Error('words.js: word "' + w.id + '" has kind "' + w.kind + '", expected verb, noun or adj');
    }
    if (typeof w.word !== 'string' || !w.word.trim()) {
      throw new Error('words.js: word "' + w.id + '" has no word');
    }
    if (!Array.isArray(w.pic) || w.pic.length < 1 || w.pic.length > 4
      || w.pic.some((p) => typeof p !== 'string' || !p.trim())) {
      throw new Error('words.js: word "' + w.id + '" needs one to four pic paths');
    }
    for (const band of ['3-5', '6-9', '10-12', '13-16']) {
      const v = w[band];
      if (!v || typeof v.def !== 'string' || !v.def.trim()
        || !Array.isArray(v.synonyms) || v.synonyms.length < 2 || v.synonyms.length > 3 || v.synonyms.some((s) => typeof s !== 'string' || !s.trim())
        || typeof v.example !== 'string' || !v.example.trim()
        || !Array.isArray(v.associations) || v.associations.length !== 3 || v.associations.some((s) => typeof s !== 'string' || !s.trim())
        || typeof v.tip !== 'string' || !v.tip.trim()) {
        throw new Error('words.js: word "' + w.id + '" band "' + band + '" is missing def, two or three synonyms, an example, three associations or a tip');
      }
    }
  }
})();
(function validateEnWords() {
  const fr = PAPOTE_WORDS.words;
  const en = PAPOTE_WORDS_EN.words;
  if (!Array.isArray(en) || en.length !== fr.length) {
    throw new Error('words.en.js: expected ' + fr.length + ' words in the same order');
  }
  for (let i = 0; i < fr.length; i += 1) {
    if (en[i].id !== fr[i].id) {
      throw new Error('words.en.js: word ' + i + ' has id "' + en[i].id + '", expected "' + fr[i].id + '"');
    }
    if (en[i].kind !== fr[i].kind) {
      throw new Error('words.en.js: word "' + en[i].id + '" has kind "' + en[i].kind + '", expected "' + fr[i].kind + '"');
    }
    if (typeof en[i].word !== 'string' || !en[i].word.trim()) {
      throw new Error('words.en.js: word "' + en[i].id + '" has no word');
    }
    for (const band of ['3-5', '6-9', '10-12', '13-16']) {
      const v = en[i][band];
      if (!v || typeof v.def !== 'string' || !v.def.trim()
        || !Array.isArray(v.synonyms) || v.synonyms.length < 2 || v.synonyms.length > 3 || v.synonyms.some((s) => typeof s !== 'string' || !s.trim())
        || typeof v.example !== 'string' || !v.example.trim()
        || !Array.isArray(v.associations) || v.associations.length !== 3 || v.associations.some((s) => typeof s !== 'string' || !s.trim())
        || typeof v.tip !== 'string' || !v.tip.trim()) {
        throw new Error('words.en.js: word "' + en[i].id + '" band "' + band + '" is missing def, two or three synonyms, an example, three associations or a tip');
      }
    }
  }
})();

// ── Routes ────────────────────────────────────────────────────────────────

function requireUser(req, res) {
  if (!req.user) {
    res.status(401).json({ error: 'account_required' });
    return false;
  }
  return true;
}

app.get('/api/state', async (req, res) => {
  try {
    const day = validDay(req.query.day, req.now) || new Date(Date.UTC(req.now.getUTCFullYear(), req.now.getUTCMonth(), req.now.getUTCDate())).toISOString().slice(0, 10);
    if (!req.user) {
      // Guests get a null profile (the page keeps its read-only copy) and no
      // personal data of anyone's.
      return res.json({
        profile: null,
        children: [],
        guest: true,
        streak: 0,
        week: weekOf(day).map((d) => ({ date: d, talked: false })),
        talkedToday: [],
        favorites: [],
      });
    }
    const userId = req.user.id;
    const demo = IS_STAGING && req.query.demo === '1';
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      if (demo) await writeDemo(client, userId, day);
      // Demo rows are marked is_demo and stay out of every answer that does
      // not ask for them, so a plain route still shows a real (or empty)
      // state even on a database where the demo wrote.
      const demoFilter = demo ? '' : ' AND is_demo = false';
      const profilesR = await client.query(`SELECT id::text AS id, child_name, child_age, reminder_time, chosen FROM papote_profiles WHERE user_id = $1${demoFilter} ORDER BY created_at, id`, [userId]);
      const talksR = await client.query(`SELECT day::text AS day, topic_id FROM papote_talks WHERE user_id = $1${demoFilter}`, [userId]);
      const favsR = await client.query(`SELECT topic_id, created_at FROM papote_favorites WHERE user_id = $1${demoFilter} ORDER BY created_at`, [userId]);
      await client.query('COMMIT');
      // The chosen child, else the first one: on a plain view the chosen row
      // may be a demo one and is left out of this answer.
      const p = profilesR.rows.find((r) => r.chosen) || profilesR.rows[0] || null;
      const daysSet = new Set(talksR.rows.map((r) => r.day));
      return res.json({
        profile: p ? { id: p.id, child_name: p.child_name, child_age: p.child_age, reminder_time: p.reminder_time } : null,
        children: profilesR.rows.map((r) => ({ id: r.id, child_name: r.child_name, child_age: r.child_age })),
        guest: false,
        streak: streakFrom(daysSet, day),
        week: weekOf(day).map((d) => ({ date: d, talked: daysSet.has(d) })),
        talkedToday: talksR.rows.filter((r) => r.day === day).map((r) => r.topic_id),
        favorites: favsR.rows.map((r) => ({ topic_id: r.topic_id, created_at: r.created_at })),
      });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('GET /api/state failed: ' + err.message);
    return res.status(500).json({ error: 'server_error' });
  }
});

// Body of a child create/edit, validated. Returns { error } or the values.
function parseChild(body) {
  const { child_name, child_age, reminder_time } = body || {};
  if (typeof child_name !== 'string' || child_name.trim().length < 1 || child_name.trim().length > 40) {
    return { error: 'invalid_name' };
  }
  const age = Number(child_age);
  if (!Number.isInteger(age) || age < 3 || age > 16) {
    return { error: 'invalid_age' };
  }
  let reminder = null;
  if (reminder_time != null) {
    if (typeof reminder_time !== 'string' || !/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(reminder_time)) {
      return { error: 'invalid_reminder_time' };
    }
    reminder = reminder_time;
  }
  return { child_name: child_name.trim(), child_age: age, reminder_time: reminder };
}

const MAX_CHILDREN = 5;
const CHILD_ID = /^\d+$/;

// Serialises child writes for one user inside a transaction. An advisory
// lock keyed on the user id is what covers the empty case too: `SELECT ...
// FOR UPDATE` locks nothing when there is no row yet, and two requests
// racing on a fresh account would both insert a chosen child.
async function lockChildren(client, userId) {
  await client.query("SELECT pg_advisory_xact_lock(hashtext('papote_children:' || $1))", [userId]);
}

app.post('/api/children', async (req, res) => {
  if (!requireUser(req, res)) return;
  const child = parseChild(req.body);
  if (child.error) return res.status(400).json({ error: child.error });
  const userId = req.user.id;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Two tabs adding at once are serialised here, so the cap holds.
    await lockChildren(client, userId);
    await client.query('SELECT 1 FROM papote_profiles WHERE user_id = $1 FOR UPDATE', [userId]);
    const countR = await client.query('SELECT count(*)::int AS n FROM papote_profiles WHERE user_id = $1 AND is_demo = false', [userId]);
    if (countR.rows[0].n >= MAX_CHILDREN) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'too_many_children' });
    }
    // Moving the chosen flag is two statements: the unique index is checked
    // row by row.
    await client.query('UPDATE papote_profiles SET chosen = false WHERE user_id = $1 AND chosen', [userId]);
    const insR = await client.query(
      `INSERT INTO papote_profiles (user_id, child_name, child_age, reminder_time, chosen)
       VALUES ($1, $2, $3, $4, true) RETURNING id::text AS id`,
      [userId, child.child_name, child.child_age, child.reminder_time]
    );
    await client.query('COMMIT');
    return res.json({ ok: true, id: insR.rows[0].id });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('POST /api/children failed: ' + err.message);
    return res.status(500).json({ error: 'server_error' });
  } finally {
    client.release();
  }
});

app.put('/api/children/:id', async (req, res) => {
  if (!requireUser(req, res)) return;
  if (!CHILD_ID.test(req.params.id)) return res.status(404).json({ error: 'unknown_child' });
  const child = parseChild(req.body);
  if (child.error) return res.status(400).json({ error: child.error });
  try {
    const r = await pool.query(
      `UPDATE papote_profiles SET child_name = $1, child_age = $2, reminder_time = $3, is_demo = false
       WHERE id = $4 AND user_id = $5 RETURNING id`,
      [child.child_name, child.child_age, child.reminder_time, req.params.id, req.user.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ error: 'unknown_child' });
    return res.json({ ok: true });
  } catch (err) {
    console.error('PUT /api/children failed: ' + err.message);
    return res.status(500).json({ error: 'server_error' });
  }
});

app.post('/api/children/:id/choose', async (req, res) => {
  if (!requireUser(req, res)) return;
  if (!CHILD_ID.test(req.params.id)) return res.status(404).json({ error: 'unknown_child' });
  const userId = req.user.id;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await lockChildren(client, userId);
    const owned = await client.query('SELECT 1 FROM papote_profiles WHERE id = $1 AND user_id = $2', [req.params.id, userId]);
    if (owned.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'unknown_child' });
    }
    await client.query('UPDATE papote_profiles SET chosen = false WHERE user_id = $1 AND chosen', [userId]);
    await client.query('UPDATE papote_profiles SET chosen = true WHERE id = $1 AND user_id = $2', [req.params.id, userId]);
    await client.query('COMMIT');
    return res.json({ ok: true });
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('POST /api/children/:id/choose failed: ' + err.message);
    return res.status(500).json({ error: 'server_error' });
  } finally {
    client.release();
  }
});

app.post('/api/talks', async (req, res) => {
  if (!requireUser(req, res)) return;
  const { topic_id, day } = req.body || {};
  if (!TOPIC_IDS.has(topic_id)) return res.status(400).json({ error: 'unknown_topic' });
  const d = validDay(day, req.now);
  if (!d) return res.status(400).json({ error: 'invalid_day' });
  try {
    await pool.query(
      `INSERT INTO papote_talks (user_id, topic_id, day) VALUES ($1, $2, $3)
       ON CONFLICT (user_id, topic_id, day) DO UPDATE SET is_demo = false`,
      [req.user.id, topic_id, d]
    );
    return res.json({ ok: true });
  } catch (err) {
    console.error('POST /api/talks failed: ' + err.message);
    return res.status(500).json({ error: 'server_error' });
  }
});

app.delete('/api/talks/:topic_id', async (req, res) => {
  if (!requireUser(req, res)) return;
  const d = validDay(req.query.day, req.now);
  if (!d) return res.status(400).json({ error: 'invalid_day' });
  try {
    await pool.query('DELETE FROM papote_talks WHERE user_id = $1 AND topic_id = $2 AND day = $3', [req.user.id, req.params.topic_id, d]);
    return res.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/talks failed: ' + err.message);
    return res.status(500).json({ error: 'server_error' });
  }
});

app.put('/api/favorites/:topic_id', async (req, res) => {
  if (!requireUser(req, res)) return;
  if (!TOPIC_IDS.has(req.params.topic_id)) return res.status(400).json({ error: 'unknown_topic' });
  try {
    await pool.query(
      `INSERT INTO papote_favorites (user_id, topic_id) VALUES ($1, $2)
       ON CONFLICT (user_id, topic_id) DO UPDATE SET is_demo = false`,
      [req.user.id, req.params.topic_id]
    );
    return res.json({ ok: true });
  } catch (err) {
    console.error('PUT /api/favorites failed: ' + err.message);
    return res.status(500).json({ error: 'server_error' });
  }
});

app.delete('/api/favorites/:topic_id', async (req, res) => {
  if (!requireUser(req, res)) return;
  try {
    await pool.query('DELETE FROM papote_favorites WHERE user_id = $1 AND topic_id = $2', [req.user.id, req.params.topic_id]);
    return res.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/favorites failed: ' + err.message);
    return res.status(500).json({ error: 'server_error' });
  }
});

// ── Staging demo ──────────────────────────────────────────────────────────
// `?demo=1` on staging, first /api/state of a viewer with no profile: write
// two children (Léa chosen, Tom), a 12-day family streak and 8 favourites, in
// one transaction. Rows are demo data for the viewer themself (this app's
// first version, per the platform's demo rule).
async function writeDemo(client, userId, today) {
  const startedAt = Date.now();
  // Only when the viewer has no profile at all (demo or real). The lock stops
  // two first requests of the same viewer from writing it twice.
  await lockChildren(client, userId);
  const existing = await client.query('SELECT 1 FROM papote_profiles WHERE user_id = $1', [userId]);
  if (existing.rows.length > 0) return;
  await client.query(
    `INSERT INTO papote_profiles (user_id, child_name, child_age, reminder_time, chosen, is_demo)
     VALUES ($1, 'Léa', 7, '19:00', true, true), ($1, 'Tom', 12, NULL, false, true)`,
    [userId]
  );
  // Talks on each of the 12 days before today: a 12-day streak, today free.
  for (let i = 1; i <= 12; i += 1) {
    const day = shiftDay(today, -i);
    const topicId = PAPOTE_TOPICS.topics[daysSinceEpoch(day) % PAPOTE_TOPICS.topics.length].id;
    await client.query(
      `INSERT INTO papote_talks (user_id, topic_id, day, is_demo) VALUES ($1, $2, $3, true)
       ON CONFLICT (user_id, topic_id, day) DO NOTHING`,
      [userId, topicId, day]
    );
  }
  // 8 favourites across varied themes and age bands.
  const favIds = ['peur', 'jour-parfait', 'animaux', 'musique', 'écran', 'copains', 'trésor', 'courage'];
  for (const topicId of favIds) {
    await client.query(
      `INSERT INTO papote_favorites (user_id, topic_id, is_demo) VALUES ($1, $2, true)
       ON CONFLICT (user_id, topic_id) DO NOTHING`,
      [userId, topicId]
    );
  }
  console.log('demo data written in ' + (Date.now() - startedAt) + ' ms');
}

app.use(express.static(path.join(__dirname, 'public')));

// HTML shell: serve the app if authenticated. Unauthenticated top-level
// visits (share links pasted into a browser — Sec-Fetch-Dest: document)
// are sent to the platform's chromeless view of this app, where the shell
// embeds it with a real token so the link just works. Every other
// tokenless case (iframe loads with an expired token, old browsers
// without Sec-Fetch-*) gets the "open in Homeroom" landing page instead
// of a redirect, so the platform shell is never loaded INSIDE its own
// app iframe and stray visits still don't reveal the app.
app.get('*', (req, res) => {
  if (!req.user && !req.guest) {
    // Deep-link pass-through (platform #743): carry the visited
    // path+query into the chromeless view so share links land on the
    // shared screen, not Home. The clean platform route stores `path`
    // as one encoded query value so an inner ?, &, or = survives. The
    // shell decodes and validates it as relative-only before use. The
    // character test keeps the
    // value attribute-safe for the landing anchor below — anything
    // unusual falls back to the bare link.
    const deepPath = /^\/[A-Za-z0-9\-._~!$&()*+,;=:@\/%?]*$/.test(req.originalUrl)
      ? '?path=' + encodeURIComponent(req.originalUrl) : '';
    if (PLATFORM_ORIGIN && req.get('sec-fetch-dest') === 'document') {
      return res.redirect(302, PLATFORM_ORIGIN + '/app/papote-1c1c93/full' + deepPath);
    }
    return res.status(401).send(`<!doctype html><meta charset=utf-8><title>Open in Homeroom</title>
<body style="font-family:system-ui;background:#09090b;color:#e4e4e7;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0">
  <div style="max-width:24rem;padding:2rem;text-align:center">
    <h1 style="font-size:1.25rem;margin:0 0 0.5rem">Open this app inside Homeroom</h1>
    <p style="color:#a1a1aa;font-size:0.9rem;margin:0 0 1.25rem">This page is served via the platform; direct visits aren't authenticated.</p>
    <a href="${PLATFORM_ORIGIN}/app/papote-1c1c93/full${deepPath}" style="display:inline-block;padding:0.5rem 1rem;background:#7c3aed;color:white;border-radius:0.5rem;text-decoration:none;font-size:0.9rem">Open in Homeroom</a>
  </div>
</body>`);
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Lifecycle ─────────────────────────────────────────────────────────────
let server = null;
let closing = false;

async function start() {
  await applySchema();
  server = app.listen(port, () => console.log(`Listening on :${port}`));
  // Let Envoy retire idle upstream connections at 60s, with a 15s margin.
  server.keepAliveTimeout = 75_000;
}

// Stop accepting, drain for about 3 s, close the pool, exit.
async function shutdown(signal) {
  if (closing) return;
  closing = true;
  console.log(`${signal}: shutting down`);
  if (server) {
    server.close();
    if (server.closeIdleConnections) server.closeIdleConnections();
  }
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await pool.end();
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));


start().catch(err => { console.error(err); process.exit(1); });
