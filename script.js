/* ============================================
   New Chapter — Day 1 Wish
   Edit CONFIG below to personalize
   ============================================ */

const CONFIG = {
  name: "FRIEND_NAME",
  nickname: "Ms.whywhywhy",
  password: "ms.maybe",
  date: "August 17, 2026",
  finaleWrong: "ms confusing",
  finaleWord: "ms.maybe",
  musicVolume: 0.45,
  bonusMusic: "assets/ishq-mubarak.mp3",
  bonusMusicStart: 15,
  landingGreet: "hii, good morning"
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
const landingGreet = document.getElementById("landing-greet");
const landingGreetText = document.getElementById("landing-greet-text");
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
const finalArcade = document.getElementById("final-arcade");
const finalBucket = document.getElementById("final-bucket");
const finalScore = document.getElementById("final-score");
const musicBtn = document.getElementById("music-btn");
const musicEl = document.getElementById("music");
const particlesCanvas = document.getElementById("particles");
const nicknameBadge = document.getElementById("nickname-badge");
const nicknameWhisper = document.getElementById("nickname-whisper");
const finalGreeting = document.getElementById("final-greeting");
const finalConfusing = document.getElementById("final-confusing");
const finalTypewriter = document.getElementById("final-typewriter");
const finalEyebrow = document.getElementById("final-eyebrow");
const finalNote = document.getElementById("final-note");
const finalNoteLine2 = document.getElementById("final-note-2");
const finalWishScene = document.getElementById("final-wish-scene");
const finalStar = document.getElementById("final-star");
const finalChocolates = document.getElementById("final-chocolates");

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
  currentScreen = name;

  requestAnimationFrame(() => {
    next.classList.add("screen--active");
    if (name === "password") {
      setTimeout(() => initPasswordScreen(), 100);
    }
  });

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
  lockIcon.classList.remove("is-unlocked", "is-shake");
  resetPasswordAnimations();

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
  resetLandingGreet();
  kickLandingAnimations();
  runLandingGreetSequence();
}

function kickLandingAnimations() {
  if (prefersReducedMotion) return;
  const resetEls = screens.landing.querySelectorAll(
    ".landing-anim, .landing-greet, .landing-greet__arm--l, .landing-greet__arm--r, .hero-night, .hero-stars, .hero-moon, .hero-sun-rise, .hero-cloud"
  );
  resetEls.forEach((el) => {
    el.style.animation = "none";
    void el.offsetHeight;
    el.style.animation = "";
  });
}

function resetLandingGreet() {
  if (landingGreetText) landingGreetText.textContent = "";
  if (landingGreet) landingGreet.classList.remove("is-visible");
}

async function runLandingGreetSequence() {
  if (!landingGreet || !landingGreetText) return;

  resetLandingGreet();
  await delay(prefersReducedMotion ? 150 : 2200);

  landingGreet.classList.add("is-visible");

  if (prefersReducedMotion) {
    landingGreetText.textContent = CONFIG.landingGreet || "hii, good morning";
    return;
  }

  await typeText(landingGreetText, CONFIG.landingGreet || "hii, good morning", false, false);
}

function resetFinalState() {
  if (finalEyebrow) finalEyebrow.classList.remove("is-visible");
  if (finalConfusing) {
    finalConfusing.textContent = "";
    finalConfusing.hidden = true;
    finalConfusing.classList.remove("is-struck", "is-faded");
  }
  if (finalTypewriter) {
    finalTypewriter.textContent = "";
    finalTypewriter.hidden = true;
    finalTypewriter.classList.remove("is-done");
  }
  [finalConfusing, finalTypewriter, finalGreeting, finalNote, finalNoteLine2].forEach((el) => {
    if (el) {
      el.style.color = "";
      el.style.textShadow = "";
    }
  });
  if (finalChocolates) {
    finalChocolates.innerHTML = "";
    finalChocolates.classList.remove("is-active");
  }
  if (finalBucket) {
    finalBucket.style.left = "";
    finalBucket.style.removeProperty("--bucket-x");
    finalBucket.classList.remove("is-dragging", "is-catch", "is-crushing");
    finalBucket.removeAttribute("data-fill");
    resetBucketColor();
  }
  if (finalScore) finalScore.textContent = "SCORE 000";
  stopFinalChocoCatch();
  teardownFinalBucketControl();
  [finalGreeting, finalTypewriter, finalWishScene, finalStar, finalArcade].forEach((el) => {
    if (el) {
      el.hidden = true;
      el.classList.remove("is-visible");
    }
  });
}

