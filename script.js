/* ============================================
   New Chapter — Day 1 Wish
   Edit CONFIG below to personalize
   ============================================ */

const CONFIG = {
  name: "FRIEND_NAME",
  nickname: "Ms.whywhywhy",
  password: "ms.maybe",
  date: "August 17, 2026",
  finaleWord: "ms.maybe",
  musicVolume: 0.45,
  bonusMusic: "assets/ishq-mubarak.mp3"
};

const screens = {
  landing: document.getElementById("screen-landing"),
  password: document.getElementById("screen-password"),
  moment: document.getElementById("screen-moment"),
  message: document.getElementById("screen-message"),
  wish: document.getElementById("screen-wish"),
  memory: document.getElementById("screen-memory"),
  final: document.getElementById("screen-final")
};

const btnOpen = document.getElementById("btn-open");
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const passwordError = document.getElementById("password-error");
const lockIcon = document.getElementById("lock-icon");
const unlockFlash = document.getElementById("unlock-flash");
const momentDate = document.getElementById("moment-date");
const momentLine1 = document.getElementById("moment-line-1");
const momentLine2 = document.getElementById("moment-line-2");
const btnLastThing = document.getElementById("btn-last-thing");
const memoryCard = document.getElementById("memory-card");
const btnReplay = document.getElementById("btn-replay");
const musicBtn = document.getElementById("music-btn");
const musicEl = document.getElementById("music");
const particlesCanvas = document.getElementById("particles");
const nicknameBadge = document.getElementById("nickname-badge");
const nicknameWhisper = document.getElementById("nickname-whisper");
const finalGreeting = document.getElementById("final-greeting");
const finalOldText = document.getElementById("final-old-text");
const finalSlash = document.getElementById("final-slash");
const finalTypewriter = document.getElementById("final-typewriter");
const finalEyebrow = document.getElementById("final-eyebrow");
const finalNote = document.getElementById("final-note");
const finalStar = document.getElementById("final-star");

let currentScreen = "landing";
let particleBoost = 1;
let confettiCanvas = null;
let animationTimers = [];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const TIMING = {
  typeSpeed: 54,
  momentBefore: 900,
  momentBetween: 1400,
  momentAfter: 3400,
  revealBase: 900,
  revealStagger: 1100,
  revealPause: 1800,
  waitMessage: 3200,
  waitWish: 4000,
  memoryStagger: 700,
  memoryWait: 4500
};

/* ============================================
   Navigation
   ============================================ */

function showScreen(name) {
  const prev = screens[currentScreen];
  const next = screens[name];
  if (!next || name === currentScreen) return;

  if (prev) {
    prev.classList.add("is-leaving");
    prev.classList.remove("screen--active");
    setTimeout(() => {
      prev.hidden = true;
      prev.classList.remove("is-leaving");
    }, 700);
  }

  next.hidden = false;
  requestAnimationFrame(() => next.classList.add("screen--active"));
  currentScreen = name;

  switch (name) {
    case "moment": runMomentSequence(); break;
    case "message": runRevealSequence(screens.message); break;
    case "wish": runRevealSequence(screens.wish); break;
    case "final": runFinalSequence(); break;
  }
}

