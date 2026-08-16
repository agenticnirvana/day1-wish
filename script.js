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

/* ---- Wishes (edit text & icons here) ---- */
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
    text: "May you have the courage to try new things,<br>even when they feel a little scary.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>`
  },
  {
    text: "May you have more reasons to laugh than to worry.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
  },
  {
    text: "May every wrong turn lead you to an unexpected story worth remembering.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`
  },
  {
    text: "May you discover things about yourself<br>you didn't even know were there.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3l1.5 4.5H18l-3.5 2.5 1.5 4.5L12 12l-4 2.5 1.5-4.5L6 7.5h4.5L12 3z"/></svg>`
  }
];

/* ---- DOM ---- */
const screens = {
  landing: document.getElementById("screen-landing"),
  password: document.getElementById("screen-password"),
  day1: document.getElementById("screen-day1"),
  stars: document.getElementById("screen-stars"),
  encourage: document.getElementById("screen-encourage"),
  important: document.getElementById("screen-important"),
  journey: document.getElementById("screen-journey"),
  finale: document.getElementById("screen-finale")
};

const els = {
  btnOpen: document.getElementById("btn-open"),
  passwordForm: document.getElementById("password-form"),
  passwordInput: document.getElementById("password-input"),
  passwordError: document.getElementById("password-error"),
  lockIcon: document.getElementById("lock-icon"),
  unlockFlash: document.getElementById("unlock-flash"),
  day1Date: document.getElementById("day1-date"),
  day1Heading: document.getElementById("day1-heading"),
  day1Line1: document.getElementById("day1-line-1"),
  day1Line2: document.getElementById("day1-line-2"),
  day1Line3: document.getElementById("day1-line-3"),
  shootingStarBg: document.querySelector(".shooting-star-bg"),
  starsField: document.getElementById("stars-field"),
  starsComplete: document.getElementById("stars-complete"),
  btnStarsContinue: document.getElementById("btn-stars-continue"),
  wishModal: document.getElementById("wish-modal"),
  wishModalText: document.getElementById("wish-modal-text"),
  wishModalIcon: document.getElementById("wish-modal-icon"),
  modalClose: document.getElementById("modal-close"),
  encourageLines: document.getElementById("encourage-lines"),
  btnEncourageContinue: document.getElementById("btn-encourage-continue"),
  importantLines: document.getElementById("important-lines"),
  btnImportantContinue: document.getElementById("btn-important-continue"),
  btnAllBest: document.getElementById("btn-all-best"),
  btnReplay: document.getElementById("btn-replay"),
  siteFooter: document.getElementById("site-footer"),
  footerCheer: document.getElementById("footer-cheer"),
  nicknameBadge: document.getElementById("nickname-badge"),
  nicknameWhisper: document.getElementById("nickname-whisper"),
  starsLabel: document.getElementById("stars-label"),
  finaleGreeting: document.getElementById("finale-greeting"),
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
   Core navigation
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
    case "day1": runDay1Reveal(); break;
    case "stars": initStars(); break;
    case "encourage": showMessage(els.encourageLines, els.btnEncourageContinue); break;
    case "important": showMessage(els.importantLines, els.btnImportantContinue, 900); break;
    case "finale": replayFinaleAnimations(); break;
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
  els.starsField.innerHTML = "";
  els.starsComplete.hidden = true;
  els.starsComplete.classList.remove("is-visible");
  els.btnStarsContinue.hidden = true;
  els.btnStarsContinue.classList.remove("is-visible");
  els.btnEncourageContinue.hidden = true;
  els.btnEncourageContinue.classList.remove("is-visible");
  els.btnImportantContinue.hidden = true;
  els.btnImportantContinue.classList.remove("is-visible");

  resetMessages(els.encourageLines);
  resetMessages(els.importantLines);

  els.day1Heading.classList.remove("is-visible");
  [els.day1Line1, els.day1Line2, els.day1Line3].forEach((l) => { l.textContent = ""; });

  els.btnAllBest.textContent = "All the best →";
  els.btnAllBest.disabled = false;
  els.btnAllBest.style.opacity = "";

  replayLandingAnimations();
}

/* ============================================
   Utilities
   ============================================ */

function clearAllTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

function wait(ms) {
  return new Promise((resolve) => {
    timers.push(setTimeout(resolve, ms));
  });
}

function replayLandingAnimations() {
  screens.landing.querySelectorAll(".reveal-up").forEach((el) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "";
  });
}

function replayFinaleAnimations() {
  screens.finale.querySelectorAll(".reveal-up").forEach((el) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "";
  });
}

function resetMessages(container) {
  container.querySelectorAll(".reveal-msg").forEach((el) => el.classList.remove("is-visible"));
}

async function showMessage(container, continueBtn, pauseBeforePeak = 600) {
  const lines = container.querySelectorAll(".reveal-msg");
  const stagger = reducedMotion ? 120 : 650;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].classList.contains("reveal-msg--peak")) {
      await wait(reducedMotion ? 200 : pauseBeforePeak);
    }
    await wait(i === 0 ? 300 : stagger);
    lines[i].classList.add("is-visible");
  }

  await wait(reducedMotion ? 300 : 1200);
  continueBtn.hidden = false;
  requestAnimationFrame(() => continueBtn.classList.add("is-visible"));
}

/* ============================================
   Password & unlock
   ============================================ */

async function unlockExperience() {
  els.lockIcon.classList.add("is-unlocked");
  els.unlockFlash.classList.add("is-active");
  createBurst(window.innerWidth / 2, window.innerHeight / 2, 40);

  await wait(reducedMotion ? 300 : 900);
  els.unlockFlash.classList.remove("is-active");

  await wait(reducedMotion ? 200 : 500);
  showSection("day1");
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
   Day 1 reveal
   ============================================ */

async function runDay1Reveal() {
  els.day1Date.textContent = CONFIG.date;
  els.day1Date.style.opacity = "0";
  els.day1Date.style.transition = "opacity 0.8s ease";
  requestAnimationFrame(() => { els.day1Date.style.opacity = "1"; });

  await wait(reducedMotion ? 100 : 700);
  els.day1Heading.classList.add("is-visible");

  await wait(reducedMotion ? 200 : 900);
  await typeLine(els.day1Line1, "Not just the first day of college…");

  await wait(reducedMotion ? 200 : 700);
  await typeLine(els.day1Line2, "…but the first page of");

  await wait(reducedMotion ? 150 : 500);
  await typeLine(els.day1Line3, "a completely new chapter.", true);

  if (els.shootingStarBg) {
    els.shootingStarBg.classList.add("is-active");
  }

  await wait(reducedMotion ? 400 : 2500);
  showSection("stars");
}

function typeLine(el, text, accent) {
  if (reducedMotion) {
    el.textContent = text;
    if (accent) el.classList.add("day1-line--accent");
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    el.textContent = "";
    let i = 0;
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    el.appendChild(cursor);

    function tick() {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
        timers.push(setTimeout(tick, 36));
      } else {
        cursor.remove();
        if (accent) el.classList.add("day1-line--accent");
        resolve();
      }
    }
    tick();
  });
}

/* ============================================
   Star wishes
   ============================================ */

function initStars() {
  if (els.starsField.children.length > 0) return;

  WISHES.forEach((wish, i) => {
    const btn = document.createElement("button");
    btn.className = "star-btn";
    btn.innerHTML = "★";
    btn.setAttribute("aria-label", `Reveal wish ${i + 1}`);
    btn.addEventListener("click", () => revealWish(i, btn));
    els.starsField.appendChild(btn);
  });
}

function revealWish(index, btn) {
  createBurst(btn.getBoundingClientRect().left + btn.offsetWidth / 2, btn.getBoundingClientRect().top + btn.offsetHeight / 2, 16);

  if (!openedStars.has(index)) {
    openedStars.add(index);
    btn.classList.add("is-opened");
  }

  els.wishModalText.innerHTML = WISHES[index].text;
  els.wishModalIcon.innerHTML = WISHES[index].icon;
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
   Particles
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
    const count = Math.min(50, Math.floor((w * h) / 18000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -(Math.random() * 0.12 + 0.03),
      a: Math.random() * 0.35 + 0.1,
      tw: Math.random() * Math.PI * 2
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.tw += 0.015;
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
  resize();
  spawn();
  if (!reducedMotion) draw();
}

function createBurst(x, y, count) {
  if (reducedMotion) return;
  const canvas = els.burstCanvas;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#B58AEF", "#FF9DB8", "#F7C978", "#E9DEFF", "#7EC8E3"];
  const pieces = Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const speed = 1.5 + Math.random() * 3;
    return {
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      r: 2 + Math.random() * 3,
      color: colors[i % colors.length],
      life: 1,
      decay: 0.015 + Math.random() * 0.01
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
    } catch { /* blocked or missing */ }
  } else {
    els.musicEl.pause();
    els.musicBtn.classList.remove("is-playing");
  }
});

/* ============================================
   Event wiring
   ============================================ */

els.btnOpen.addEventListener("click", () => showSection("password"));
els.btnStarsContinue.addEventListener("click", () => showSection("encourage"));
els.btnEncourageContinue.addEventListener("click", () => showSection("important"));
els.btnImportantContinue.addEventListener("click", () => showSection("journey"));

els.btnAllBest.addEventListener("click", () => {
  createBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
  wait(reducedMotion ? 200 : 800).then(() => showSection("finale"));
});

els.btnReplay.addEventListener("click", resetExperience);

/* ---- Init ---- */
applyPersonalization();
createParticles();
