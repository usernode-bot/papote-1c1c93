# Papote app icon

Drawn in the Homeroom shared icon style for home screen tiles.

- **Glyph:** two speech bubbles, Lucide `messages-square` (ISC licence), white
  2px round strokes on its 24-unit grid, scaled × 12 into the middle 288 px.
- **Colour:** teal pair `#34D3C3` → `#0B7D84` (the hue for apps about kids),
  diagonal gradient top left to bottom right under a faint white gloss at the
  top left, with a soft drop shadow under the glyph.
- **Source:** `brand/icon.svg` (the platform's icon template). Rendered to
  `brand/icon.png`, 512 × 512, opaque, square corners, full bleed, no text.

Render command (any machine with one of these):

```sh
rsvg-convert -w 512 -h 512 brand/icon.svg -o brand/icon.png
npx --yes sharp-cli --input brand/icon.svg --output brand/icon.png resize 512 512
```

Declared in `dapp.json` as `{ "image": "brand/icon.png", "emoji": "💬" }`;
the emoji stays as the fallback should the image ever fail validation.
