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

const WISHES = [
  { text: "May you grow, learn, explore,<br>and still remain <em>completely yourself</em>." },
  { text: "May you meet people who make this new place feel like home." },
  { text: "May you find friendships that turn into your favourite memories." },
  { text: "May you have the courage to try new things,<br>even when they feel a little scary." },
  { text: "May you have more reasons to laugh than to worry." }
];

const BONUS_WISH = {
  text: "May every wrong turn lead you to an unexpected story worth remembering.",
  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/></svg>`
};

const WISH_ICONS = [
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`
];

/* Surprise beats during wish parade */
const SURPRISES = {
  afterWish2: {
    tag: "Party pooper moment",
    emoji: "😭",
    text: "Quick reality check: Day 1 is basically Tuesday… but with a cuter outfit and more confusion.",
    sub: "Anyway — back to the good stuff ✨"
  },
  afterWish4: {
    tag: "Plot twist",
    emoji: "🎬",
    text: "Plot twist: you're the main character and literally nobody else got the script either.",
    sub: "You're doing fine. Keep going."
  }
};

const TOASTS = [
  "Okay this is getting emotional 🥹",
  "Don't cry yet — we're only halfway!",
  "Someone made this whole thing for YOU btw ✦",
  "Almost there… hang on"
];

const screens = {
  landing: document.getElementById("screen-landing"),
  password: document.getElementById("screen-password"),
  stars: document.getElementById("screen-stars"),
  wishlist: document.getElementById("screen-wishlist"),
  important: document.getElementById("screen-important"),
  final: document.getElementById("screen-final")
};

const els = {
  btnOpen: document.getElementById("btn-open"),
  passwordForm: document.getElementById("password-form"),
  passwordInput: document.getElementById("password-input"),
  passwordError: document.getElementById("password-error"),
  lockIcon: document.getElementById("lock-icon"),
  unlockFlash: document.getElementById("unlock-flash"),
  constellation: document.getElementById("constellation"),
  starsHeading: document.getElementById("stars-heading"),
  starsSub: document.getElementById("stars-sub"),
  btnReleaseWishes: document.getElementById("btn-release-wishes"),
  btnSkipParade: document.getElementById("btn-skip-parade"),
  wishProgress: document.getElementById("wish-progress"),
  wishProgressBar: document.getElementById("wish-progress-bar"),
  wishProgressLabel: document.getElementById("wish-progress-label"),
  starsComplete: document.getElementById("stars-complete"),
  btnStarsContinue: document.getElementById("btn-stars-continue"),
  wishParade: document.getElementById("wish-parade"),
  wishParadeCard: document.getElementById("wish-parade-card"),
  wishParadeStar: document.getElementById("wish-parade-star"),
  wishParadeNum: document.getElementById("wish-parade-num"),
  wishParadeText: document.getElementById("wish-parade-text"),
  surpriseOverlay: document.getElementById("surprise-overlay"),
  surpriseEmoji: document.getElementById("surprise-emoji"),
  surpriseTag: document.getElementById("surprise-tag"),
  surpriseText: document.getElementById("surprise-text"),
  surpriseSub: document.getElementById("surprise-sub"),
  surpriseDismiss: document.getElementById("surprise-dismiss"),
  day1Burst: document.getElementById("day1-burst"),
  burstDate: document.getElementById("burst-date"),
  toastContainer: document.getElementById("toast-container"),
  wishList: document.getElementById("wish-list"),
  btnAndMore: document.getElementById("btn-and-more"),
  importantQuote: document.getElementById("important-quote"),
  btnImportantContinue: document.getElementById("btn-important-continue"),
  btnAllBest: document.getElementById("btn-all-best"),
  finaleExtra: document.getElementById("finale-extra"),
  finaleGreeting: document.getElementById("finale-greeting"),
  btnReplay: document.getElementById("btn-replay"),
  siteFooter: document.getElementById("site-footer"),
  footerCheer: document.getElementById("footer-cheer"),
  nicknameBadge: document.getElementById("nickname-badge"),
  nicknameWhisper: document.getElementById("nickname-whisper"),
  starsLabel: document.getElementById("stars-label"),
  musicBtn: document.getElementById("music-btn"),
  musicEl: document.getElementById("music"),
  particlesCanvas: document.getElementById("particles-canvas"),
  burstCanvas: document.getElementById("burst-canvas"),
  confettiCanvas: document.getElementById("confetti-canvas")
};