let finalChocoEngine = null;

async function runFinalSequence() {
  resetFinalState();

  if (finalEyebrow) finalEyebrow.classList.add("is-visible");
  await delay(prefersReducedMotion ? 150 : 600);

  if (finalConfusing) {
    finalConfusing.hidden = false;
    await typeText(finalConfusing, CONFIG.finaleWrong || "ms confusing", false, true);
    await delay(prefersReducedMotion ? 300 : 1200);
    finalConfusing.classList.add("is-struck");
    await delay(prefersReducedMotion ? 200 : 700);
    finalConfusing.classList.add("is-faded");
    await delay(prefersReducedMotion ? 400 : 800);
    finalConfusing.hidden = true;
  }

  if (finalGreeting) {
    finalGreeting.hidden = false;
    await delay(prefersReducedMotion ? 80 : 450);
    finalGreeting.classList.add("is-visible");
  }

  await delay(prefersReducedMotion ? 200 : 700);

  if (finalTypewriter) {
    finalTypewriter.hidden = false;
    finalTypewriter.classList.add("is-visible");
    await typeText(finalTypewriter, CONFIG.finaleWord || "ms.maybe", false, true);
    finalTypewriter.classList.add("is-done");
  }

  await delay(prefersReducedMotion ? 200 : 900);

  const reveals = [finalWishScene, finalStar];
  for (const el of reveals) {
    if (!el) continue;
    el.hidden = false;
    await delay(prefersReducedMotion ? 80 : 450);
    el.classList.add("is-visible");
  }

  await delay(prefersReducedMotion ? 150 : 500);
  initFinalChocolates();
  if (finalArcade) {
    finalArcade.hidden = false;
    finalArcade.classList.add("is-visible");
  }
  startFinalChocoEngine();
  if (finalChocoEngine) initFinalBucketControl(finalChocoEngine);
}

function initFinalChocolates() {
  if (!finalChocolates || prefersReducedMotion) return;
  finalChocolates.innerHTML = "";
  finalChocolates.classList.add("is-active");
}

function stopFinalChocoCatch() {
  stopFinalChocoEngine();
}

function startFinalChocoCatch() {
  startFinalChocoEngine();
}

const CHOCO_ICONS = ["🍫", "🍬", "🍫", "🍩", "🍫", "🍬"];

const TEXT_HIT_COLORS = [
  "#EC4899",
  "#8B5CF6",
  "#3B82F6",
  "#F59E0B",
  "#10B981",
  "#F472B6",
  "#6366F1",
  "#EF4444",
  "#14B8A6"
];

const BUCKET_PALETTES = [
  { light: "#FBCFE8", mid: "#EC4899", dark: "#BE185D", rim: "#F9A8D4", glow: "rgba(236, 72, 153, 0.62)" },
  { light: "#DDD6FE", mid: "#8B5CF6", dark: "#6D28D9", rim: "#C4B5FD", glow: "rgba(139, 92, 246, 0.62)" },
  { light: "#BFDBFE", mid: "#3B82F6", dark: "#1D4ED8", rim: "#93C5FD", glow: "rgba(59, 130, 246, 0.62)" },
  { light: "#FDE68A", mid: "#F59E0B", dark: "#D97706", rim: "#FCD34D", glow: "rgba(245, 158, 11, 0.62)" },
  { light: "#A7F3D0", mid: "#10B981", dark: "#059669", rim: "#6EE7B7", glow: "rgba(16, 185, 129, 0.62)" },
  { light: "#FBCFE8", mid: "#F472B6", dark: "#DB2777", rim: "#F9A8D4", glow: "rgba(244, 114, 182, 0.62)" },
  { light: "#C7D2FE", mid: "#6366F1", dark: "#4338CA", rim: "#A5B4FC", glow: "rgba(99, 102, 241, 0.62)" },
  { light: "#FECACA", mid: "#EF4444", dark: "#DC2626", rim: "#FCA5A5", glow: "rgba(239, 68, 68, 0.62)" },
  { light: "#99F6E4", mid: "#14B8A6", dark: "#0D9488", rim: "#5EEAD4", glow: "rgba(20, 184, 166, 0.62)" }
];