function resetAllScreens() {
  clearTimers();
  Object.values(screens).forEach((screen) => {
    screen.hidden = screen !== screens.landing;
    screen.classList.remove("screen--active", "is-leaving");
  });
  screens.landing.classList.add("screen--active");
  screens.landing.hidden = false;
  currentScreen = "landing";

  passwordInput.value = "";
  passwordError.textContent = "";
  passwordError.classList.remove("is-visible");
  lockIcon.classList.remove("is-unlocked");

  memoryCard.hidden = true;
  memoryCard.classList.remove("is-visible");
  memoryCard.querySelectorAll(".memory-line").forEach((line) => {
    line.classList.remove("is-visible");
  });

  btnLastThing.hidden = false;
  btnLastThing.style.opacity = "1";
  btnLastThing.style.transition = "";
  btnLastThing.classList.remove("is-clicked");

  if (bonusMusicPlayed) {
    bonusMusicPlayed = false;
    switchToTrack(MUSIC_SRC, false);
  }

  resetRevealLines(screens.message);
  resetRevealLines(screens.wish);

  momentLine1.textContent = "";
  momentLine2.textContent = "";
  momentLine2.classList.remove("moment-line--accent");

  particleBoost = 1;
  pauseMusic();
  musicBtn.classList.remove("is-playing");
  musicBtn.classList.add("music-btn--hint");
  replayLandingAnimations();
  resetFinalState();
}

function replayLandingAnimations() {
  screens.landing.querySelectorAll(".landing-anim").forEach((el) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "";
  });
}

function resetFinalState() {
  if (finalEyebrow) finalEyebrow.classList.remove("is-visible");
  if (finalOldText) {
    finalOldText.classList.remove("is-visible", "is-cut");
    finalOldText.hidden = false;
  }
  if (finalSlash) finalSlash.classList.remove("is-active");
  if (finalTypewriter) {
    finalTypewriter.textContent = "";
    finalTypewriter.hidden = true;
    finalTypewriter.classList.remove("is-done");
  }
  [finalGreeting, finalNote, finalStar, btnReplay].forEach((el) => {
    if (el) {
      el.hidden = true;
      el.classList.remove("is-visible");
    }
  });
}

async function runFinalSequence() {
  resetFinalState();

  if (finalEyebrow) finalEyebrow.classList.add("is-visible");
  await delay(prefersReducedMotion ? 150 : 600);

  if (finalOldText) finalOldText.classList.add("is-visible");
  await delay(prefersReducedMotion ? 300 : 2000);

  if (finalSlash) finalSlash.classList.add("is-active");
  if (finalOldText) finalOldText.classList.add("is-cut");
  await delay(prefersReducedMotion ? 200 : 650);

  if (finalOldText) finalOldText.hidden = true;
  if (finalTypewriter) {
    finalTypewriter.hidden = false;
    await typeText(finalTypewriter, CONFIG.finaleWord || "ms.maybe", false, true);
    finalTypewriter.classList.add("is-done");
  }

  await delay(prefersReducedMotion ? 200 : 900);

  const reveals = [finalGreeting, finalNote, finalStar, btnReplay];
  for (const el of reveals) {
    if (!el) continue;
    el.hidden = false;
    await delay(prefersReducedMotion ? 80 : 450);
    el.classList.add("is-visible");
  }
}

function resetFinalAnimations() {
  resetFinalState();
}

function clearTimers() {
  animationTimers.forEach(clearTimeout);
  animationTimers = [];
}

function delay(ms) {
  return new Promise((resolve) => {
    animationTimers.push(setTimeout(resolve, ms));
  });
}

/* ============================================
   Password
   ============================================ */

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handlePasswordSubmit();
});

function handlePasswordSubmit() {
  const value = passwordInput.value.trim().toLowerCase();

  if (value === CONFIG.password.toLowerCase()) {
    passwordError.classList.remove("is-visible");
    triggerUnlock();
  } else {
    passwordError.textContent = "Nice try. You know this one ;)";
    passwordError.classList.add("is-visible");
    passwordInput.classList.add("shake");
    setTimeout(() => passwordInput.classList.remove("shake"), 400);
  }
}

async function triggerUnlock() {
  lockIcon.classList.add("is-unlocked");
  unlockFlash.classList.add("is-active");
  particleBoost = 2.2;

  await delay(prefersReducedMotion ? 300 : 800);
  unlockFlash.classList.remove("is-active");

  await delay(prefersReducedMotion ? 200 : 500);
  showScreen("moment");
}

passwordInput.addEventListener("input", () => {
  passwordError.classList.remove("is-visible");
});

