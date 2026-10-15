# Papote

Un sujet de discussion parent-enfant chaque jour.

Papote gives a parent one conversation card a day, suited to their child's
age (3 to 16). Each card has a main question, two follow-up questions and a
tip for the parent. The parent can swipe to another topic, save favourites,
and tap « On en a parlé » to grow a daily streak.

## How it works

- **Onboarding** asks the child's first name and age — nothing else.
- **Today** shows one large topic card. Topics come from a hand-written
  library of 30 topics (`public/topics.js`), each written in a version for
  the four age bands (3-5, 6-9, 10-12, 13-16). Everyone gets the same
  daily topic, one stream.
- **Pass** by swiping the card or tapping the double-arrow button. Passing
  is not saved: reopening the app shows today's topic again.
- **Favourites** are saved per topic; the Favoris tab lists them.
- **« On en a parlé »** marks the day as talked about; the flame pill counts
  consecutive days (the streak) and the week row fills in.
- **Daily reminder**: Homeroom cannot send phone notifications to apps yet,
  so the reminder is in-app — after the chosen time on a day with no talk,
  a soft line appears above the card.

## Under the hood

- Node + Express + Postgres (schema applied idempotently on boot). All
  three tables (`papote_profiles`, `papote_talks`, `papote_favorites`) are
  `staging:private`.
- Styling is Tailwind, precompiled by `npm run build` during the image
  build, in a light and a dark look that follow the viewer's Homeroom
  theme. The design kit lives in `styles/tailwind-input.css`.
- Staging demo: open a staging preview with `?demo=1` to see the app
  populated as Léa, 7 ans, with a 12-day streak and 8 favourites.

To change this app, ask Homeroom bot: open the app on Homeroom, tap the
Homeroom icon in the header, then **Suggest an improvement**. You can also
run Claude Code against this repo directly; start with `CLAUDE.md`.