const textHitCounts = new WeakMap();

function colorizeTextOnHit(el) {
  if (!el) return;
  const count = (textHitCounts.get(el) || 0) + 1;
  textHitCounts.set(el, count);
  const color = TEXT_HIT_COLORS[(count - 1) % TEXT_HIT_COLORS.length];
  el.style.color = color;
  el.style.textShadow = `0 0 18px ${color}44`;
}

function startFinalChocoEngine() {
  stopFinalChocoEngine();
  if (!finalChocolates || prefersReducedMotion) return;

  finalChocoEngine = {
    chocos: [],
    raf: null,
    spawnTimer: null,
    running: true,
    bucketX: window.innerWidth * 0.5,
    bucketTargetX: window.innerWidth * 0.5,
    score: 0,
    keys: { left: false, right: false },
    pointerActive: false
  };

  setBucketPosition(finalChocoEngine.bucketX);
  updateScoreDisplay(0);

  finalChocoEngine.spawnTimer = setInterval(spawnLiveChoco, 580);
  for (let i = 0; i < 6; i++) setTimeout(spawnLiveChoco, i * 180);
  finalChocoEngine.raf = requestAnimationFrame(() => tickFinalChocos(finalChocoEngine));
}

function stopFinalChocoEngine() {
  if (!finalChocoEngine) return;

  finalChocoEngine.running = false;
  if (finalChocoEngine.raf) cancelAnimationFrame(finalChocoEngine.raf);
  if (finalChocoEngine.spawnTimer) clearInterval(finalChocoEngine.spawnTimer);
  finalChocoEngine.chocos.forEach((c) => c.el.remove());
  finalChocoEngine = null;
  teardownFinalBucketControl();
}

function setBucketPosition(x) {
  if (!finalBucket) return;
  const half = finalBucket.offsetWidth / 2;
  const clamped = clamp(x, half + 10, window.innerWidth - half - 10);
  finalBucket.style.setProperty("--bucket-x", `${clamped}px`);
  if (finalChocoEngine) {
    finalChocoEngine.bucketX = clamped;
    finalChocoEngine.bucketTargetX = clamped;
  }
}

function resetBucketColor() {
  if (!finalBucket) return;
  ["--bucket-light", "--bucket-mid", "--bucket-dark", "--bucket-rim", "--bucket-glow"].forEach((prop) => {
    finalBucket.style.removeProperty(prop);
  });
}

function updateBucketColor(score) {
  if (!finalBucket) return;
  if (score < 1) {
    resetBucketColor();
    return;
  }
  const palette = BUCKET_PALETTES[(score - 1) % BUCKET_PALETTES.length];
  finalBucket.style.setProperty("--bucket-light", palette.light);
  finalBucket.style.setProperty("--bucket-mid", palette.mid);
  finalBucket.style.setProperty("--bucket-dark", palette.dark);
  finalBucket.style.setProperty("--bucket-rim", palette.rim);
  finalBucket.style.setProperty("--bucket-glow", palette.glow);
}

function updateScoreDisplay(score) {
  if (!finalScore) return;
  finalScore.textContent = `SCORE ${String(score).padStart(3, "0")}`;
  if (finalBucket) {
    finalBucket.setAttribute("data-fill", String(Math.min(9, score)));
    updateBucketColor(score);
  }
}

function getPlayerBucketRect() {
  if (!finalBucket || finalBucket.hidden || !finalArcade?.classList.contains("is-visible")) return null;
  const rect = finalBucket.getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1) return null;
  return rect;
}

function catchChocoArcade(choco, engine) {
  if (choco.state === "caught" || choco.state === "done") return;
  choco.state = "caught";

  const bucket = getPlayerBucketRect();
  if (bucket) {
    choco.x = bucket.left + bucket.width * 0.5 - choco.r;
    choco.y = bucket.top + bucket.height * 0.28 - choco.r;
    choco.el.style.left = `${choco.x}px`;
    choco.el.style.top = `${choco.y}px`;
    choco.el.style.setProperty("--spin", `${choco.spin}deg`);
  }

  choco.el.classList.remove("choco-rolling");
  choco.el.classList.add("choco-crushing");
  engine.score += 1;
  updateScoreDisplay(engine.score);

  if (finalBucket) {
    finalBucket.classList.remove("is-catch", "is-crushing");
    void finalBucket.offsetWidth;
    finalBucket.classList.add("is-catch", "is-crushing");
    setTimeout(() => finalBucket.classList.remove("is-crushing"), 320);
  }

  setTimeout(() => {
    choco.state = "done";
    choco.el.remove();
  }, 320);
}

