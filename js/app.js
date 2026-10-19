/* Sola Busca Tarot PWA — app logic */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const pad2 = (n) => String(n).padStart(2, "0");
  const imgSrc = (id) => `assets/cards/${pad2(id)}.jpg`;

  /* ── Ornamental card back (period-style rosette) ─────────────────── */
  const BACK_SVG = `
  <svg viewBox="0 0 200 340" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="none" stroke="#c9a227" stroke-width="1.1">
      <rect x="8" y="8" width="184" height="324" rx="6" stroke-width="1.6"/>
      <rect x="14" y="14" width="172" height="312" rx="4" stroke-width=".6" opacity=".7"/>
      <g transform="translate(100 150)">
        <circle r="58" stroke-width="1.4"/>
        <circle r="48" stroke-width=".7" opacity=".8"/>
        <circle r="20" stroke-width="1.1"/>
        <g stroke-width=".8" opacity=".9">
          <path d="M0,-58 C14,-34 14,-18 0,-8 C-14,-18 -14,-34 0,-58Z"/>
          <path d="M0,58 C14,34 14,18 0,8 C-14,18 -14,34 0,58Z"/>
          <path d="M-58,0 C-34,14 -18,14 -8,0 C-18,-14 -34,-14 -58,0Z"/>
          <path d="M58,0 C34,14 18,14 8,0 C18,-14 34,-14 58,0Z"/>
          <path d="M-41,-41 C-20,-32 -12,-20 -6,-6 C-20,-12 -32,-20 -41,-41Z"/>
          <path d="M41,41 C20,32 12,20 6,6 C20,12 32,20 41,41Z"/>
          <path d="M41,-41 C32,-20 20,-12 6,-6 C12,-20 20,-32 41,-41Z"/>
          <path d="M-41,41 C-32,20 -20,12 -6,6 C-12,20 -20,32 -41,41Z"/>
        </g>
        <circle r="5" fill="#c9a227" stroke="none"/>
      </g>
      <g transform="translate(100 42)" opacity=".9">
        <circle r="9" stroke-width="1"/>
        <path d="M-9,0 H9 M0,-9 V9" stroke-width=".7"/>
      </g>
      <g transform="translate(100 258)" opacity=".9">
        <circle r="9" stroke-width="1"/>
        <path d="M-9,0 H9 M0,-9 V9" stroke-width=".7"/>
      </g>
      <text x="100" y="318" text-anchor="middle" fill="#c9a227"
            font-family="Georgia, serif" font-size="17" letter-spacing="6"
            stroke="none">S·B</text>
    </g>
  </svg>`;

  /* ── Utilities ──────────────────────────────────────────────────── */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  }

  function msUntilMidnight() {
    const now = new Date();
    const mid = new Date(now);
    mid.setHours(24, 0, 0, 0);
    return mid - now;
  }

  function formatCountdown(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${pad2(m)}m ${pad2(sec)}s`;
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ── Card element factory ────────────────────────────────────────── */
  function buildCardEl(card, reversed) {
    const el = document.createElement("div");
    el.className = "card" + (reversed ? " reversed" : "");
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", `Face-down card — press to reveal`);
    el.innerHTML =
      `<div class="card-inner">` +
      `<div class="card-face card-back">${BACK_SVG}</div>` +
      `<div class="card-face card-front"><img src="${imgSrc(card.id)}" alt="" draggable="false"></div>` +
      `</div>`;
    return el;
  }

  async function flipCard(el) {
    if (el.classList.contains("flipped")) return;
    el.classList.add("flipped");
    el.removeAttribute("tabindex");
    el.removeAttribute("role");
    const hint = el.parentElement && el.parentElement.querySelector(".tap-hint");
    if (hint) hint.remove();
    await sleep(880);
  }

  /* ── Reading HTML ────────────────────────────────────────────────── */
  function cardMetaLine(card) {
    const bits = [];
    if (card.arcana === "major") {
      bits.push(`Trionfi · ${card.astro} · ${card.element}`);
    } else {
      bits.push(`${card.element} · ${card.arcana}`);
    }
    return bits.join(" · ");
  }

  function readingBlock(card, reversed, posKey) {
    const pos = POSITIONS[posKey];
    const kw = reversed ? card.keywords.rev : card.keywords.up;
    const meaning = reversed ? card.rev : card.up;
    const wrap = document.createElement("article");
    wrap.className = "reading-card";
    wrap.innerHTML =
      `<p class="reading-position">${pos.label}</p>` +
      `<h2 class="reading-name">${card.name}</h2>` +
      (card.figure ? `<p class="reading-figure">Sola Busca figure — “${card.figure}”</p>` : "") +
      `<span class="reading-orient${reversed ? " rev" : ""}">${reversed ? "Reversed" : "Upright"}</span>` +
      `<p class="reading-frame">${pos.frame}</p>` +
      `<div class="reading-keywords">${kw.map((k) => `<span>${k}</span>`).join("")}</div>` +
      `<p class="reading-body">${meaning}</p>` +
      `<p class="reading-meta">${cardMetaLine(card)}</p>`;
    return wrap;
  }

  /* ── Draw pipeline: shuffle → deal → settle ──────────────────────── */
  async function runShuffle(deckEl) {
    if (!deckEl) return;
    deckEl.classList.remove("dealt");
    deckEl.classList.remove("shuffling");
    void deckEl.offsetWidth; // restart animation
    deckEl.classList.add("shuffling");
    await sleep(680);
    deckEl.classList.remove("shuffling");
  }

  function dealInto(slot, card, reversed, fromDeck) {
    slot.classList.add("filled");
    slot.innerHTML = "";
    const el = buildCardEl(card, reversed);
    // flight vector from deck (or from left edge if deck hidden)
    let dx = -170, dy = 30, rot = -12;
    if (fromDeck) {
      const deckBox = fromDeck.getBoundingClientRect();
      const slotBox = slot.getBoundingClientRect();
      if (deckBox.width > 0 && slotBox.width > 0) {
        dx = deckBox.left + deckBox.width / 2 - (slotBox.left + slotBox.width / 2);
        dy = deckBox.top + deckBox.height / 2 - (slotBox.top + slotBox.height / 2);
        rot = -16 + Math.random() * 8;
      }
    }
    el.style.setProperty("--deal-dx", `${dx}px`);
    el.style.setProperty("--deal-dy", `${dy}px`);
    el.style.setProperty("--deal-rot", `${rot}deg`);
    el.classList.add("dealing");
    slot.appendChild(el);
    if (fromDeck) fromDeck.classList.add("dealt");
    return el;
  }

  function clearSlots(slots) {
    slots.forEach((s) => {
      s.classList.remove("filled");
      s.innerHTML = "";
    });
  }

  /* ── Daily card ──────────────────────────────────────────────────── */
  const DAILY_KEY = "solabusca.daily.v1";
  const dailyDeck = $("#daily-deck");
  const dailySlot = $("#daily-slot");
  const dailyBtn = $("#daily-draw");
  const dailyLock = $("#daily-lock");
  const dailyCountdown = $("#daily-countdown");
  const dailyReading = $("#daily-reading");
  const dailyTableau = $("#daily-tableau");
  let countdownTimer = null;

  function loadDaily() {
    try {
      const raw = localStorage.getItem(DAILY_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data.date !== todayKey()) return null;
      return data;
    } catch { return null; }
  }

  function saveDaily(id, reversed) {
    localStorage.setItem(DAILY_KEY, JSON.stringify({
      date: todayKey(), id, reversed, ts: Date.now()
    }));
  }

  function renderDaily(id, reversed) {
    const card = CARDS[id];
    clearSlots([dailySlot]);
    dailyTableau.classList.add("has-card");
    const el = dealInto(dailySlot, card, reversed, null);
    el.classList.add("flipped");
    dailyReading.innerHTML = "";
    dailyReading.appendChild(readingBlock(card, reversed, "daily"));
    dailyBtn.hidden = true;
    dailyLock.hidden = false;
    startCountdown();
  }

  function startCountdown() {
    if (countdownTimer) clearInterval(countdownTimer);
    const tick = () => {
      dailyCountdown.textContent = formatCountdown(msUntilMidnight());
    };
    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  async function dailyDraw() {
    dailyBtn.disabled = true;
    await runShuffle(dailyDeck);
    const id = Math.floor(Math.random() * CARDS.length);
    const reversed = Math.random() < 0.5;
    const card = CARDS[id];
    const el = dealInto(dailySlot, card, reversed, dailyDeck);
    await sleep(760);
    await flipCard(el);
    saveDaily(id, reversed);
    dailyReading.innerHTML = "";
    dailyReading.appendChild(readingBlock(card, reversed, "daily"));
    dailyBtn.hidden = true;
    dailyLock.hidden = false;
    dailyTableau.classList.add("has-card");
    startCountdown();
  }

  function initDaily() {
    dailyBtn.addEventListener("click", dailyDraw);
    const saved = loadDaily();
    if (saved) renderDaily(saved.id, saved.reversed);
  }

  // midnight rollover while the app stays open
  function checkDailyRollover() {
    const saved = localStorage.getItem(DAILY_KEY);
    if (!saved) return;
    try {
      if (JSON.parse(saved).date !== todayKey()) {
        // new day: restore fresh state
        clearInterval(countdownTimer);
        dailyReading.innerHTML = "";
        clearSlots([dailySlot]);
        dailyTableau.classList.remove("has-card");
        dailyDeck.classList.remove("dealt");
        dailyBtn.hidden = false;
        dailyBtn.disabled = false;
        dailyLock.hidden = true;
      }
    } catch { /* corrupted entry: ignore */ }
  }

  /* ── Three-card spread ───────────────────────────────────────────── */
  const threeDeck = $("#three-deck");
  const threeTableau = $("#three-tableau");
  const threeSlots = $$("[data-pos]").map((el) => ({ pos: el.dataset.pos, el }));
  const threeBtn = $("#three-draw");
  const threeReveal = $("#three-reveal");
  const threeReading = $("#three-reading");
  let spread = null; // [{card, reversed, revealed}]
  let busy = false;

  function synthesisBlock(cards3) {
    const [p, pr, f] = cards3;
    const kw = (c, rev) => (rev ? c.keywords.rev : c.keywords.up)[0];
    const elOf = (c) => c.element;
    const revNote = f.reversed
      ? " The future card falls reversed — the outcome softens, internalizes, or stalls unless the present current is consciously steered."
      : "";
    const majors = cards3.filter((c) => c.card.arcana === "major").length;
    const elemental = [...new Set(cards3.map((c) => elOf(c.card)))].join(", ");
    const wrap = document.createElement("article");
    wrap.className = "reading-card synthesis";
    wrap.innerHTML =
      `<h3>The Thread</h3>` +
      `<p class="reading-body">` +
      `From <em>${kw(p.card, p.reversed)}</em> in the roots, through <em>${kw(pr.card, pr.reversed)}</em> at the surface, ` +
      `the current carries toward <em>${kw(f.card, f.reversed)}</em>.` +
      revNote + `</p>` +
      `<p class="reading-meta">Elements in play: ${elemental}` +
      (majors ? ` · ${majors} trionfi — fate weighs heavily in this matter` : ` · drawn wholly from the suit cards — the matter is everyday, material, in your hands`) +
      `</p>`;
    return wrap;
  }

  function renderThreeReadings() {
    threeReading.innerHTML = "";
    spread.forEach((item, i) => {
      if (item.revealed) {
        threeReading.appendChild(readingBlock(item.card, item.reversed, item.pos));
      }
    });
    if (spread.every((s) => s.revealed)) {
      threeReading.appendChild(synthesisBlock(spread));
    }
  }

  async function revealSpreadCard(idx) {
    const item = spread[idx];
    if (!item || item.revealed) return;
    item.revealed = true;
    await flipCard(item.el);
    renderThreeReadings();
    if (spread.every((s) => s.revealed)) threeReveal.hidden = true;
  }

  async function threeDraw() {
    if (busy) return;
    busy = true;
    threeBtn.disabled = true;
    threeReveal.hidden = true;
    threeReading.innerHTML = "";
    clearSlots(threeSlots.map((s) => s.el));
    threeTableau.classList.remove("has-card");
    await runShuffle(threeDeck);

    const ids = shuffle(CARDS.map((c) => c.id)).slice(0, 3);
    spread = threeSlots.map(({ pos, el }, i) => {
      const reversed = Math.random() < 0.5;
      const card = CARDS[ids[i]];
      const cardEl = dealInto(el, card, reversed, threeDeck);
      cardEl.style.animationDelay = `${i * 0.17}s`;
      const hint = document.createElement("span");
      hint.className = "tap-hint";
      hint.textContent = "tap to reveal";
      el.appendChild(hint);
      cardEl.addEventListener("click", () => revealSpreadCard(i));
      cardEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); revealSpreadCard(i); }
      });
      return { pos, card, reversed, el: cardEl, revealed: false };
    });

    await sleep(300);
    threeTableau.classList.add("has-card");
    threeReveal.hidden = false;
    threeBtn.disabled = false;
    threeBtn.textContent = "Cast Again";
    busy = false;
  }

  function initThree() {
    threeBtn.addEventListener("click", threeDraw);
    threeReveal.addEventListener("click", async () => {
      if (!spread || busy) return;
      busy = true;
      threeReveal.disabled = true;
      for (let i = 0; i < spread.length; i++) {
        if (!spread[i].revealed) await revealSpreadCard(i);
        await sleep(180);
      }
      threeReveal.disabled = false;
      busy = false;
    });
  }

  /* ── Yes / No ────────────────────────────────────────────────────── */
  const ynDeck = $("#yesno-deck");
  const ynSlot = $("#yesno-slot");
  const ynBtn = $("#yesno-draw");
  const ynReading = $("#yesno-reading");
  const ynQuestion = $("#yesno-question");
  const ynTableau = $("#yesno-tableau");
  let ynBusy = false;

  const VERDICTS = {
    "2": { word: "Yes", cls: "yes", sub: "Without hesitation." },
    "1": { word: "Yes", cls: "yes", sub: "The scales tip your way — though mind the edges." },
    "0": { word: "Maybe", cls: "maybe", sub: "The path is not yet fixed. Clarify what you actually want." },
    "-1": { word: "No", cls: "no", sub: "Not as things currently stand." },
    "-2": { word: "No", cls: "no", sub: "A clear no. Do not force this." }
  };

  async function yesnoDraw() {
    if (ynBusy) return;
    ynBusy = true;
    ynBtn.disabled = true;
    ynReading.innerHTML = "";
    clearSlots([ynSlot]);
    ynTableau.classList.remove("has-card");

    await runShuffle(ynDeck);
    const id = Math.floor(Math.random() * CARDS.length);
    const reversed = Math.random() < 0.5;
    const card = CARDS[id];
    const el = dealInto(ynSlot, card, reversed, ynDeck);
    await sleep(760);
    await flipCard(el);
    ynTableau.classList.add("has-card");

    const raw = reversed ? -card.yesNo : card.yesNo;
    const v = VERDICTS[String(raw)];
    const q = ynQuestion.value.trim();

    const verdictWrap = document.createElement("div");
    verdictWrap.className = "reading-card";
    verdictWrap.innerHTML =
      (q ? `<p class="question-echo">${q.replace(/</g, "&lt;")}</p>` : "") +
      `<p class="reading-position">${POSITIONS.yesno.label}</p>` +
      `<p class="verdict ${v.cls}">${v.word}</p>` +
      `<p class="verdict-sub">${v.sub}</p>`;
    ynReading.appendChild(verdictWrap);
    ynReading.appendChild(readingBlock(card, reversed, "yesno"));

    ynBtn.disabled = false;
    ynBtn.textContent = "Ask Again";
    ynBusy = false;
  }

  function initYesNo() {
    ynBtn.addEventListener("click", yesnoDraw);
    ynQuestion.addEventListener("keydown", (e) => {
      if (e.key === "Enter") yesnoDraw();
    });
  }

  /* ── Tabs ────────────────────────────────────────────────────────── */
  function initTabs() {
    const tabs = $$(".tab");
    const panels = $$(".panel");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => {
          t.classList.toggle("active", t === tab);
          t.setAttribute("aria-selected", t === tab ? "true" : "false");
        });
        panels.forEach((p) => {
          const on = p.id === `panel-${tab.dataset.tab}`;
          p.classList.toggle("active", on);
          p.hidden = !on;
        });
      });
    });
  }

  /* ── Install prompt ──────────────────────────────────────────────── */
  function initInstall() {
    const btn = $("#install-btn");
    const label = $("#install-label");
    const note = $("#install-note");
    if (!btn) return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (standalone) return; // already installed — nothing to offer

    const ua = navigator.userAgent;
    const isIOS =
      /iphone|ipad|ipod/i.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isMobile = /android|iphone|ipad|ipod|mobile/i.test(ua);

    let deferred = null;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferred = e;
      label.textContent = "Install App";
      btn.hidden = false;
    });

    window.addEventListener("appinstalled", () => {
      btn.hidden = true;
      note.hidden = true;
      deferred = null;
    });

    if (isIOS) {
      label.textContent = "Install on iOS";
      btn.hidden = false;
    } else if (isMobile) {
      // Firefox Android etc. don't fire beforeinstallprompt — offer instructions
      setTimeout(() => {
        if (!deferred) {
          label.textContent = "Install App";
          btn.hidden = false;
        }
      }, 2500);
    }

    btn.addEventListener("click", async () => {
      if (deferred) {
        deferred.prompt();
        const choice = await deferred.userChoice;
        deferred = null;
        if (choice.outcome === "accepted") {
          btn.hidden = true;
          note.hidden = true;
        }
        return;
      }
      if (isIOS) {
        note.textContent = "Tap the Share button below, then choose “Add to Home Screen”.";
      } else {
        note.textContent = "Open your browser menu and choose “Install app” or “Add to Home screen”.";
      }
      note.hidden = false;
    });
  }

  /* ── Boot ────────────────────────────────────────────────────────── */
  initTabs();
  initDaily();
  initThree();
  initYesNo();
  initInstall();

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) checkDailyRollover();
  });
  setInterval(checkDailyRollover, 20000);

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