/* ============================================
   Moment — typewriter
   ============================================ */

async function runMomentSequence() {
  momentDate.textContent = CONFIG.date;

  await delay(prefersReducedMotion ? 100 : TIMING.momentBefore);
  await typeText(momentLine1, "Not just Day 1 of college…");
  await delay(prefersReducedMotion ? 200 : TIMING.momentBetween);
  await typeText(momentLine2, "…the first page of a story that's actually yours.", true);
  await delay(prefersReducedMotion ? 400 : TIMING.momentAfter);
  showScreen("message");
}

function typeText(el, text, isAccent, isFinale) {
  if (prefersReducedMotion) {
    el.textContent = text;
    if (isAccent) el.classList.add("moment-line--accent");
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    el.textContent = "";
    let i = 0;
    const speed = isFinale ? TIMING.typeSpeed + 18 : TIMING.typeSpeed;

    const cursor = document.createElement("span");
    cursor.className = "cursor";
    el.appendChild(cursor);

    function tick() {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
        animationTimers.push(setTimeout(tick, speed));
      } else {
        cursor.remove();
        if (isAccent) el.classList.add("moment-line--accent");
        resolve();
      }
    }

    tick();
  });
}

/* ============================================
   Staggered reveal lines
   ============================================ */

function resetRevealLines(screen) {
  screen.querySelectorAll(".reveal-line").forEach((line) => {
    line.classList.remove("is-visible");
  });
}

async function runRevealSequence(screen) {
  const lines = screen.querySelectorAll(".reveal-line");
  const baseDelay = prefersReducedMotion ? 80 : TIMING.revealBase;
  const stagger = prefersReducedMotion ? 120 : TIMING.revealStagger;

  for (let i = 0; i < lines.length; i++) {
    await delay(i === 0 ? baseDelay : stagger);
    lines[i].classList.add("is-visible");

    if (lines[i].classList.contains("reveal-line--pause")) {
      await delay(prefersReducedMotion ? 200 : TIMING.revealPause);
    }
  }

  const nextScreen = screen === screens.message ? "wish"
    : screen === screens.wish ? "memory"
    : null;

  if (nextScreen) {
    const extraWait = screen === screens.wish ? TIMING.waitWish : TIMING.waitMessage;
    await delay(prefersReducedMotion ? 400 : extraWait);
    showScreen(nextScreen);
  }
}

/* ============================================
   Memory moment
   ============================================ */

btnLastThing.addEventListener("click", async () => {
  btnLastThing.classList.add("is-clicked");
  btnLastThing.style.opacity = "0";
  btnLastThing.style.transition = "opacity 0.4s";
  setTimeout(() => { btnLastThing.hidden = true; }, 400);

  playBonusTrack();
  burstConfetti();
  memoryCard.hidden = false;
  requestAnimationFrame(() => memoryCard.classList.add("is-visible"));

  const memoryLines = memoryCard.querySelectorAll(".memory-line");
  for (let i = 0; i < memoryLines.length; i++) {
    await delay(prefersReducedMotion ? 80 : TIMING.memoryStagger);
    memoryLines[i].classList.add("is-visible");
  }

  await delay(prefersReducedMotion ? 600 : TIMING.memoryWait);
  showScreen("final");
});

/* ============================================
   Confetti
   ============================================ */