function tryCatchWithBucket(choco, engine) {
  if (choco.state !== "falling" && choco.state !== "rolling") return false;
  const bucket = getPlayerBucketRect();
  if (!bucket) return false;

  const cx = choco.x + choco.r;
  const cy = choco.y + (choco.r * 2);
  const padX = 16;
  const padY = 18;
  const hit =
    cx >= bucket.left - padX &&
    cx <= bucket.right + padX &&
    cy >= bucket.top - padY &&
    cy <= bucket.bottom + padY;

  if (hit) {
    catchChocoArcade(choco, engine);
    return true;
  }
  return false;
}

function updateBucketMovement(engine) {
  if (!finalBucket || !engine) return;

  const half = finalBucket.offsetWidth / 2;
  const minX = half + 10;
  const maxX = window.innerWidth - half - 10;
  const keySpeed = 18;

  if (engine.keys.left) engine.bucketTargetX -= keySpeed;
  if (engine.keys.right) engine.bucketTargetX += keySpeed;
  engine.bucketTargetX = clamp(engine.bucketTargetX, minX, maxX);

  if (!engine.pointerActive) {
    const ease = engine.keys.left || engine.keys.right ? 0.38 : 1;
    engine.bucketX += (engine.bucketTargetX - engine.bucketX) * ease;
  }

  setBucketPosition(engine.bucketX);
}

let finalBucketHandlers = null;

function initFinalBucketControl(engine) {
  teardownFinalBucketControl();
  if (!finalBucket || prefersReducedMotion) return;

  engine.bucketX = window.innerWidth * 0.5;
  engine.bucketTargetX = engine.bucketX;
  setBucketPosition(engine.bucketX);

  const onKeyDown = (e) => {
    if (currentScreen !== "final" || !engine?.running) return;
    if (e.key === "ArrowLeft") { engine.keys.left = true; e.preventDefault(); }
    if (e.key === "ArrowRight") { engine.keys.right = true; e.preventDefault(); }
  };

  const onKeyUp = (e) => {
    if (e.key === "ArrowLeft") engine.keys.left = false;
    if (e.key === "ArrowRight") engine.keys.right = false;
  };

  const moveToClientX = (clientX) => {
    if (!engine?.running || currentScreen !== "final") return;
    engine.bucketTargetX = clientX;
    engine.bucketX = clientX;
    setBucketPosition(clientX);
  };

  const onPointerDown = (e) => {
    if (!engine?.running || currentScreen !== "final") return;
    if (e.target.closest(".final-bucket-player__replay")) return;
    const inArcade = finalArcade?.contains(e.target);
    const inLowerZone = e.clientY > window.innerHeight * 0.52;
    if (!inArcade && !inLowerZone) return;
    engine.pointerActive = true;
    finalBucket?.classList.add("is-dragging");
    finalBucket?.setPointerCapture?.(e.pointerId);
    moveToClientX(e.clientX);
    e.preventDefault();
  };

  const onPointerMove = (e) => {
    if (!engine?.running || currentScreen !== "final") return;
    if (!engine.pointerActive) return;
    moveToClientX(e.clientX);
    e.preventDefault();
  };

  const onPointerUp = (e) => {
    if (!engine.pointerActive) return;
    engine.pointerActive = false;
    finalBucket?.classList.remove("is-dragging");
    if (e?.pointerId != null) {
      try { finalBucket?.releasePointerCapture?.(e.pointerId); } catch (_) { /* noop */ }
    }
  };

  const onResize = () => setBucketPosition(engine.bucketX);

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
  window.addEventListener("resize", onResize);

  finalBucketHandlers = { onKeyDown, onKeyUp, onPointerDown, onPointerMove, onPointerUp, onResize };
}

function teardownFinalBucketControl() {
  if (!finalBucketHandlers) return;
  window.removeEventListener("keydown", finalBucketHandlers.onKeyDown);
  window.removeEventListener("keyup", finalBucketHandlers.onKeyUp);
  window.removeEventListener("pointerdown", finalBucketHandlers.onPointerDown);
  window.removeEventListener("pointermove", finalBucketHandlers.onPointerMove);
  window.removeEventListener("pointerup", finalBucketHandlers.onPointerUp);
  window.removeEventListener("pointercancel", finalBucketHandlers.onPointerUp);
  window.removeEventListener("resize", finalBucketHandlers.onResize);
  finalBucketHandlers = null;
  finalBucket?.classList.remove("is-dragging", "is-crushing");
}