let currentScreen = "landing";
let timers = [];
let paradeRunning = false;
let paradeSkipped = false;
let paradeResolve = null;
let confettiPieces = [];
let confettiAnimating = false;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================
   Navigation
   ============================================ */

function showSection(name) {
  const prev = screens[currentScreen];
  const next = screens[name];
  if (!next || name === currentScreen) return;

  if (prev) {
    prev.classList.add("is-leaving");
    prev.classList.remove("screen--active");
    setTimeout(() => { prev.hidden = true; prev.classList.remove("is-leaving"); }, 750);
  }

  next.hidden = false;
  requestAnimationFrame(() => next.classList.add("screen--active"));
  currentScreen = name;

  if (name !== "landing" && name !== "password") {
    els.siteFooter.hidden = false;
  }

  switch (name) {
    case "wishlist": buildWishList(); break;
    case "important": revealImportant(); break;
    case "final": replayFinalAnimations(); break;
  }
}

function resetExperience() {
  clearAllTimers();
  closeParade();
  closeSurprise();
  stopConfetti();
  paradeRunning = false;
  paradeSkipped = false;

  Object.values(screens).forEach((s) => {
    s.hidden = s !== screens.landing;
    s.classList.remove("screen--active", "is-leaving", "is-shaking");
  });
  screens.landing.classList.add("screen--active");
  screens.landing.hidden = false;
  currentScreen = "landing";

  els.siteFooter.hidden = true;
  els.passwordInput.value = "";
  els.passwordError.textContent = "";
  els.passwordError.classList.remove("is-visible");
  els.lockIcon.classList.remove("is-unlocked");

  els.constellation.classList.remove("is-active");
  els.btnReleaseWishes.hidden = false;
  els.btnSkipParade.hidden = true;
  els.wishProgress.hidden = true;
  els.wishProgress.classList.remove("is-visible");
  els.starsComplete.hidden = true;
  els.starsComplete.classList.remove("is-visible");
  els.btnStarsContinue.hidden = true;
  els.btnStarsContinue.classList.remove("is-visible");
  els.starsHeading.textContent = "Something's about to happen ✨";
  els.starsSub.textContent = "Hold on — this is going to be fun.";
  els.wishList.innerHTML = "";
  els.importantQuote.classList.remove("is-visible");
  els.finaleExtra.hidden = true;
  els.day1Burst.classList.remove("is-open");
  els.day1Burst.hidden = true;
  els.toastContainer.innerHTML = "";

  els.btnAllBest.textContent = "All the best! →";
  els.btnAllBest.disabled = false;
  els.btnAllBest.style.opacity = "";

  replayLandingAnimations();
}

function clearAllTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

function wait(ms) {
  return new Promise((resolve) => { timers.push(setTimeout(resolve, ms)); });
}

function replayLandingAnimations() {
  screens.landing.querySelectorAll(".reveal-up").forEach((el) => {
    el.style.animation = "none"; el.offsetHeight; el.style.animation = "";
  });
}

function replayFinalAnimations() {
  screens.final.querySelectorAll(".reveal-up").forEach((el) => {
    el.style.animation = "none"; el.offsetHeight; el.style.animation = "";
  });
}

function screenShake() {
  if (reducedMotion) return;
  const active = document.querySelector(".screen--active");
  if (active) {
    active.classList.add("is-shaking");
    setTimeout(() => active.classList.remove("is-shaking"), 500);
  }
}

/* ============================================
   Toasts
   ============================================ */

function showToast(msg, duration = 2500) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  els.toastContainer.appendChild(t);
  timers.push(setTimeout(() => {
    t.classList.add("is-out");
    setTimeout(() => t.remove(), 400);
  }, duration));
}

/* ============================================
   Password & unlock
   ============================================ */

async function unlockExperience() {
  screenShake();
  els.lockIcon.classList.add("is-unlocked");
  els.unlockFlash.classList.add("is-active");
  fireConfetti(80);
  createBurst(window.innerWidth / 2, window.innerHeight / 2, 60);

  await wait(reducedMotion ? 300 : 900);
  els.unlockFlash.classList.remove("is-active");

  await showDay1Burst();
  showSection("stars");
}

