# Papote — notes for Claude Code

This app runs on **Homeroom**. The platform conventions are the single
source of truth for platform-wide behavior (auth model, `USERNODE_ENV`,
public/private tables, "don't `git push`", etc.):

**Platform conventions (authoritative, always current):**
https://app.onhomeroom.com/claude.md

**Inside Homeroom** (its dev chat, and Homeroom bot's builds), do not
fetch that URL: what applies to your change is already in your
instructions, and the `homeroom` MCP server's
`get_platform_conventions` reads any one section of the conventions
when you need it. The two sections below are for working outside
Homeroom; skip them there.

**Anywhere else** (Claude Code run against this repo locally, or another
harness), fetch it at the start of each session. The hosted copy is
updated in place when platform rules change, so fetching it gives you
today's rules, not a stale snapshot.

## Connector permission prompts (outside Homeroom)

This repo ships `.claude/settings.json`, which allows the **read-only**
Homeroom connector calls (`mcp__homeroom__get_*`,
`…__list_*`, `…__whoami`) once you accept the workspace trust dialog.
See `.claude/README.md` for the whole story, including what to do if you
are still being prompted.

## Check that this checkout is current

You may be working in a fork of this app whose `main` is behind the app's
canonical repository, and nothing in the checkout says so: `git fetch origin`
compares the fork with itself. This matters before you **read** code to answer
a question about how the app behaves now, not only before you edit it.

The canonical repository is named in `.claude/homeroom-canonical-repo`. Check against
it, not against `origin`:

```sh
git fetch "$(cat .claude/homeroom-canonical-repo)" main
git merge-base --is-ancestor FETCH_HEAD HEAD && echo current || echo behind
```

`behind` means this checkout does not contain the canonical `main`. To answer
a question, read the canonical code instead (`git show FETCH_HEAD:<path>`,
`git grep <pattern> FETCH_HEAD`). To change code, start from the exact base
commit your Homeroom work order gives, and never merge or rebase onto the
canonical `main` yourself: which commit a change is diffed against decides
what the group votes on. With the Homeroom connector, `get_checkout_status`
answers the same question.

A session-start hook (`.claude/hooks/homeroom-freshness.sh`, see `.claude/README.md`) runs
this check for you and tells you when you are behind. It is silent offline, so
its silence is not proof the checkout is current. Inside Homeroom (its dev
chat, and Homeroom bot's builds) the platform fixes the base commit, and none
of this applies.

## About Papote

Un sujet de discussion parent-enfant chaque jour. Papote gives a parent one
conversation card a day, suited to their child's age (3 to 16): a main
question, two follow-ups and a tip for the parent. The parent swipes for
another topic, saves favourites, and taps « On en a parlé » to grow a daily
streak. The tone is warm and unhurried — one card, one conversation, one
job per screen.

## Design

This app's look, set by the first version's spec. Every later change
follows it, and updates it when a request changes the look on purpose.

- **Palette:** warm creams (ground cream, white surface, warm greys for
  text and lines) with a terracotta accent (the one action colour) and a
  soft sage for the parent tip. Values live in `styles/tailwind-input.css`
  as tokens (`--ground`, `--surface`, `--raised`, `--fg`, `--muted`,
  `--line`, `--accent`, `--on-accent`, `--sage`, `--sage-fg`), a light and
  a dark value each, the dark one in the same hues.
- **Signature element:** the topic card drawn like a trading card — a thick
  raised rim (a 6px ring in `--raised`), an age badge in the corner, the
  question in a large serif, speech-bubble icons on the follow-ups. The
  streak is a flame pill; the week is a row of seven bars. The word card
  reuses that rim, badge, section labels and tip box, and adds the
  pictogram square (a 64px rounded square in `--raised` with the drawing
  in `--accent`) and the quiet pills (synonyms and associations in
  `--raised`, not tappable).
- **Type scale:** `text-title`, `text-heading`, `text-body`, `text-small`
  in `tailwind.config.js`. The card's question is set in the serif stack
  (`ui-serif`), everything else in the rounded system sans.

The kit is in `styles/tailwind-input.css`: colour tokens with a light and
a dark value (named in `tailwind.config.js`), and a few components
(`page-column`, `btn-primary`, `btn-secondary`, `field`, `list`, `list-row`,
`card`, `section-label`, `skeleton`, `state-empty`, `state-error`).
Re-theme by changing the token values there, keeping every text pair at
4.5:1 or more in both looks.

- Colour comes only from the tokens (`bg-ground`, `bg-surface`,
  `text-fg`, `text-muted`, `border-line`, `bg-accent` with
  `text-on-accent`, ...): never a raw hex value or a stock palette class.
- Tap targets are at least 44 px; the buttons and fields already are.
- A field's label says what it is; its placeholder, if any, is an example
  that says so ("e.g. 5.0"), never a bare value that could pass for one
  already entered.
- Every screen that loads data has honest loading, empty and error states.
  Never show the empty state while loading or after a failure; an error says
  what failed, what still works, and offers Retry. Loading has the content's
  own shape (its rows, with `skeleton` bars for their text).
- No cards in cards, no uppercase eyebrows, no emoji as icons.
- The header shows no app mark (the spec's drawing has none).
- The main screen's drawn markup (the `usernode-spec-screens@1` block) is
  the visual target: keep its structure and `screens.css` classes, and fill
  its values from data.

## App-specific conventions

- **All four tables are `staging:private`** (`papote_profiles`,
  `papote_children`, `papote_talks`, `papote_favorites`): they hold
  personal data (a child's name and age, habits). Never drop the
  `COMMENT ON TABLE` lines.
- **Demo rows carry `is_demo = true`** and stay out of every `/api/state`
  answer that is not opened with `?demo=1`, so a plain route still shows
  its real state on a database where the demo wrote.
- **All dates are the client's local day** (`YYYY-MM-DD`, sent as `day`);
  the server accepts only a value within one day of `req.now`. Never use
  `NOW()` for what shows.
- **Topics are never generated**: they come from `public/topics.js`, 30
  hand-written topics in four age-band versions. The server only checks
  topic ids against the same file.
- The topic of the day is `topics[daysSinceEpoch(day) % 30]`, one stream
  for everyone. Passing a topic is not saved.
- **Words are never generated**: they come from `public/words.js`, 30
  hand-written words (verbs, nouns, adjectives) in the same four age bands.
  The word of the day is `words[daysSinceEpoch(day) % 30]`, the same
  stream as the topic, and it is never saved, faved or counted in the
  streak. The English twin lives in `public/words.en.js` (same ids, same
  order, same kinds, no `pic`: the client takes it from the French entry);
  `server.js` throws at boot if either file drifts.
- Up to five children per account (`papote_children`; the profile row
  keeps a `chosen_child_id` pointer). The card follows the chosen child;
  the streak, the talks and the favourites are the family's — keyed on
  the user, never on the child. Content stays within the platform's
  content rules — nothing mature, violent or about self-harm, in any age
  band.
- **Language:** the app speaks French or English. A FR / EN switch at the
  top of the main screen sets it; the choice stays on the phone
  (`localStorage`, `papote_lang`) and wins over the platform locale and
  the phone's language. Until a pill is tapped, the platform locale wins
  over the phone's, with French as the fallback. UI strings live in the `STRINGS` table in
  `public/index.html` (`fr` and `en`). Topics come from `public/topics.js`
  (the French source and the stream of record) and `public/topics.en.js`
  (same ids, same order, same bands); `server.js` throws at boot if the
  English file drifts. Topic ids are French slugs and are never shown.
