/* ============================================
   New Chapter — Day 1 Wish
   Edit CONFIG below to personalize
   ============================================ */

const CONFIG = {
  name: "FRIEND_NAME",
  nickname: "Ms.whywhywhy",
  password: "ms.maybe",
  date: "August 17, 2026"
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
    case "final": resetFinalAnimations(); break;
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

  resetRevealLines(screens.message);
  resetRevealLines(screens.wish);

  momentLine1.textContent = "";
  momentLine2.textContent = "";
  momentLine2.classList.remove("moment-line--accent");

  particleBoost = 1;
  stopAmbient();
  if (!musicEl.paused) musicEl.pause();
  musicBtn.classList.remove("is-playing");
  musicBtn.classList.add("music-btn--hint");
  replayLandingAnimations();
}

function replayLandingAnimations() {
  screens.landing.querySelectorAll(".fade-in").forEach((el) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "";
  });
}

function resetFinalAnimations() {
  screens.final.querySelectorAll(".fade-in").forEach((el) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "";
  });
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
  playUnlockChime();

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

function typeText(el, text, isAccent) {
  if (prefersReducedMotion) {
    el.textContent = text;
    if (isAccent) el.classList.add("moment-line--accent");
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    el.textContent = "";
    let i = 0;
    const speed = TIMING.typeSpeed;

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
    if (i > 0 && i % 2 === 0) playRevealPing();

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
  btnLastThing.style.opacity = "0";
  btnLastThing.style.transition = "opacity 0.4s";
  setTimeout(() => { btnLastThing.hidden = true; }, 400);

  burstConfetti();
  playUnlockChime();
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
   Audio — ambient + sfx (no mp3 required)
   ============================================ */

let audioCtx = null;
let ambientPlaying = false;
let ambientNodes = null;
let musicAvailable = false;
let usingMp3 = false;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

async function resumeAudio() {
  const ctx = getAudioContext();
  if (ctx.state === "suspended") await ctx.resume();
  return ctx;
}

function playTone(freq, duration, volume = 0.08, type = "sine") {
  if (prefersReducedMotion) return;
  resumeAudio().then((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.05);
  }).catch(() => {});
}

function playUnlockChime() {
  playTone(523.25, 0.35, 0.06);
  setTimeout(() => playTone(659.25, 0.45, 0.05), 120);
  setTimeout(() => playTone(783.99, 0.6, 0.045), 240);
}

function playRevealPing() {
  playTone(880, 0.25, 0.025, "triangle");
}

function startAmbient() {
  resumeAudio().then((ctx) => {
    if (ambientPlaying) return;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 2.5);
    master.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.connect(master);

    const padFreqs = [261.63, 329.63, 392, 493.88];
    const padNodes = padFreqs.map((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      gain.gain.value = 0.045;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.06 + i * 0.012;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.018;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      osc.connect(gain);
      gain.connect(filter);
      osc.start();
      lfo.start();
      return { osc, lfo, gain };
    });

    const arpOsc = ctx.createOscillator();
    arpOsc.type = "triangle";
    const arpGain = ctx.createGain();
    arpGain.gain.value = 0;
    arpOsc.connect(arpGain);
    arpGain.connect(filter);
    arpOsc.start();

    const arpNotes = [392, 493.88, 587.33, 659.25, 783.99];
    let arpIdx = 0;

    function tickArp() {
      if (!ambientPlaying) return;
      const freq = arpNotes[arpIdx % arpNotes.length];
      arpOsc.frequency.setValueAtTime(freq, ctx.currentTime);
      arpGain.gain.cancelScheduledValues(ctx.currentTime);
      arpGain.gain.setValueAtTime(0, ctx.currentTime);
      arpGain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 0.06);
      arpGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);
      arpIdx++;
    }

    tickArp();
    const arpInterval = setInterval(tickArp, 2400);

    ambientNodes = { master, padNodes, arpOsc, arpGain, arpInterval };
    ambientPlaying = true;
  }).catch(() => {});
}

function stopAmbient() {
  if (!ambientNodes || !audioCtx) return;
  const ctx = audioCtx;
  ambientPlaying = false;

  ambientNodes.master.gain.cancelScheduledValues(ctx.currentTime);
  ambientNodes.master.gain.setValueAtTime(ambientNodes.master.gain.value, ctx.currentTime);
  ambientNodes.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);

  setTimeout(() => {
    if (!ambientNodes) return;
    ambientNodes.padNodes.forEach(({ osc, lfo }) => {
      try { osc.stop(); lfo.stop(); } catch { /* already stopped */ }
    });
    try { ambientNodes.arpOsc.stop(); } catch { /* noop */ }
    clearInterval(ambientNodes.arpInterval);
    ambientNodes = null;
  }, 1100);
}

async function checkMp3Available() {
  try {
    const res = await fetch("assets/music.mp3", { method: "HEAD" });
    if (res.ok) {
      musicEl.load();
      musicAvailable = true;
      usingMp3 = true;
    }
  } catch {
    musicAvailable = false;
  }
}

async function toggleMusic() {
  musicBtn.classList.remove("music-btn--hint");

  if (usingMp3 && musicAvailable) {
    if (musicEl.paused) {
      try {
        await musicEl.play();
        musicBtn.classList.add("is-playing");
        musicBtn.title = "Pause music";
      } catch {
        usingMp3 = false;
        startAmbient();
        musicBtn.classList.add("is-playing");
        musicBtn.title = "Pause ambient";
      }
    } else {
      musicEl.pause();
      musicBtn.classList.remove("is-playing");
      musicBtn.title = "Play music";
    }
    return;
  }

  if (ambientPlaying) {
    stopAmbient();
    musicBtn.classList.remove("is-playing");
    musicBtn.title = "Play ambient sound";
  } else {
    startAmbient();
    musicBtn.classList.add("is-playing");
    musicBtn.title = "Pause ambient sound";
  }
}

musicEl.addEventListener("canplaythrough", () => {
  musicAvailable = true;
  usingMp3 = true;
});

musicEl.addEventListener("error", () => {
  musicAvailable = false;
  usingMp3 = false;
});

musicBtn.addEventListener("click", toggleMusic);

checkMp3Available();

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

btnOpen.addEventListener("click", () => showScreen("password"));
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
