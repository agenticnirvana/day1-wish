# Day 1 Wish — A New Chapter

A cinematic, single-page personal website for a friend's first day of college. Built with plain HTML, CSS, and vanilla JavaScript — no build step required.

## Run locally

1. Clone or download this repository.
2. Open `index.html` in your browser (double-click, or use a local server).

Optional local server:

```bash
# Python
python3 -m http.server 8080

# Then visit http://localhost:8080
```

## Personalize

All customization lives at the top of `script.js`:

```javascript
const CONFIG = {
  name: "FRIEND_NAME",   // Your friend's name
  password: "ms",          // Secret unlock password
  date: "August 17, 2026"  // Display date on Screen 3
};
```

### Change the friend's name

Edit `CONFIG.name` in `script.js`. The name is wired through the config object so you don't need to hunt through HTML files.

### Change the password

Edit `CONFIG.password` in `script.js`. The password is never shown on the page.

### Add music

1. Place an MP3 file at `assets/music.mp3`.
2. The ♪ button in the corner will play/pause it.
3. Music never autoplays — the visitor chooses when to listen.
4. If the file is missing, the site works normally without errors.

## Deploy on GitHub Pages

1. Create a new GitHub repository (e.g. `day1-wish`).
2. Push this project to the repository:

```bash
git init
git add .
git commit -m "Add Day 1 wish website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/day1-wish.git
git push -u origin main
```

3. On GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then click **Save**.
6. After a minute or two, your site will be live at:

```
https://YOUR_USERNAME.github.io/day1-wish/
```

## File structure

```
day1wish/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── music.mp3   (optional)
└── README.md
```

## Features

- 7-screen interactive journey: landing → password → moment → message → wish → memory → finale
- Cinematic dark theme with glassmorphism and floating particles
- Mobile-first, responsive layout
- Optional background music
- Respects `prefers-reduced-motion`
- Replay button to experience the journey again

## Browser support

Works in modern mobile and desktop browsers: Safari (iOS), Chrome (Android), Chrome, Firefox, and Edge.
