/* ============================================
   New Chapter — Day 1 Wish
   Edit CONFIG below to personalize
   ============================================ */

const CONFIG = {
  name: "FRIEND_NAME",
  nickname: "Ms.whywhywhy",
  password: "ms.maybe",
  date: "August 17, 2026",
  chocolateMessage: "Day 1 survival kit: curiosity ✓ courage ✓ chocolate ✓",
  chocolateSub: "The third one is non-negotiable. 🍫"
};

const WISHES = [
  {
    text: "May you walk into every room knowing you <em>belong</em> there.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`
  },
  {
    text: "May you find people who laugh at the same random things you do.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  },
  {
    text: "May the confusing days teach you something the easy days never could.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>`
  },
  {
    text: "May you grow without losing the parts of you that make you <em>you</em>.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
  },
  {
    text: "May this chapter become a story you're quietly proud to tell.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`
  },
  {
    text: CONFIG.chocolateMessage,
    tag: CONFIG.chocolateSub,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="8" width="18" height="10" rx="2"/><path d="M9 8v10M15 8v10M3 13h18"/></svg>`,
    isBonus: true
  }
];

const screens = {
  landing: document.getElementById("screen-landing"),
  password: document.getElementById("screen-password"),
  day1: document.getElementById("screen-day1"),
  wishes: document.getElementById("screen-wishes"),
  letter: document.getElementById("screen-letter"),
  final: document.getElementById("screen-final")
};

const els = {
  btnOpen: document.getElementById("btn-open"),
  passwordForm: document.getElementById("password-form"),
  passwordInput: document.getElementById("password-input"),
  passwordError: document.getElementById("password-error"),
  lockIcon: document.getElementById("lock-icon"),
  unlockFlash: document.getElementById("unlock-flash"),
  day1Date: document.getElementById("day1-date"),
  btnDay1Continue: document.getElementById("btn-day1-continue"),
  wishesLabel: document.getElementById("wishes-label"),
  wishDeckStage: document.getElementById("wish-deck-stage"),
  wishDots: document.getElementById("wish-dots"),
  btnWishPrev: document.getElementById("btn-wish-prev"),
  btnWishNext: document.getElementById("btn-wish-next"),
  btnWishesDone: document.getElementById("btn-wishes-done"),
  btnLetterContinue: document.getElementById("btn-letter-continue"),
  btnSendoff: document.getElementById("btn-sendoff"),
  finaleNoteCard: document.getElementById("finale-note-card"),
  finaleGreeting: document.getElementById("finale-greeting"),
  finaleMessage: document.getElementById("finale-message"),
  btnReplay: document.getElementById("btn-replay"),
  siteFooter: document.getElementById("site-footer"),
  footerCheer: document.getElementById("footer-cheer"),
  nicknameBadge: document.getElementById("nickname-badge"),
  nicknameWhisper: document.getElementById("nickname-whisper"),
  journeyBar: document.getElementById("journey-bar"),
  musicBtn: document.getElementById("music-btn"),
  musicEl: document.getElementById("music"),
  particlesCanvas: document.getElementById("particles-canvas"),
  confettiCanvas: document.getElementById("confetti-canvas")
};

let currentScreen = "landing";
let wishIndex = 0;
let wishCardsBuilt = false;
let timers = [];
let confettiPieces = [];
let confettiAnimating = false;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const JOURNEY_MAP = {
  day1: "open",
  wishes: "wishes",
  letter: "letter",
  final: "finale"
};

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
    setTimeout(() => {
      prev.hidden = true;
      prev.classList.remove("is-leaving");
    }, 700);
  }

  next.hidden = false;
  requestAnimationFrame(() => next.classList.add("screen--active"));
  currentScreen = name;

  updateJourneyBar(name);

  if (name !== "landing" && name !== "password") {
    els.siteFooter.hidden = false;
  }

  switch (name) {
    case "wishes":
      if (!wishCardsBuilt) buildWishDeck();
      updateWishView(false);
      break;
    case "day1":
      replayScreenAnimations(screens.day1);
      break;
    case "final":
      replayScreenAnimations(screens.final);
      break;
  }
}

function updateJourneyBar(screenName) {
  const step = JOURNEY_MAP[screenName];
  if (!step) {
    els.journeyBar.hidden = screenName === "landing" || screenName === "password";
    return;
  }

  els.journeyBar.hidden = false;
  const order = ["open", "wishes", "letter", "finale"];
  const currentIdx = order.indexOf(step);

  els.journeyBar.querySelectorAll(".journey-bar__step").forEach((el) => {
    const idx = order.indexOf(el.dataset.step);
    el.classList.toggle("is-done", idx < currentIdx);
    el.classList.toggle("is-active", idx === currentIdx);
  });
}

function resetExperience() {
  clearAllTimers();
  stopConfetti();
  wishIndex = 0;

  Object.values(screens).forEach((s) => {
    s.hidden = s !== screens.landing;
    s.classList.remove("screen--active", "is-leaving");
  });

  screens.landing.classList.add("screen--active");
  screens.landing.hidden = false;
  currentScreen = "landing";

  els.journeyBar.hidden = true;
  els.siteFooter.hidden = true;
  els.passwordInput.value = "";
  els.passwordError.textContent = "";
  els.passwordError.classList.remove("is-visible");
  els.lockIcon.classList.remove("is-unlocked");

  els.btnWishPrev.hidden = true;
  els.btnWishNext.hidden = false;
  els.btnWishesDone.hidden = true;
  els.finaleNoteCard.hidden = true;
  els.btnSendoff.disabled = false;
  els.btnSendoff.textContent = "All the best →";

  replayScreenAnimations(screens.landing);
}

function clearAllTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

function wait(ms) {
  return new Promise((resolve) => {
    timers.push(setTimeout(resolve, ms));
  });
}

function replayScreenAnimations(screen) {
  screen.querySelectorAll(".reveal-up").forEach((el) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "";
  });
}

/* ============================================
   Password & unlock
   ============================================ */

async function unlockExperience() {
  els.lockIcon.classList.add("is-unlocked");
  els.unlockFlash.classList.add("is-active");
  fireConfetti(18);

  await wait(reducedMotion ? 300 : 700);
  els.unlockFlash.classList.remove("is-active");

  els.day1Date.textContent = CONFIG.date;
  showSection("day1");
}

els.passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = els.passwordInput.value.trim().toLowerCase();

  if (val === CONFIG.password.toLowerCase()) {
    els.passwordError.classList.remove("is-visible");
    unlockExperience();
  } else {
    els.passwordError.textContent = "Close — you know this one.";
    els.passwordError.classList.add("is-visible");
    els.passwordInput.classList.add("shake");
    setTimeout(() => els.passwordInput.classList.remove("shake"), 400);
  }
});

els.passwordInput.addEventListener("input", () => {
  els.passwordError.classList.remove("is-visible");
});

/* ============================================
   Wish deck
   ============================================ */

function buildWishDeck() {
  WISHES.forEach((wish, i) => {
    const card = document.createElement("article");
    card.className = `wish-card wish-card--${i + 1}`;
    card.dataset.index = i;
    card.innerHTML = `
      <div class="wish-card__icon" aria-hidden="true">${wish.icon}</div>
      <p class="wish-card__num">${wish.isBonus ? "One more thing" : `Wish ${i + 1}`}</p>
      <p class="wish-card__text">${wish.text}</p>
      ${wish.tag ? `<p class="wish-card__tag">${wish.tag}</p>` : ""}
    `;
    els.wishDeckStage.appendChild(card);

    const dot = document.createElement("span");
    dot.className = "wish-dot";
    dot.dataset.index = i;
    els.wishDots.appendChild(dot);
  });

  wishCardsBuilt = true;
}

function updateWishView(animate = true) {
  const cards = els.wishDeckStage.querySelectorAll(".wish-card");
  const dots = els.wishDots.querySelectorAll(".wish-dot");

  cards.forEach((card, i) => {
    card.classList.remove("is-active", "is-prev", "is-next");
    if (i === wishIndex) card.classList.add("is-active");
    else if (i < wishIndex) card.classList.add("is-prev");
    else if (i === wishIndex + 1) card.classList.add("is-next");
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("is-active", i === wishIndex);
    dot.classList.toggle("is-done", i < wishIndex);
  });

  els.btnWishPrev.hidden = wishIndex === 0;
  const isLast = wishIndex === WISHES.length - 1;
  els.btnWishNext.hidden = isLast;
  els.btnWishesDone.hidden = !isLast;
  els.btnWishNext.textContent = isLast ? "Continue →" : "Next wish →";
}

function goToWish(index) {
  if (index < 0 || index >= WISHES.length) return;
  wishIndex = index;
  updateWishView();
}

els.btnWishNext.addEventListener("click", () => goToWish(wishIndex + 1));
els.btnWishPrev.addEventListener("click", () => goToWish(wishIndex - 1));
els.btnWishesDone.addEventListener("click", () => showSection("letter"));

/* Swipe support on wish deck */
let touchStartX = 0;

els.wishDeckStage.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

els.wishDeckStage.addEventListener("touchend", (e) => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) < 50) return;
  if (diff < 0 && wishIndex < WISHES.length - 1) goToWish(wishIndex + 1);
  if (diff > 0 && wishIndex > 0) goToWish(wishIndex - 1);
}, { passive: true });

/* ============================================
   Confetti (used sparingly)
   ============================================ */

function fireConfetti(count) {
  if (reducedMotion) return;
  const canvas = els.confettiCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#B58AEF", "#FF9DB8", "#F7C978", "#7EC8E3", "#E9DEFF"];
  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 80,
      w: 4 + Math.random() * 5,
      h: 7 + Math.random() * 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 2,
      vy: 1.5 + Math.random() * 3,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.15,
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
    p.vy += 0.06;
    p.rot += p.vr;
    p.life -= 0.005;

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
   Ambient particles
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
    const count = Math.min(40, Math.floor((w * h) / 20000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -(Math.random() * 0.12 + 0.02),
      a: Math.random() * 0.25 + 0.08,
      tw: Math.random() * Math.PI * 2
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.tw += 0.015;
      if (p.y < 0) {
        p.y = h;
        p.x = Math.random() * w;
      }
      const alpha = p.a * (0.5 + 0.5 * Math.sin(p.tw));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(181, 138, 239, ${alpha})`;
      ctx.fill();
    });
    if (!reducedMotion) requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => { resize(); spawn(); });
  resize();
  spawn();
  if (!reducedMotion) draw();
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
  if (els.wishesLabel && CONFIG.nickname) {
    els.wishesLabel.textContent = `Wishes for ${CONFIG.nickname}'s new chapter`;
  }
  if (CONFIG.name !== "FRIEND_NAME") {
    const eyebrow = screens.landing.querySelector(".eyebrow");
    if (eyebrow) eyebrow.textContent = `Made with care, ${CONFIG.name}`;
    if (els.finaleGreeting) els.finaleGreeting.textContent = `Happy First Day, ${CONFIG.name} :)`;
  }
  if (els.footerCheer && display !== "FRIEND_NAME") {
    els.footerCheer.textContent = `I'm cheering for you, ${display}. Always.`;
  }
  if (els.finaleMessage && display !== "FRIEND_NAME") {
    els.finaleMessage.textContent = `However today goes — showing up already counts. I'm cheering for you, ${display}.`;
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
els.btnDay1Continue.addEventListener("click", () => showSection("wishes"));
els.btnLetterContinue.addEventListener("click", () => showSection("final"));

els.btnSendoff.addEventListener("click", () => {
  fireConfetti(55);
  els.finaleNoteCard.hidden = false;
  els.btnSendoff.textContent = "You've got this ✦";
  els.btnSendoff.disabled = true;
});

els.btnReplay.addEventListener("click", resetExperience);

applyPersonalization();
createParticles();