function burstConfetti() {
  if (prefersReducedMotion) return;

  if (!confettiCanvas) {
    confettiCanvas = document.createElement("canvas");
    confettiCanvas.id = "confetti-canvas";
    document.body.appendChild(confettiCanvas);
  }

  const ctx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const colors = ["#B58AEF", "#FF9DB8", "#F7C978", "#7EC8E3", "#E9DEFF"];
  const pieces = [];
  const count = 55;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const speed = 2 + Math.random() * 4;
    pieces.push({
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      w: 3 + Math.random() * 5,
      h: 6 + Math.random() * 6,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
      decay: 0.008 + Math.random() * 0.008
    });
  }

  let frame = 0;
  const maxFrames = 120;

  function draw() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let alive = false;

    pieces.forEach((p) => {
      if (p.life <= 0) return;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06;
      p.rot += p.vr;
      p.life -= p.decay;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    frame++;
    if (alive && frame < maxFrames) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  draw();
}

/* ============================================
   Particles
   ============================================ */

(function initParticles() {
  if (!particlesCanvas) return;

  const ctx = particlesCanvas.getContext("2d");
  let particles = [];
  let w, h;

  function resize() {
    w = particlesCanvas.width = window.innerWidth;
    h = particlesCanvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: -(Math.random() * 0.25 + 0.05),
      opacity: Math.random() * 0.4 + 0.12,
      twinkle: Math.random() * Math.PI * 2
    };
  }

  function init() {
    resize();
    const count = Math.min(95, Math.floor((w * h) / 11000));
    particles = Array.from({ length: count }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const boost = particleBoost;

    particles.forEach((p) => {
      p.x += p.speedX * boost;
      p.y += p.speedY * boost;
      p.twinkle += 0.02;

      if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
      if (p.x < -5) p.x = w + 5;
      if (p.x > w + 5) p.x = -5;

      const alpha = p.opacity * (0.55 + 0.45 * Math.sin(p.twinkle));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
      ctx.fill();
    });

    if (!prefersReducedMotion) requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => { resize(); init(); });
  init();
  if (!prefersReducedMotion) draw();
})();

/* ============================================
   Audio — Gehra Hua instrumental (mp3 only)
   ============================================ */

const MUSIC_SRC = "assets/gehra-hua.mp3";
const BONUS_MUSIC_SRC = CONFIG.bonusMusic || "assets/ishq-mubarak.mp3";

let musicAvailable = false;
let musicStarted = false;
let musicInitDone = false;
let bonusMusicPlayed = false;
let currentTrack = MUSIC_SRC;

musicEl.volume = CONFIG.musicVolume ?? 0.45;

function markMusicReady() {
  musicAvailable = true;
  musicInitDone = true;
  updateMusicBtnState();
}

function markMusicMissing() {
  musicAvailable = false;
  musicInitDone = true;
  updateMusicBtnState();
}

function updateMusicBtnState() {
  if (!musicInitDone) {
    musicBtn.title = "Loading music…";
    return;
  }

  if (!musicAvailable) {
    musicBtn.classList.add("is-unavailable");
    musicBtn.title = "Music file missing";
    musicBtn.setAttribute("aria-label", "Music unavailable");
    return;
  }

  musicBtn.classList.remove("is-unavailable");
  musicBtn.setAttribute("aria-label", musicEl.paused ? "Play music" : "Pause music");
  musicBtn.title = musicEl.paused ? "Play Gehra Hua" : "Pause music";
}

async function switchToTrack(src, autoplay = true) {
  const current = musicEl.currentSrc || musicEl.src || "";
  if (current.includes(src)) {
    if (autoplay && musicEl.paused) await musicEl.play().catch(() => {});
    return;
  }

  const wasPlaying = !musicEl.paused;
  musicEl.pause();
  musicEl.src = src;
  currentTrack = src;
  musicEl.load();

  if (autoplay || wasPlaying) {
    try {
      await musicEl.play();
      musicStarted = true;
      musicBtn.classList.add("is-playing");
      musicBtn.classList.remove("music-btn--hint");
    } catch { /* needs gesture on some browsers */ }
  }

  updateMusicBtnState();
}

async function playBonusTrack() {
  bonusMusicPlayed = true;
  try {
    const res = await fetch(BONUS_MUSIC_SRC, { method: "HEAD" });
    if (!res.ok) return;
  } catch { /* still try */ }

  await switchToTrack(BONUS_MUSIC_SRC, true);
  musicBtn.title = "Playing Ishq Mubarak";
}

async function initMusic() {
  musicEl.src = MUSIC_SRC;
  currentTrack = MUSIC_SRC;

  try {
    const res = await fetch(MUSIC_SRC, { method: "HEAD" });
    if (!res.ok) {
      markMusicMissing();
      return;
    }
  } catch {
    /* fetch may fail locally with file:// — still try audio element */
  }

  musicEl.load();

  if (musicEl.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
    markMusicReady();
  }
}

async function playMusic() {
  if (!musicAvailable || musicEl.paused === false) return false;

  try {
    await musicEl.play();
    musicStarted = true;
    musicBtn.classList.add("is-playing");
    musicBtn.classList.remove("music-btn--hint");
    updateMusicBtnState();
    return true;
  } catch {
    return false;
  }
}

function pauseMusic() {
  if (!musicEl.paused) musicEl.pause();
  musicBtn.classList.remove("is-playing");
  updateMusicBtnState();
}

async function toggleMusic() {
  if (!musicAvailable) return;

  musicBtn.classList.remove("music-btn--hint");

  if (musicEl.paused) {
    await playMusic();
  } else {
    pauseMusic();
  }
}

function tryStartMusicOnGesture() {
  if (musicStarted || !musicAvailable) return;
  playMusic();
}

musicEl.addEventListener("loadeddata", markMusicReady);
musicEl.addEventListener("canplaythrough", markMusicReady);

musicEl.addEventListener("error", () => {
  markMusicMissing();
});

musicBtn.addEventListener("click", toggleMusic);
initMusic();
updateMusicBtnState();

/* ============================================
   Personalization
   ============================================ */

function applyPersonalization() {
  momentDate.textContent = CONFIG.date;
  const display = CONFIG.nickname || CONFIG.name;

  if (nicknameBadge && display !== "FRIEND_NAME") {
    nicknameBadge.textContent = `Yeah, this one's for ${display} ✦`;
  }
  if (nicknameWhisper && CONFIG.nickname) {
    nicknameWhisper.textContent = `Sup, ${CONFIG.nickname}.`;
  }
  if (CONFIG.name && CONFIG.name !== "FRIEND_NAME") {
    const landingEyebrow = screens.landing.querySelector(".eyebrow");
    if (landingEyebrow) {
      landingEyebrow.textContent = `Low-key made this for ${CONFIG.name}`;
    }
    if (finalGreeting) {
      finalGreeting.textContent = `Happy First Day, ${CONFIG.name} — go off :)`;
    }
  }
}

/* ============================================
   Events
   ============================================ */

btnOpen.addEventListener("click", () => {
  tryStartMusicOnGesture();
  showScreen("password");
});
btnReplay.addEventListener("click", resetAllScreens);

applyPersonalization();
initBgFloats();

/* ---- Floating background icons ---- */
function initBgFloats() {
  const container = document.getElementById("bg-floats");
  if (!container || prefersReducedMotion) return;

  const icons = ["✨", "☁", "🍃", "✈", "📚", "🌸", "⭐", "🎒", "☀", "💫", "🌿", "📖"];
  const count = Math.min(18, Math.floor(window.innerWidth / 28));

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "float-icon";
    el.textContent = icons[i % icons.length];
    el.style.left = `${Math.random() * 100}%`;
    el.style.top = `${Math.random() * 100}%`;
    el.style.setProperty("--dur", `${14 + Math.random() * 18}s`);
    el.style.setProperty("--delay", `-${Math.random() * 20}s`);
    el.style.setProperty("--drift-x", `${(Math.random() - 0.5) * 80}px`);
    el.style.fontSize = `${0.85 + Math.random() * 0.9}rem`;
    el.style.opacity = `${0.15 + Math.random() * 0.25}`;
    container.appendChild(el);
  }
}