async function showDay1Burst() {
  els.burstDate.textContent = CONFIG.date;
  els.day1Burst.hidden = false;
  requestAnimationFrame(() => els.day1Burst.classList.add("is-open"));
  fireConfetti(50);
  screenShake();

  await wait(reducedMotion ? 800 : 2800);
  els.day1Burst.classList.remove("is-open");
  await wait(500);
  els.day1Burst.hidden = true;
}

els.passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = els.passwordInput.value.trim().toLowerCase();

  if (val === CONFIG.password.toLowerCase()) {
    els.passwordError.classList.remove("is-visible");
    unlockExperience();
  } else {
    passwordError.textContent = "Hmm… I think you know this one ;)";
    els.passwordError.textContent = "Hmm… I think you know this one ;)";
    els.passwordError.classList.add("is-visible");
    els.passwordInput.classList.add("shake");
    setTimeout(() => els.passwordInput.classList.remove("shake"), 400);
  }
});

els.passwordInput.addEventListener("input", () => {
  els.passwordError.classList.remove("is-visible");
});

/* ============================================
   Wish parade (auto flow — no boring taps!)
   ============================================ */

els.btnReleaseWishes.addEventListener("click", startWishParade);

els.btnSkipParade.addEventListener("click", () => {
  paradeSkipped = true;
  if (paradeResolve) paradeResolve();
  closeParade();
  finishParade();
});

async function startWishParade() {
  if (paradeRunning) return;
  paradeRunning = true;
  paradeSkipped = false;

  els.btnReleaseWishes.hidden = true;
  els.starsHeading.textContent = "Here they come… ✨";
  els.starsSub.textContent = "Sit back. Let it happen.";
  els.constellation.classList.add("is-active");
  els.btnSkipParade.hidden = false;
  els.wishProgress.hidden = false;
  requestAnimationFrame(() => els.wishProgress.classList.add("is-visible"));

  fireConfetti(40);
  await wait(reducedMotion ? 200 : 900);

  openParade();

  for (let i = 0; i < WISHES.length; i++) {
    if (paradeSkipped) break;

    updateProgress(i + 1, WISHES.length);
    await showWishInParade(i);

    if (paradeSkipped) break;

    if (i === 1 && SURPRISES.afterWish2) {
      closeParade();
      await showSurprise(SURPRISES.afterWish2);
      openParade();
    }
    if (i === 3 && SURPRISES.afterWish4) {
      closeParade();
      await showSurprise(SURPRISES.afterWish4);
      openParade();
    }
    if (i === 2) showToast(TOASTS[0]);
    if (i === 4) showToast(TOASTS[1]);
  }

  closeParade();
  finishParade();
}

function updateProgress(current, total) {
  const pct = (current / total) * 100;
  els.wishProgressBar.style.setProperty("--pct", `${pct}%`);
  els.wishProgressLabel.textContent = `Wish ${current} of ${total}`;
}

function openParade() {
  els.wishParade.hidden = false;
  requestAnimationFrame(() => els.wishParade.classList.add("is-open"));
}

function closeParade() {
  els.wishParade.classList.remove("is-open");
  setTimeout(() => { els.wishParade.hidden = true; }, 350);
}

function showWishInParade(index) {
  return new Promise((resolve) => {
    paradeResolve = resolve;
    const colors = ["#FF9DB8", "#F7C978", "#7EC8E3", "#C4A0F0", "#FFD54F"];

    els.wishParadeCard.classList.remove("is-in", "is-out");
    els.wishParadeStar.style.color = colors[index];
    els.wishParadeNum.textContent = `Wish ${index + 1}`;
    els.wishParadeText.innerHTML = WISHES[index].text;

    fireConfetti(25);
    createBurst(window.innerWidth / 2, window.innerHeight / 2, 30);

    requestAnimationFrame(() => {
      els.wishParadeCard.classList.add("is-in");
    });

    const autoAdvance = reducedMotion ? 2000 : 3200;

    function advance() {
      els.wishParade.removeEventListener("click", advance);
      els.wishParadeCard.classList.remove("is-in");
      els.wishParadeCard.classList.add("is-out");
      timers.push(setTimeout(() => {
        paradeResolve = null;
        resolve();
      }, reducedMotion ? 100 : 350));
    }

    els.wishParade.addEventListener("click", advance);
    timers.push(setTimeout(advance, autoAdvance));
  });
}