function spawnLiveChoco() {
  if (!finalChocoEngine?.running || !finalChocolates) return;

  const useBar = Math.random() > 0.72;
  const el = document.createElement(useBar ? "div" : "span");
  el.className = useBar ? "choco-float choco-bar choco-live" : "choco-float choco-emoji choco-live";
  if (!useBar) el.textContent = CHOCO_ICONS[Math.floor(Math.random() * CHOCO_ICONS.length)];

  const size = useBar ? 12 + Math.random() * 10 : 22 + Math.random() * 10;
  if (useBar) {
    el.style.width = `${size}px`;
    el.style.height = `${Math.max(6, size * 0.55)}px`;
  } else {
    el.style.fontSize = `${0.95 + Math.random() * 0.7}rem`;
  }

  finalChocolates.appendChild(el);

  const startX = 8 + Math.random() * (window.innerWidth - size - 16);
  finalChocoEngine.chocos.push({
    el,
    x: startX,
    y: -size - 8,
    vx: (Math.random() - 0.5) * 0.9,
    vy: 1.1 + Math.random() * 0.9,
    r: size * 0.5,
    spin: Math.random() * 360,
    spinSpeed: (Math.random() - 0.5) * 6,
    state: "falling",
    rollDir: 0,
    rollFrames: 0,
    obstacleEl: null,
    passedObstacles: new Set()
  });
}

function getFinalObstacles() {
  return [finalTypewriter, finalGreeting, finalNote, finalNoteLine2]
    .filter((el) => el && !el.hidden && el.offsetParent !== null && el.textContent.trim())
    .map((el) => ({ el, rect: el.getBoundingClientRect() }));
}

function tickFinalChocos(engine) {
  if (!engine.running) return;

  updateBucketMovement(engine);

  const obstacles = getFinalObstacles();

  engine.chocos = engine.chocos.filter((choco) => {
    if (!tryCatchWithBucket(choco, engine)) {
      updateLiveChoco(choco, obstacles);
      tryCatchWithBucket(choco, engine);
    }
    if (choco.state === "done") {
      choco.el.remove();
      return false;
    }
    return true;
  });

  engine.raf = requestAnimationFrame(() => tickFinalChocos(engine));
}

function releaseFromObstacle(choco, rect) {
  if (choco.obstacleEl) choco.passedObstacles.add(choco.obstacleEl);
  choco.state = "falling";
  choco.obstacleEl = null;
  choco.rollFrames = 0;
  choco.y = rect.bottom + 4;
  choco.vy = 1.1 + Math.random() * 0.9;
  choco.vx = choco.rollDir * (0.4 + Math.random() * 0.5);
  choco.el.classList.remove("choco-rolling");
}

function updateLiveChoco(choco, obstacles) {
  if (choco.state === "falling") {
    choco.y += choco.vy;
    choco.x += choco.vx;
    choco.spin += choco.spinSpeed;
    choco.vy = Math.min(choco.vy + 0.022, 3.2);

    for (const obs of obstacles) {
      if (choco.passedObstacles.has(obs.el)) continue;
      if (hitsObstacle(choco, obs.rect)) {
        choco.state = "rolling";
        choco.obstacleEl = obs.el;
        choco.rollFrames = 0;
        choco.y = obs.rect.top - choco.r - 2;
        choco.x = clamp(choco.x, obs.rect.left + choco.r, obs.rect.right - choco.r);
        choco.rollDir = choco.x < obs.rect.left + obs.rect.width * 0.5 ? -1 : 1;
        choco.vx = choco.rollDir * (2.8 + Math.random() * 2);
        choco.vy = 0;
        choco.el.classList.add("choco-rolling");
        colorizeTextOnHit(obs.el);
        obs.el.classList.add("final-text-hit");
        setTimeout(() => obs.el.classList.remove("final-text-hit"), 350);
        break;
      }
    }

    if (choco.y > window.innerHeight + 60) choco.state = "done";
  } else if (choco.state === "rolling") {
    const rect = choco.obstacleEl?.getBoundingClientRect();
    if (!rect || rect.width < 1) {
      choco.state = "falling";
      choco.vy = 1.2;
      choco.obstacleEl = null;
      choco.rollFrames = 0;
      choco.el.classList.remove("choco-rolling");
      return;
    }

    choco.rollFrames += 1;
    choco.x += choco.vx;
    choco.y = rect.top - choco.r - 2;
    choco.spin += choco.spinSpeed * 1.4;

    const fellOffLeft = choco.rollDir < 0 && choco.x <= rect.left - choco.r * 0.5;
    const fellOffRight = choco.rollDir > 0 && choco.x + choco.r * 2 >= rect.right + choco.r * 0.5;
    const rollTimedOut = choco.rollFrames > 48;

    if (fellOffLeft || fellOffRight || rollTimedOut) {
      releaseFromObstacle(choco, rect);
    }
  }

  choco.el.style.left = `${choco.x}px`;
  choco.el.style.top = `${choco.y}px`;
  choco.el.style.transform = `rotate(${choco.spin}deg)`;
}

