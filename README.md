# Day 1 Wish — A New Chapter

A cinematic, single-page personal website for a friend's first day of college. Soft lavender Ghibli-inspired design with interactive star wishes — built with plain HTML, CSS, and vanilla JavaScript.

## Run locally

1. Clone or download this repository.
2. Open `index.html` in your browser (double-click, or use a local server).

Optional local server:

```bash
python3 -m http.server 8080
# Then visit http://localhost:8080
```

## Personalize

Edit the top of `script.js`:

```javascript
const CONFIG = {
  name: "FRIEND_NAME",   // Your friend's name
  password: "ms",          // Secret unlock password
  date: "August 17, 2026"
};
```

When you set her name, the landing line and footer cheer message personalize automatically.

### Add music

Place an MP3 at `assets/music.mp3`. The ♪ button plays/pauses it (never autoplays). Works fine without the file.

## Deploy on GitHub Pages

Already configured for [agenticnirvana/day1-wish](https://github.com/agenticnirvana/day1-wish).

Live site: **https://agenticnirvana.github.io/day1-wish/**

To push updates:

```bash
git add .
git commit -m "Your message"
git push
```

## Experience flow

1. **Landing** — Hero illustration, "Ready for a new chapter?"
2. **Password** — Unlock with the secret password
3. **Stars** — Tap each star to reveal a personal wish
4. **Wish list** — All wishes with icons, "And more…"
5. **Most important** — The heartfelt quote
6. **Final** — "Go make this chapter your own story" + replay

## File structure

```
day1wish/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── music.mp3        (optional)
│   └── mockup-reference.png
└── README.md
```
