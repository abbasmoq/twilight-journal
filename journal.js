(() => {
  "use strict";

  const URL = "https://vhbcjfznzmpifjnwneaw.supabase.co";
  const KEY = "sb_publishable_dhNmwS9YTef0jy-kBNfNKQ_CY1Y_LXv";
  const client = window.supabase.createClient(URL, KEY);
  const slug = new URLSearchParams(location.search).get("game");
  const prefix = document.body.dataset.savePrefix;
  const S = localStorage;
  let journal = null;
  let language = S.getItem(prefix + "language") === "en" ? "en" : "fa";

  const ui = {
    fa: { progress: "پیشرفت سفر", stats: "آمار سفر", session: "جلسه", heart: "قلب", addSession: "+ ثبت جلسه جدید", addHeart: "♥ افزودن قلب", notes: "یادداشت‌ها", notePlace: "خاطرات و اتفاق‌های مهم این بازی را بنویس…", notStarted: "شروع‌نشده", inProgress: "در حال انجام", completed: "تکمیل‌شده", obtained: "دریافت شده", chapterComplete: "فصل تکمیل شد", missing: "این دفترچه هنوز منتشر نشده یا وجود ندارد." },
    en: { progress: "Journey Progress", stats: "Journey Stats", session: "Sessions", heart: "Hearts", addSession: "+ Add Session", addHeart: "♥ Add Heart", notes: "Notes", notePlace: "Write down important moments and memories…", notStarted: "Not Started", inProgress: "In Progress", completed: "Completed", obtained: "Obtained", chapterComplete: "Chapter completed", missing: "This journal is not published or does not exist yet." }
  };
  const t = key => ui[language][key];
  window.tpLanguage = () => language;
  window.tpT = t;

  function json(key, fallback) {
    try { return JSON.parse(S.getItem(key) || JSON.stringify(fallback)); }
    catch { return fallback; }
  }
  function localized(fa, en) { return language === "en" ? (en || fa || "") : (fa || en || ""); }
  function safe(value = "") { return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }

  function applyLanguage() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
    document.getElementById("languageButton").textContent = language === "fa" ? "EN" : "FA";
    document.getElementById("progressTitle").textContent = t("progress");
    document.getElementById("statsTitle").textContent = t("stats");
    document.getElementById("sessionLabel").textContent = t("session");
    document.getElementById("heartLabel").textContent = t("heart");
    document.getElementById("addSession").textContent = t("addSession");
    document.getElementById("addHeart").textContent = t("addHeart");
    document.getElementById("notesTitle").textContent = t("notes");
    document.getElementById("notes").placeholder = t("notePlace");
    if (journal) {
      document.getElementById("description").textContent = localized(journal.description_fa, journal.description_en);
      renderContent();
    }
  }
  window.applyTpLanguage = applyLanguage;

  function state() {
    return json(prefix + "state", { tasks: {}, side: {}, equipment: {}, collectibles: {} });
  }
  function saveState(value) { S.setItem(prefix + "state", JSON.stringify(value)); }

  function renderContent() {
    const data = journal.content || {};
    const current = state();
    const chapters = Array.isArray(data.chapters) ? data.chapters : [];
    const side = Array.isArray(data.sideQuests) ? data.sideQuests : [];
    const equipment = Array.isArray(data.equipment) ? data.equipment : [];
    const collectibles = Array.isArray(data.collectibles) ? data.collectibles : [];

    document.getElementById("chapters").innerHTML = chapters.length ? chapters.map((chapter, ci) => {
      const tasks = chapter.tasks?.length ? chapter.tasks : [["chapter", "", ""]];
      return `<section class="section-item"><h3>${safe(chapter.title)}</h3><p>${safe(localized(chapter.summaryFa, chapter.summaryEn))}</p>${tasks.map((task, ti) => {
        const key = `${ci}-${ti}`;
        const title = task[0] === "chapter" ? t("chapterComplete") : task[0];
        return `<label class="task"><input type="checkbox" data-task="${key}" ${current.tasks[key] ? "checked" : ""}><span><strong>${safe(title)}</strong>${task[0] !== "chapter" ? `<span>${safe(localized(task[1], task[2]))}</span>` : ""}</span></label>`;
      }).join("")}</section>`;
    }).join("") : '<p class="small">No chapters added yet.</p>';

    document.getElementById("sideQuests").innerHTML = side.length ? side.map((item, index) => `
      <section class="section-item"><h3>${safe(item.title)}</h3><p>${safe(localized(item.descriptionFa, item.descriptionEn))}</p>
      <select class="status" data-side="${item.id || index}"><option value="not-started">${t("notStarted")}</option><option value="in-progress">${t("inProgress")}</option><option value="completed">${t("completed")}</option></select></section>`).join("") : '<p class="small">No side quests added yet.</p>';

    document.getElementById("equipment").innerHTML = equipment.length ? equipment.map((item, index) => `
      <section class="section-item"><h3>${safe(item.title)}</h3><p>${safe(localized(item.descriptionFa, item.descriptionEn))}</p>
      <label class="check"><input type="checkbox" data-equipment="${item.id || index}" ${current.equipment[item.id || index] ? "checked" : ""}>${t("obtained")}</label></section>`).join("") : '<p class="small">No equipment added yet.</p>';

    document.getElementById("collectibles").innerHTML = collectibles.length ? collectibles.map((item, index) => {
      const key = item.id || index, value = Number(current.collectibles[key] || 0);
      return `<section class="section-item"><h3>${safe(item.title)}</h3><p>${safe(localized(item.descriptionFa, item.descriptionEn))}</p><div class="counter"><button data-minus="${key}">−</button><strong>${value} / ${Number(item.total || 1)}</strong><button data-plus="${key}" data-max="${Number(item.total || 1)}">+</button></div></section>`;
    }).join("") : '<p class="small">No collectibles added yet.</p>';

    document.querySelectorAll("[data-task]").forEach(box => box.onchange = () => {
      current.tasks[box.dataset.task] = box.checked; saveState(current); updateProgress();
    });
    document.querySelectorAll("[data-side]").forEach(select => {
      select.value = current.side[select.dataset.side] || "not-started";
      select.onchange = () => { current.side[select.dataset.side] = select.value; saveState(current); };
    });
    document.querySelectorAll("[data-equipment]").forEach(box => box.onchange = () => {
      current.equipment[box.dataset.equipment] = box.checked; saveState(current);
    });
    document.querySelectorAll("[data-minus]").forEach(button => button.onclick = () => {
      const key = button.dataset.minus; current.collectibles[key] = Math.max(0, Number(current.collectibles[key] || 0) - 1); saveState(current); renderContent();
    });
    document.querySelectorAll("[data-plus]").forEach(button => button.onclick = () => {
      const key = button.dataset.plus; current.collectibles[key] = Math.min(Number(button.dataset.max), Number(current.collectibles[key] || 0) + 1); saveState(current); renderContent();
    });
    updateProgress();
  }

  function updateProgress() {
    const data = journal?.content || {};
    const current = state();
    let total = 0, done = 0;
    (data.chapters || []).forEach((chapter, ci) => {
      const tasks = chapter.tasks?.length ? chapter.tasks : [["chapter"]];
      tasks.forEach((_, ti) => { total++; if (current.tasks[`${ci}-${ti}`]) done++; });
    });
    const value = total ? Math.round(done / total * 100) : 0;
    document.getElementById("progress").textContent = value;
    document.getElementById("progressBar").style.width = `${value}%`;
  }

  function initControls() {
    let sessions = Number(S.getItem(prefix + "sessions") || 0);
    let hearts = Number(S.getItem(prefix + "hearts") || 3);
    const draw = () => {
      document.getElementById("sessions").textContent = sessions;
      document.getElementById("hearts").textContent = hearts;
    };
    draw();
    document.getElementById("addSession").onclick = () => { sessions++; S.setItem(prefix + "sessions", sessions); draw(); };
    document.getElementById("addHeart").onclick = () => { hearts++; S.setItem(prefix + "hearts", hearts); draw(); };
    const notes = document.getElementById("notes");
    notes.value = S.getItem(prefix + "notes") || "";
    notes.oninput = () => S.setItem(prefix + "notes", notes.value);
    document.getElementById("languageButton").onclick = () => {
      language = language === "fa" ? "en" : "fa";
      S.setItem(prefix + "language", language);
      applyLanguage();
      window.dispatchEvent(new CustomEvent("tp-language-change"));
    };
    const theme = document.getElementById("themeButton");
    if (S.getItem(prefix + "theme") === "light") { document.body.classList.add("light"); theme.textContent = "☀"; }
    theme.onclick = () => {
      document.body.classList.toggle("light");
      const light = document.body.classList.contains("light");
      theme.textContent = light ? "☀" : "☾";
      S.setItem(prefix + "theme", light ? "light" : "dark");
    };
  }

  async function init() {
    if (!slug) {
      document.getElementById("loading").textContent = t("missing");
      return;
    }
    const { data, error } = await client.from("game_journals").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
    if (error || !data) {
      document.getElementById("loading").textContent = t("missing");
      return;
    }
    journal = data;
    document.title = `${journal.title} — Adventure Journal`;
    document.getElementById("title").textContent = journal.title;
    document.getElementById("cover").innerHTML = journal.cover_url ? `<img class="game-cover" src="${safe(journal.cover_url)}" alt="">` : '<div class="game-cover empty">🎮</div>';
    document.getElementById("loading").remove();
    document.getElementById("page").hidden = false;
    initControls();
    applyLanguage();
  }

  init();
})();