function hitsObstacle(choco, rect) {
  const cx = choco.x + choco.r;
  const cy = choco.y + choco.r * 2;
  return (
    cy >= rect.top - 4 &&
    cy <= rect.top + 22 &&
    cx >= rect.left + choco.r * 0.25 &&
    cx <= rect.right - choco.r * 0.25 &&
    choco.y + choco.r < rect.bottom + 4
  );
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
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
    lockIcon.classList.remove("is-shake");
    void lockIcon.offsetWidth;
    lockIcon.classList.add("is-shake");
    setTimeout(() => {
      passwordInput.classList.remove("shake");
      lockIcon.classList.remove("is-shake");
    }, 450);
  }
}

async function triggerUnlock() {
  lockIcon.classList.remove("is-shake");
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
  lockIcon.classList.remove("is-shake");
});

function initPasswordScreen() {
  resetPasswordAnimations();
  const inner = screens.password.querySelector(".screen__inner--password");
  if (inner) {
    inner.classList.remove("password-enter-active");
    void inner.offsetWidth;
    inner.classList.add("password-enter-active");
  }
  lockIcon.classList.remove("is-unlocked", "is-shake");
}

function resetPasswordAnimations() {
  const inner = screens.password?.querySelector(".screen__inner--password");
  if (inner) inner.classList.remove("password-enter-active");
}

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

async function switchToTrack(src, autoplay = true, startAt = 0) {
  const current = musicEl.currentSrc || musicEl.src || "";
  const isSameTrack = current.includes(src);

  if (isSameTrack) {
    if (startAt > 0 && musicEl.duration && startAt < musicEl.duration) {
      musicEl.currentTime = startAt;
    }
    if (autoplay && musicEl.paused) await musicEl.play().catch(() => {});
    return;
  }

  const wasPlaying = !musicEl.paused;
  musicEl.pause();
  musicEl.src = src;
  currentTrack = src;
  musicEl.load();

  if (startAt > 0) {
    await new Promise((resolve) => {
      if (musicEl.readyState >= HTMLMediaElement.HAVE_METADATA) {
        resolve();
        return;
      }
      musicEl.addEventListener("loadedmetadata", resolve, { once: true });
      musicEl.addEventListener("error", resolve, { once: true });
    });
    if (musicEl.duration && startAt < musicEl.duration) {
      musicEl.currentTime = startAt;
    }
  }

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

function seekMusicTo(seconds) {
  if (musicEl.duration && seconds < musicEl.duration) {
    musicEl.currentTime = seconds;
  }
}

async function playBonusTrack() {
  bonusMusicPlayed = true;
  try {
    const res = await fetch(BONUS_MUSIC_SRC, { method: "HEAD" });
    if (!res.ok) return;
  } catch { /* still try */ }

  const startAt = CONFIG.bonusMusicStart ?? 15;
  await switchToTrack(BONUS_MUSIC_SRC, true, startAt);
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
kickLandingAnimations();
runLandingGreetSequence();

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

if (new URLSearchParams(window.location.search).get("screen") === "final") {
  Object.values(screens).forEach((screen) => {
    screen.hidden = screen !== screens.final;
    screen.classList.toggle("screen--active", screen === screens.final);
  });
  currentScreen = "final";
  runFinalSequence();
}
