/* ============================================
   New Chapter — Day 1 Wish
   Edit CONFIG below to personalize
   ============================================ */

const CONFIG = {
  name: "FRIEND_NAME",
  password: "ms",
  date: "August 17, 2026"
};

/* ---- DOM refs ---- */
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

let currentScreen = "landing";
let particleBoost = 1;
let confettiCanvas = null;
let animationTimers = [];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- Screen navigation ---- */
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
  requestAnimationFrame(() => {
    next.classList.add("screen--active");
  });

  currentScreen = name;

  switch (name) {
    case "moment":
      runMomentSequence();
      break;
    case "message":
      runRevealSequence(screens.message);
      break;
    case "wish":
      runRevealSequence(screens.wish);
      break;
    case "final":
      resetFinalAnimations();
      break;
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
  btnLastThing.hidden = false;
  btnLastThing.style.opacity = "1";

  resetRevealLines(screens.message);
  resetRevealLines(screens.wish);

  momentLine1.textContent = "";
  momentLine2.textContent = "";

  particleBoost = 1;

  replayLandingAnimations();
}

function replayLandingAnimations() {
  const els = screens.landing.querySelectorAll(".fade-in");
  els.forEach((el) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "";
  });
}

function resetFinalAnimations() {
  const els = screens.final.querySelectorAll(".fade-in");
  els.forEach((el) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "";
  });
}

/* ---- Timers ---- */
function clearTimers() {
  animationTimers.forEach(clearTimeout);
  animationTimers = [];
}

function delay(ms) {
  return new Promise((resolve) => {
    const id = setTimeout(resolve, ms);
    animationTimers.push(id);
  });
}

/* ---- Password ---- */
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
    passwordError.textContent = "Hmm… I think you know this one ;)";
    passwordError.classList.add("is-visible");
    passwordInput.classList.add("shake");
    setTimeout(() => passwordInput.classList.remove("shake"), 400);
  }
}

async function triggerUnlock() {
  lockIcon.classList.add("is-unlocked");
  unlockFlash.classList.add("is-active");
  particleBoost = 2.5;

  await delay(prefersReducedMotion ? 300 : 800);
  unlockFlash.classList.remove("is-active");

  await delay(prefersReducedMotion ? 200 : 500);
  showScreen("moment");
}

/* ---- Moment sequence (Screen 3) ---- */
async function runMomentSequence() {
  momentDate.textContent = CONFIG.date;

  await delay(prefersReducedMotion ? 100 : 600);
  await typeText(momentLine1, "Not just the first day of college…");
  await delay(prefersReducedMotion ? 200 : 900);
  await typeText(momentLine2, "…but the first page of a completely new chapter.", true);
  await delay(prefersReducedMotion ? 400 : 2200);
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
    const speed = 38;

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

/* ---- Staggered reveal (Screens 4 & 5) ---- */
function resetRevealLines(screen) {
  screen.querySelectorAll(".reveal-line").forEach((line) => {
    line.classList.remove("is-visible");
  });
}

async function runRevealSequence(screen) {
  const lines = screen.querySelectorAll(".reveal-line");
  const baseDelay = prefersReducedMotion ? 80 : 500;
  const stagger = prefersReducedMotion ? 120 : 700;

  for (let i = 0; i < lines.length; i++) {
    await delay(i === 0 ? baseDelay : stagger);
    lines[i].classList.add("is-visible");

    if (lines[i].classList.contains("reveal-line--pause")) {
      await delay(prefersReducedMotion ? 200 : 1000);
    }
  }

  const nextScreen = screen === screens.message ? "wish"
    : screen === screens.wish ? "memory"
    : null;

  if (nextScreen) {
    const extraWait = screen === screens.wish ? 2800 : 2200;
    await delay(prefersReducedMotion ? 400 : extraWait);
    showScreen(nextScreen);
  }
}

/* ---- Memory moment (Screen 6) ---- */
btnLastThing.addEventListener("click", () => {
  btnLastThing.style.opacity = "0";
  btnLastThing.style.transition = "opacity 0.4s";
  setTimeout(() => { btnLastThing.hidden = true; }, 400);

  burstConfetti();
  memoryCard.hidden = false;
  requestAnimationFrame(() => {
    memoryCard.classList.add("is-visible");
  });

  delay(prefersReducedMotion ? 600 : 4000).then(() => {
    showScreen("final");
  });
});

/* ---- Confetti ---- */
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

  const colors = ["#a78bfa", "#f0abfc", "#818cf8", "#c4b5fd", "#e9d5ff"];
  const pieces = [];
  const count = 60;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const speed = 2 + Math.random() * 4;
    pieces.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 3 + Math.random() * 4,
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
      p.life -= p.decay;

      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
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

/* ---- Particles ---- */
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
      opacity: Math.random() * 0.5 + 0.1,
      twinkle: Math.random() * Math.PI * 2
    };
  }

  function init() {
    resize();
    const count = Math.min(80, Math.floor((w * h) / 12000));
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

      const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.twinkle));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 210, 240, ${alpha})`;
      ctx.fill();
    });

    if (!prefersReducedMotion) {
      requestAnimationFrame(draw);
    }
  }

  window.addEventListener("resize", () => {
    resize();
    init();
  });

  init();
  if (!prefersReducedMotion) draw();
})();

/* ---- Music ---- */
let musicAvailable = false;

musicEl.addEventListener("canplaythrough", () => {
  musicAvailable = true;
});

musicEl.addEventListener("error", () => {
  musicAvailable = false;
});

musicBtn.addEventListener("click", async () => {
  if (!musicAvailable) {
    try {
      musicEl.load();
      await musicEl.play();
      musicAvailable = true;
    } catch {
      musicBtn.style.opacity = "0.4";
      musicBtn.title = "No music file found";
      return;
    }
  }

  if (musicEl.paused) {
    try {
      await musicEl.play();
      musicBtn.classList.add("is-playing");
    } catch {
      /* user gesture or missing file */
    }
  } else {
    musicEl.pause();
    musicBtn.classList.remove("is-playing");
  }
});

/* ---- Event listeners ---- */
btnOpen.addEventListener("click", () => showScreen("password"));

btnReplay.addEventListener("click", () => {
  resetAllScreens();
});

passwordInput.addEventListener("input", () => {
  passwordError.classList.remove("is-visible");
});

/* ---- Personalization ---- */
function applyPersonalization() {
  momentDate.textContent = CONFIG.date;

  if (CONFIG.name && CONFIG.name !== "FRIEND_NAME") {
    const landingEyebrow = screens.landing.querySelector(".eyebrow");
    if (landingEyebrow) {
      landingEyebrow.textContent = `A little something for your Day 1, ${CONFIG.name}…`;
    }

    const finalSubtitle = screens.final.querySelector(".subtitle");
    if (finalSubtitle) {
      finalSubtitle.textContent = `Happy First Day, ${CONFIG.name} :)`;
    }
  }
}

/* ---- Init ---- */
applyPersonalization();

/* Shake animation for wrong password */
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }
  .shake { animation: shake 0.35s ease; }
`;
document.head.appendChild(shakeStyle);