function finishParade() {
  paradeRunning = false;
  els.btnSkipParade.hidden = true;
  els.constellation.classList.remove("is-active");
  els.starsHeading.textContent = "That was a lot ✨";
  els.starsSub.textContent = "In a good way.";

  fireConfetti(100);
  screenShake();
  showToast(TOASTS[3], 3000);

  els.starsComplete.hidden = false;
  requestAnimationFrame(() => els.starsComplete.classList.add("is-visible"));
  els.btnStarsContinue.hidden = false;
  requestAnimationFrame(() => els.btnStarsContinue.classList.add("is-visible"));
}

/* ============================================
   Surprise overlay
   ============================================ */

function showSurprise(data) {
  return new Promise((resolve) => {
    els.surpriseEmoji.textContent = data.emoji;
    els.surpriseTag.textContent = data.tag;
    els.surpriseText.textContent = data.text;
    els.surpriseSub.textContent = data.sub || "";

    els.surpriseOverlay.hidden = false;
    requestAnimationFrame(() => els.surpriseOverlay.classList.add("is-open"));
    screenShake();
    showToast("Wait wait wait — 😂", 2000);

    function dismiss() {
      els.surpriseDismiss.removeEventListener("click", dismiss);
      els.surpriseOverlay.classList.remove("is-open");
      setTimeout(() => {
        els.surpriseOverlay.hidden = true;
        resolve();
      }, 400);
    }

    els.surpriseDismiss.addEventListener("click", dismiss);
    timers.push(setTimeout(dismiss, reducedMotion ? 2500 : 5000));
  });
}

function closeSurprise() {
  els.surpriseOverlay.classList.remove("is-open");
  els.surpriseOverlay.hidden = true;
}

/* ============================================
   Wish list
   ============================================ */

function buildWishList() {
  if (els.wishList.children.length > 0) return;

  const all = [...WISHES.map((w, i) => ({ ...w, icon: WISH_ICONS[i] })), BONUS_WISH];

  all.forEach((wish, i) => {
    const li = document.createElement("li");
    li.className = "wish-item";
    const plain = wish.text.replace(/<br>/g, " ").replace(/<\/?em>/g, "");
    li.innerHTML = `<span class="wish-icon" aria-hidden="true">${wish.icon}</span><span>${plain}</span>`;
    els.wishList.appendChild(li);
    timers.push(setTimeout(() => {
      li.classList.add("is-visible", "is-pop");
      if (i % 2 === 0) createBurst(
        window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.4,
        window.innerHeight * 0.4,
        12
      );
    }, reducedMotion ? i * 80 : 200 + i * 350));
  });

  fireConfetti(30);
}

async function revealImportant() {
  fireConfetti(40);
  screenShake();
  await wait(reducedMotion ? 100 : 500);
  els.importantQuote.classList.add("is-visible");
  showToast("Okay THIS one hits different ✦", 3000);
}

/* ============================================
   Confetti system
   ============================================ */

function fireConfetti(count) {
  if (reducedMotion) return;
  const canvas = els.confettiCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#B58AEF", "#FF9DB8", "#F7C978", "#7EC8E3", "#FFD54F", "#E9DEFF"];
  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 100,
      w: 4 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 4,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2,
      life: 1
    });
  }

  if (!confettiAnimating) {
    confettiAnimating = true;
    animateConfetti(ctx, canvas);
  }
}

