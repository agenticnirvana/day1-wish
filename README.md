# Day 1 Wish — A New Chapter

A light, dreamy, interactive first-day-of-college surprise website. Built with HTML, CSS, and vanilla JavaScript — no build step required.

**Live site:** https://agenticnirvana.github.io/day1-wish/

## Run locally

Open `index.html` in your browser, or:

```bash
python3 -m http.server 8080
# visit http://localhost:8080
```

## Personalize

Edit the top of `script.js`:

```javascript
const CONFIG = {
  name: "FRIEND_NAME",       // Friend's name
  nickname: "Ms.whywhywhy",   // Fun nickname shown in UI
  password: "ms.maybe",       // Unlock password (never shown on screen)
  date: "August 17, 2026"     // Day 1 date
};
```

### Change wishes

Edit the `WISHES` array in `script.js`. Each wish has `text` (HTML allowed for `<em>` emphasis) and an `icon` (inline SVG).

### Add music

Place an MP3 at `assets/music.mp3`. The ♪ button in the corner plays/pauses it. Never autoplays. Works fine without the file.

## Experience flow

1. Landing — morning hero, "Ready for a new chapter?"
2. Password — unlock the secret
3. Day 1 reveal — date, "Day 1.", typewriter lines
4. Stars — tap 7 stars to reveal wishes one at a time
5. Encouragement — reassuring friend messages
6. Most important — emotional peak quote
7. Journey — "Go make this chapter your own story"
8. Finale — "Happy First Day :)" + replay

## Deploy to GitHub Pages

```bash
git add .
git commit -m "Update site"
git push origin main
```

Site auto-deploys from the `main` branch at:

```
https://YOUR_USERNAME.github.io/day1-wish/
```

## File structure

```
index.html
style.css
script.js
assets/
  music.mp3          (optional)
  mockup-reference.png
README.md
```

## Design notes

- Light, airy palette — no dark theme
- Friendly and uplifting — not romantic (no hearts, love symbols, or couple imagery)
- Mobile-first, respects `prefers-reduced-motion`
- Stars, sparkles, paper planes, clouds, flowers — journey metaphors only
