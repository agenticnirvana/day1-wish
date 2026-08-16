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

/* ---- 5 wishes matching mockup (edit here) ---- */
const WISHES = [
  {
    text: "May you grow, learn, explore,<br>and still remain <em>completely yourself</em>.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`
  },
  {
    text: "May you meet people who make this new place feel like home.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  },
  {
    text: "May you find friendships that turn into your favourite memories.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`
  },
  {
    text: "May you have the courage to try new things, even when they feel scary.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>`
  },
  {
    text: "May you have more reasons to laugh than to worry.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`
  }
];

const BONUS_WISH = {
  text: "May every wrong turn lead you to an unexpected story worth remembering.",
  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`
};

/* ---- DOM ---- */
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
  starsArc: document.getElementById("stars-arc"),
  starsComplete: document.getElementById("stars-complete"),
  btnStarsContinue: document.getElementById("btn-stars-continue"),
  wishModal: document.getElementById("wish-modal"),
  wishModalText: document.getElementById("wish-modal-text"),
  modalClose: document.getElementById("modal-close"),
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
  burstCanvas: document.getElementById("burst-canvas")
};

let currentScreen = "landing";
let openedStars = new Set();
let timers = [];
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
    case "stars": initStars(); break;
    case "wishlist": buildWishList(); break;
    case "important": revealImportant(); break;
    case "final": replayFinalAnimations(); break;
  }
}

function resetExperience() {
  clearAllTimers();
  closeWishModal();

  Object.values(screens).forEach((s) => {
    s.hidden = s !== screens.landing;
    s.classList.remove("screen--active", "is-leaving");
  });
  screens.landing.classList.add("screen--active");
  screens.landing.hidden = false;
  currentScreen = "landing";

  els.siteFooter.hidden = true;
  els.passwordInput.value = "";
  els.passwordError.textContent = "";
  els.passwordError.classList.remove("is-visible");
  els.lockIcon.classList.remove("is-unlocked");

  openedStars.clear();
  els.starsArc.innerHTML = "";
  els.wishList.innerHTML = "";
  els.starsComplete.hidden = true;
  els.starsComplete.classList.remove("is-visible");
  els.btnStarsContinue.hidden = true;
  els.btnStarsContinue.classList.remove("is-visible");
  els.importantQuote.classList.remove("is-visible");
  els.finaleExtra.hidden = true;

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

/* ============================================
   Password & unlock
   ============================================ */

async function unlockExperience() {
  const btn = document.getElementById("btn-unlock");
  if (btn) btn.classList.add("pulse");

  els.lockIcon.classList.add("is-unlocked");
  els.unlockFlash.classList.add("is-active");
  createBurst(window.innerWidth / 2, window.innerHeight / 2, 45);

  await wait(reducedMotion ? 300 : 1000);
  els.unlockFlash.classList.remove("is-active");
  if (btn) btn.classList.remove("pulse");

  await wait(reducedMotion ? 200 : 400);
  showSection("stars");
}

els.passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = els.passwordInput.value.trim().toLowerCase();

  if (val === CONFIG.password.toLowerCase()) {
    els.passwordError.classList.remove("is-visible");
    unlockExperience();
  } else {
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
   Stars
   ============================================ */

function initStars() {
  if (els.starsArc.children.length > 0) return;

  WISHES.forEach((wish, i) => {
    const btn = document.createElement("button");
    btn.className = "star-btn";
    btn.innerHTML = "★";
    btn.setAttribute("aria-label", `Reveal wish ${i + 1}`);
    btn.addEventListener("click", () => revealWish(i, btn));
    els.starsArc.appendChild(btn);
  });
}

function revealWish(index, btn) {
  btn.style.transform = "scale(1.3)";
  setTimeout(() => { btn.style.transform = ""; }, 300);

  createBurst(
    btn.getBoundingClientRect().left + btn.offsetWidth / 2,
    btn.getBoundingClientRect().top + btn.offsetHeight / 2,
    18
  );

  if (!openedStars.has(index)) {
    openedStars.add(index);
    btn.classList.add("is-opened");
  }

  els.wishModalText.innerHTML = WISHES[index].text;
  openWishModal();

  if (openedStars.size >= WISHES.length) {
    els.starsComplete.hidden = false;
    requestAnimationFrame(() => els.starsComplete.classList.add("is-visible"));
    els.btnStarsContinue.hidden = false;
    requestAnimationFrame(() => els.btnStarsContinue.classList.add("is-visible"));
  }
}

function openWishModal() {
  els.wishModal.hidden = false;
  requestAnimationFrame(() => els.wishModal.classList.add("is-open"));
  els.modalClose.focus();
}

function closeWishModal() {
  els.wishModal.classList.remove("is-open");
  setTimeout(() => { els.wishModal.hidden = true; }, 400);
}

els.modalClose.addEventListener("click", closeWishModal);
els.wishModal.addEventListener("click", (e) => {
  if (e.target === els.wishModal) closeWishModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && els.wishModal.classList.contains("is-open")) closeWishModal();
});

/* ============================================
   Wish list
   ============================================ */

function buildWishList() {
  if (els.wishList.children.length > 0) return;

  const allWishes = [...WISHES, BONUS_WISH];
  allWishes.forEach((wish, i) => {
    const li = document.createElement("li");
    li.className = "wish-item";
    li.innerHTML = `<span class="wish-icon" aria-hidden="true">${wish.icon}</span><span>${wish.text.replace(/<br>/g, " ").replace(/<\/?em>/g, "")}</span>`;
    els.wishList.appendChild(li);
    timers.push(setTimeout(() => li.classList.add("is-visible"), reducedMotion ? i * 100 : 300 + i * 400));
  });
}

/* ============================================
   Important quote
   ============================================ */

async function revealImportant() {
  await wait(reducedMotion ? 100 : 600);
  els.importantQuote.classList.add("is-visible");
}

/* ============================================
   Particles & burst
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
    const count = Math.min(45, Math.floor((w * h) / 20000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.06,
      vy: -(Math.random() * 0.1 + 0.02),
      a: Math.random() * 0.3 + 0.08,
      tw: Math.random() * Math.PI * 2
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.tw += 0.012;
      if (p.y < 0) { p.y = h; p.x = Math.random() * w; }
      const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
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

  const colors = ["#B58AEF", "#FF9DB8", "#F7C978", "#E9DEFF", "#FFD54F"];
  const pieces = Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const speed = 1.5 + Math.random() * 3;
    return {
      x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 1,
      r: 2 + Math.random() * 3, color: colors[i % colors.length],
      life: 1, decay: 0.014 + Math.random() * 0.01
    };
  });

  let frame = 0;
  function anim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach((p) => {
      if (p.life <= 0) return;
      alive = true;
      p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life -= p.decay;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    frame++;
    if (alive && frame < 90) requestAnimationFrame(anim);
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
      els.musicBtn.title = "No music file found";
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
  createBurst(window.innerWidth / 2, window.innerHeight / 2, 55);
  els.finaleExtra.hidden = false;
  els.btnAllBest.textContent = "You've got this ✨";
  els.btnAllBest.disabled = true;
  els.btnAllBest.style.opacity = "0.85";
});

els.btnReplay.addEventListener("click", resetExperience);

applyPersonalization();
createParticles();
