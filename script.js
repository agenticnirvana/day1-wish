/* ============================================
   New Chapter — Day 1 Wish
   Edit CONFIG below to personalize
   ============================================ */

const CONFIG = {
  name: "FRIEND_NAME",
  nickname: "Ms.whywhywhy",
  password: "ms",
  date: "August 17, 2026"
};

const STAR_WISHES = [
  "May you grow, learn, explore, and still remain <em>completely yourself</em>.",
  "May you meet people who make this new place feel like home.",
  "May you find friendships that turn into your favourite memories.",
  "May you have the courage to try new things, even when they feel scary.",
  "May you have more reasons to laugh than to worry."
];

/* ---- DOM refs ---- */
const screens = {
  landing: document.getElementById("screen-landing"),
  password: document.getElementById("screen-password"),
  stars: document.getElementById("screen-stars"),
  wishlist: document.getElementById("screen-wishlist"),
  important: document.getElementById("screen-important"),
  final: document.getElementById("screen-final")
};

const btnOpen = document.getElementById("btn-open");
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const passwordError = document.getElementById("password-error");
const lockIcon = document.getElementById("lock-icon");
const unlockFlash = document.getElementById("unlock-flash");
const starsArc = document.getElementById("stars-arc");
const btnStarsContinue = document.getElementById("btn-stars-continue");
const wishModal = document.getElementById("wish-modal");
const wishModalText = document.getElementById("wish-modal-text");
const modalClose = document.getElementById("modal-close");
const btnAndMore = document.getElementById("btn-and-more");
const btnToFinal = document.getElementById("btn-to-final");
const btnAllBest = document.getElementById("btn-all-best");
const btnReplay = document.getElementById("btn-replay");
const siteFooter = document.getElementById("site-footer");
const footerCheer = document.getElementById("footer-cheer");
const nicknameBadge = document.getElementById("nickname-badge");
const nicknameWhisper = document.getElementById("nickname-whisper");
const nicknameSignoff = document.getElementById("nickname-signoff");
const starsSectionLabel = document.querySelector("#screen-stars .section-label");
const musicBtn = document.getElementById("music-btn");
const musicEl = document.getElementById("music");

let currentScreen = "landing";
let revealedStars = new Set();
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

  if (name !== "landing" && name !== "password") {
    siteFooter.hidden = false;
    siteFooter.classList.add("is-visible");
  }

  switch (name) {
    case "stars":
      initStars();
      break;
    case "wishlist":
      runWishListReveal();
      break;
    case "final":
      resetFinalAnimations();
      break;
  }
}

function resetAllScreens() {
  clearTimers();
  closeModal();

  Object.values(screens).forEach((screen) => {
    screen.hidden = screen !== screens.landing;
    screen.classList.remove("screen--active", "is-leaving");
  });
  screens.landing.classList.add("screen--active");
  screens.landing.hidden = false;
  currentScreen = "landing";

  siteFooter.hidden = true;
  siteFooter.classList.remove("is-visible");

  passwordInput.value = "";
  passwordError.textContent = "";
  passwordError.classList.remove("is-visible");
  lockIcon.classList.remove("is-unlocked");

  revealedStars.clear();
  starsArc.innerHTML = "";
  btnStarsContinue.hidden = true;

  resetWishListItems();
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

function resetWishListItems() {
  screens.wishlist.querySelectorAll(".wish-item").forEach((item) => {
    item.classList.remove("is-visible");
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

  await delay(prefersReducedMotion ? 300 : 700);
  unlockFlash.classList.remove("is-active");

  await delay(prefersReducedMotion ? 200 : 400);
  showScreen("stars");
}

/* ---- Stars ---- */
function initStars() {
  if (starsArc.children.length > 0) return;

  STAR_WISHES.forEach((wish, i) => {
    const btn = document.createElement("button");
    btn.className = "star-btn";
    btn.setAttribute("aria-label", `Reveal wish ${i + 1}`);
    btn.innerHTML = "★";
    btn.dataset.index = i;
    btn.addEventListener("click", () => openWishModal(i));
    starsArc.appendChild(btn);
  });
}

function openWishModal(index) {
  if (revealedStars.has(index)) {
    wishModalText.innerHTML = STAR_WISHES[index];
    openModal();
    return;
  }

  revealedStars.add(index);
  const starBtn = starsArc.children[index];
  if (starBtn) starBtn.classList.add("is-revealed");

  wishModalText.innerHTML = STAR_WISHES[index];
  openModal();

  if (revealedStars.size >= STAR_WISHES.length) {
    btnStarsContinue.hidden = false;
    btnStarsContinue.classList.add("fade-in");
  }
}

function openModal() {
  wishModal.hidden = false;
  requestAnimationFrame(() => {
    wishModal.classList.add("is-open");
  });
  modalClose.focus();
}

function closeModal() {
  wishModal.classList.remove("is-open");
  setTimeout(() => {
    wishModal.hidden = true;
  }, 400);
}

modalClose.addEventListener("click", closeModal);
wishModal.addEventListener("click", (e) => {
  if (e.target === wishModal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && wishModal.classList.contains("is-open")) {
    closeModal();
  }
});

btnStarsContinue.addEventListener("click", () => showScreen("wishlist"));

/* ---- Wish list reveal ---- */
async function runWishListReveal() {
  const items = screens.wishlist.querySelectorAll(".wish-item");
  const stagger = prefersReducedMotion ? 100 : 400;

  for (let i = 0; i < items.length; i++) {
    await delay(i === 0 ? 200 : stagger);
    items[i].classList.add("is-visible");
  }
}

btnAndMore.addEventListener("click", () => showScreen("important"));
btnToFinal.addEventListener("click", () => showScreen("final"));

btnAllBest.addEventListener("click", () => {
  btnAllBest.textContent = "You've got this ✨";
  btnAllBest.disabled = true;
  btnAllBest.style.opacity = "0.85";
});

/* ---- Personalization ---- */
function applyPersonalization() {
  const displayName = CONFIG.nickname || CONFIG.name;

  if (nicknameBadge && displayName && displayName !== "FRIEND_NAME") {
    nicknameBadge.textContent = `For ${displayName} ✦`;
  }

  if (nicknameWhisper && CONFIG.nickname) {
    nicknameWhisper.textContent = `Hey, ${CONFIG.nickname}.`;
  }

  if (nicknameSignoff && CONFIG.nickname) {
    nicknameSignoff.textContent = `— always, ${CONFIG.nickname}`;
  }

  if (starsSectionLabel && CONFIG.nickname) {
    starsSectionLabel.textContent = `A few wishes for ${CONFIG.nickname}'s new chapter…`;
  }

  if (CONFIG.name && CONFIG.name !== "FRIEND_NAME") {
    const landingEyebrow = screens.landing.querySelector(".eyebrow");
    if (landingEyebrow) {
      landingEyebrow.textContent = `A little something for your Day 1, ${CONFIG.name}…`;
    }
  }

  if (footerCheer && displayName && displayName !== "FRIEND_NAME") {
    footerCheer.textContent = `I'm cheering for you, ${displayName}. Always.`;
  }
}

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
      /* missing file or blocked */
    }
  } else {
    musicEl.pause();
    musicBtn.classList.remove("is-playing");
  }
});

/* ---- Event listeners ---- */
btnOpen.addEventListener("click", () => showScreen("password"));
btnReplay.addEventListener("click", resetAllScreens);

passwordInput.addEventListener("input", () => {
  passwordError.classList.remove("is-visible");
});

/* ---- Init ---- */
applyPersonalization();