function animateConfetti(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces = confettiPieces.filter((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.08;
    p.rot += p.vr;
    p.life -= 0.004;

    if (p.y > canvas.height + 20 || p.life <= 0) return false;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.min(1, p.life * 2);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
    return true;
  });

  if (confettiPieces.length > 0) {
    requestAnimationFrame(() => animateConfetti(ctx, canvas));
  } else {
    confettiAnimating = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function stopConfetti() {
  confettiPieces = [];
  if (els.confettiCanvas) {
    const ctx = els.confettiCanvas.getContext("2d");
    ctx.clearRect(0, 0, els.confettiCanvas.width, els.confettiCanvas.height);
  }
  confettiAnimating = false;
}

/* ============================================
   Burst particles
   ============================================ */

function createParticles() {
  const canvas = els.particlesCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function spawn() {
    const count = Math.min(55, Math.floor((w * h) / 16000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.1,
      vy: -(Math.random() * 0.15 + 0.03),
      a: Math.random() * 0.35 + 0.1,
      tw: Math.random() * Math.PI * 2
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.tw += 0.018;
      if (p.y < 0) { p.y = h; p.x = Math.random() * w; }
      const alpha = p.a * (0.5 + 0.5 * Math.sin(p.tw));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(181, 138, 239, ${alpha})`;
      ctx.fill();
    });
    if (!reducedMotion) requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => { resize(); spawn(); });
  resize(); spawn();
  if (!reducedMotion) draw();
}

function createBurst(x, y, count) {
  if (reducedMotion) return;
  const canvas = els.burstCanvas;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#B58AEF", "#FF9DB8", "#F7C978", "#FFD54F", "#7EC8E3"];
  const pieces = Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const speed = 2 + Math.random() * 5;
    return {
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      r: 2 + Math.random() * 4,
      color: colors[i % colors.length],
      life: 1,
      decay: 0.012 + Math.random() * 0.012
    };
  });

  let frame = 0;
  function anim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach((p) => {
      if (p.life <= 0) return;
      alive = true;
      p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.life -= p.decay;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    frame++;
    if (alive && frame < 100) requestAnimationFrame(anim);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  anim();
}

/* ============================================
   Personalization
   ============================================ */

function applyPersonalization() {
  const display = CONFIG.nickname || CONFIG.name;

  if (els.nicknameBadge && display !== "FRIEND_NAME") {
    els.nicknameBadge.textContent = `For ${display} ✦`;
  }
  if (els.nicknameWhisper && CONFIG.nickname) {
    els.nicknameWhisper.textContent = `Hey, ${CONFIG.nickname}.`;
  }
  if (els.starsLabel && CONFIG.nickname) {
    els.starsLabel.textContent = `A few wishes for ${CONFIG.nickname}'s new chapter…`;
  }
  if (CONFIG.name !== "FRIEND_NAME") {
    const eyebrow = screens.landing.querySelector(".eyebrow");
    if (eyebrow) eyebrow.textContent = `A little something for your Day 1, ${CONFIG.name}…`;
    if (els.finaleGreeting) els.finaleGreeting.textContent = `Happy First Day, ${CONFIG.name} :)`;
  }
  if (els.footerCheer && display !== "FRIEND_NAME") {
    els.footerCheer.textContent = `I'm cheering for you, ${display}. Always.`;
  }
}

/* ============================================
   Music
   ============================================ */

let musicReady = false;

els.musicEl.addEventListener("canplaythrough", () => { musicReady = true; });
els.musicEl.addEventListener("error", () => { musicReady = false; });

els.musicBtn.addEventListener("click", async () => {
  if (!musicReady) {
    try {
      els.musicEl.load();
      await els.musicEl.play();
      musicReady = true;
    } catch {
      els.musicBtn.style.opacity = "0.4";
      return;
    }
  }
  if (els.musicEl.paused) {
    try {
      await els.musicEl.play();
      els.musicBtn.classList.add("is-playing");
    } catch { /* blocked */ }
  } else {
    els.musicEl.pause();
    els.musicBtn.classList.remove("is-playing");
  }
});

/* ============================================
   Events
   ============================================ */

els.btnOpen.addEventListener("click", () => showSection("password"));
els.btnStarsContinue.addEventListener("click", () => showSection("wishlist"));
els.btnAndMore.addEventListener("click", () => showSection("important"));
els.btnImportantContinue.addEventListener("click", () => showSection("final"));

els.btnAllBest.addEventListener("click", () => {
  fireConfetti(120);
  createBurst(window.innerWidth / 2, window.innerHeight / 2, 70);
  screenShake();
  els.finaleExtra.hidden = false;
  document.querySelector(".final-content")?.classList.add("is-celebrating");
  els.btnAllBest.textContent = "You've got this ✨";
  els.btnAllBest.disabled = true;
  showToast("Now go be legendary ✦", 3500);
});

els.btnReplay.addEventListener("click", resetExperience);

applyPersonalization();
createParticles();
