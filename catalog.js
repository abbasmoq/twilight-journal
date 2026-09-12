const catalogStyles = document.createElement("style");

catalogStyles.textContent = `
  .catalog-top {
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:12px;
    flex-wrap:wrap;
    width:100%;
    min-width:0;
  }

  .catalog-version {
    color:var(--muted);
    font-size:12px;
  }

  .catalog-search {
    width:100%;
    min-width:0;
    margin:16px 0 12px;
    padding:13px 15px;
    border:1px solid var(--border);
    border-radius:14px;
    outline:none;
    color:var(--text);
    background:rgba(0,0,0,.18);
    font:inherit;
  }

  .catalog-search:focus {
    border-color:var(--gold);
  }

  .catalog-tabs {
    display:flex;
    width:100%;
    max-width:100%;
    min-width:0;
    gap:8px;
    padding-bottom:12px;
    overflow-x:auto;
  }

  .catalog-tab {
    padding:9px 14px;
    border:1px solid var(--border);
    border-radius:999px;
    color:var(--muted);
    background:transparent;
    white-space:nowrap;
  }

  .catalog-tab.active {
    color:#17140b;
    border-color:var(--gold);
    background:var(--gold);
  }

  .catalog-summary {
    margin:5px 0 15px;
    color:var(--muted);
    font-size:13px;
  }

  .catalog-grid {
    display:grid;
    width:100%;
    min-width:0;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:11px;
  }

  .catalog-entry {
    width:100%;
    min-width:0;
    max-width:100%;
    overflow:hidden;
    padding:15px;
    border:1px solid var(--border);
    border-radius:16px;
    background:rgba(0,0,0,.13);
  }

  .catalog-entry.locked {
    opacity:.48;
    filter:grayscale(1);
  }

  .catalog-entry.completed,
  .catalog-entry.obtained {
    border-color:rgba(101,214,160,.55);
  }

  .catalog-title {
    margin:0 0 8px;
    color:var(--gold);
    font:18px Georgia,serif;
    direction:ltr;
    text-align:left;
    overflow-wrap:anywhere;
  }

  .catalog-description {
    min-height:46px;
    color:var(--muted);
    font-size:13px;
    line-height:1.8;
    overflow-wrap:anywhere;
  }

  .catalog-rewards {
    display:flex;
    flex-wrap:wrap;
    gap:6px;
    margin-top:10px;
  }

  .reward-chip {
    padding:5px 8px;
    border-radius:20px;
    color:var(--green);
    background:rgba(101,214,160,.1);
    font-size:11px;
    direction:ltr;
  }

  .status-select {
    width:100%;
    margin-top:12px;
    padding:10px;
    border:1px solid var(--border);
    border-radius:10px;
    color:var(--text);
    background:#171b22;
  }

  body.light .status-select {
    color:#232820;
    background:#e4e8d7;
  }

  .obtained-label {
    display:flex;
    align-items:center;
    gap:9px;
    margin-top:12px;
    color:var(--muted);
    font-size:13px;
  }

  .obtained-label input {
    width:19px;
    height:19px;
    accent-color:var(--green);
  }

  .catalog-actions {
    display:flex;
    width:100%;
    min-width:0;
    flex-wrap:wrap;
    gap:8px;
    margin-top:16px;
  }

  .catalog-action {
    flex:1;
    min-width:0;
    padding:11px;
    border:1px solid var(--border);
    border-radius:12px;
    color:var(--text);
    background:rgba(0,0,0,.14);
  }

  .catalog-warning {
    padding:13px;
    margin:12px 0;
    border:1px solid rgba(232,198,106,.25);
    border-radius:13px;
    color:var(--muted);
    background:rgba(232,198,106,.07);
    font-size:12px;
    line-height:1.8;
  }

  .catalog-empty {
    grid-column:1/-1;
    padding:25px;
    text-align:center;
    color:var(--muted);
  }

  @media(max-width:650px) {
    .catalog-grid {
      grid-template-columns:1fr;
    }

    .catalog-actions {
      flex-direction:column;
    }
  }
`;

document.head.appendChild(catalogStyles);

const catalogState = {
  data: null,
  tab: "sideQuests",
  search: "",
  revealEquipment:
    localStorage.getItem("tp-reveal-equipment") === "true",

  sideStatuses: JSON.parse(
    localStorage.getItem("tp-side-statuses") || "{}"
  ),

  equipment: JSON.parse(
    localStorage.getItem("tp-equipment-statuses") || "{}"
  )
};

function saveCatalogState() {
  localStorage.setItem(
    "tp-side-statuses",
    JSON.stringify(catalogState.sideStatuses)
  );

  localStorage.setItem(
    "tp-equipment-statuses",
    JSON.stringify(catalogState.equipment)
  );
}

function currentMainProgress() {
  try {
    return JSON.parse(
      localStorage.getItem("tp-missions") ||
      '{"unlocked":1,"completed":[]}'
    );
  } catch {
    return {
      unlocked: 1,
      completed: []
    };
  }
}

function sideQuestUnlocked(quest) {
  if (!quest.availableAfter) return true;

  const chapterNumber =
    Number(quest.availableAfter.replace("mq-", ""));

  const state = currentMainProgress();

  return state.completed.includes(chapterNumber - 1);
}

function createCatalogCard() {
  const card = document.createElement("article");
  card.id = "catalogCard";
  card.className = "card wide";

  card.innerHTML = `
    <div class="catalog-top">
      <h2 class="card-title" style="margin:0">
        Game Database
      </h2>

      <span class="catalog-version" id="catalogVersion">
        در حال دریافت اطلاعات...
      </span>
    </div>

    <input
      id="catalogSearch"
      class="catalog-search"
      type="search"
      placeholder="جست‌وجوی مأموریت یا تجهیزات..."
    >

    <div class="catalog-tabs">
      <button class="catalog-tab active" data-tab="sideQuests">
        Side Quests
      </button>

      <button class="catalog-tab" data-tab="armor">
        Armor
      </button>

      <button class="catalog-tab" data-tab="swords">
        Swords
      </button>

      <button class="catalog-tab" data-tab="shields">
        Shields
      </button>

      <button class="catalog-tab" data-tab="tools">
        Tools
      </button>
    </div>

    <div class="catalog-warning" id="catalogWarning"></div>
    <div class="catalog-summary" id="catalogSummary"></div>
    <div class="catalog-grid" id="catalogGrid"></div>

    <div class="catalog-actions">
      <button class="catalog-action" id="revealEquipment">
        Reveal Equipment
      </button>

      <button class="catalog-action" id="resetCatalog">
        Reset This Section
      </button>
    </div>
  `;

  const journey = document.getElementById("journeyCard");
  const notes = document.getElementById("notes")?.closest(".card");
  const grid = document.querySelector(".grid");

  if (journey) {
    journey.after(card);
  } else if (notes) {
    grid.insertBefore(card, notes);
  } else {
    grid.appendChild(card);
  }

  card.querySelectorAll("[data-tab]").forEach(button => {
    button.onclick = () => {
      catalogState.tab = button.dataset.tab;

      card.querySelectorAll("[data-tab]").forEach(item =>
        item.classList.toggle(
          "active",
          item.dataset.tab === catalogState.tab
        )
      );

      renderCatalog();
    };
  });

  card.querySelector("#catalogSearch").oninput = event => {
    catalogState.search = event.target.value
      .trim()
      .toLowerCase();

    renderCatalog();
  };

  card.querySelector("#revealEquipment").onclick = () => {
    const opening = !catalogState.revealEquipment;

    if (
      opening &&
      !confirm("نام تمام تجهیزات ممکن است بخشی از بازی را لو بدهد. نمایش داده شوند؟")
    ) {
      return;
    }

    catalogState.revealEquipment = opening;

    localStorage.setItem(
      "tp-reveal-equipment",
      String(opening)
    );

    renderCatalog();
  };

  card.querySelector("#resetCatalog").onclick = () => {
    const accepted = confirm(
      "وضعیت مأموریت‌های فرعی و تجهیزات پاک شود؟"
    );

    if (!accepted) return;

    catalogState.sideStatuses = {};
    catalogState.equipment = {};

    localStorage.removeItem("tp-side-statuses");
    localStorage.removeItem("tp-equipment-statuses");

    renderCatalog();
  };

  return card;
}

function renderSideQuests(grid, data) {
  const visibleQuests = data.sideQuests.filter(quest => {
    const unlocked = sideQuestUnlocked(quest);

    if (!catalogState.search) return true;
    if (!unlocked) return false;

    return (
      quest.title.toLowerCase().includes(catalogState.search) ||
      quest.description.toLowerCase().includes(catalogState.search)
    );
  });

  const completedCount = data.sideQuests.filter(
    quest => catalogState.sideStatuses[quest.id] === "completed"
  ).length;

  document.getElementById("catalogSummary").textContent =
    `${completedCount} تکمیل‌شده از ${data.sideQuests.length} مأموریت فرعی`;

  document.getElementById("catalogWarning").textContent =
    "مأموریت‌های فرعی فقط پس از تکمیل فصل مرتبط در Main Journey نمایش داده می‌شوند.";

  visibleQuests.forEach(quest => {
    const unlocked = sideQuestUnlocked(quest);
    const status =
      catalogState.sideStatuses[quest.id] || "not-started";

    const entry = document.createElement("section");

    entry.className =
      "catalog-entry " +
      (!unlocked ? "locked " : "") +
      (status === "completed" ? "completed" : "");

    if (!unlocked) {
      entry.innerHTML = `
        <h3 class="catalog-title">???</h3>
        <p class="catalog-description">
          برای مشاهده، ابتدا فصل مرتبط در Main Journey را کامل کن.
        </p>
      `;

      grid.appendChild(entry);
      return;
    }

    entry.innerHTML = `
      <h3 class="catalog-title">${quest.title}</h3>

      <p class="catalog-description">
        ${quest.description}
      </p>

      <div class="catalog-rewards">
        ${quest.rewards.map(reward =>
          `<span class="reward-chip">${reward}</span>`
        ).join("")}
      </div>

      <select class="status-select">
        <option value="not-started">Not Started</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    `;

    const select = entry.querySelector("select");
    select.value = status;

    select.onchange = () => {
      catalogState.sideStatuses[quest.id] = select.value;
      saveCatalogState();
      renderCatalog();
    };

    grid.appendChild(entry);
  });

  if (!visibleQuests.length) {
    grid.innerHTML = `
      <div class="catalog-empty">
        نتیجه‌ای پیدا نشد.
      </div>
    `;
  }
}

function equipmentList(data) {
  return data.equipment[catalogState.tab] || [];
}

function renderEquipment(grid, data) {
  const list = equipmentList(data);

  const visibleItems = list.filter(item => {
    if (!catalogState.search) return true;

    return (
      item.title.toLowerCase().includes(catalogState.search) ||
      item.description.toLowerCase().includes(catalogState.search)
    );
  });

  const obtainedCount = list.filter(
    item => catalogState.equipment[item.id]
  ).length;

  document.getElementById("catalogSummary").textContent =
    `${obtainedCount} دریافت‌شده از ${list.length} مورد`;

  document.getElementById("catalogWarning").textContent =
    catalogState.revealEquipment
      ? "نمایش کامل تجهیزات فعال است."
      : "محافظت در برابر اسپویل فعال است؛ برای مشاهده نام تجهیزات از Reveal Equipment استفاده کن.";

  visibleItems.forEach(item => {
    const obtained = Boolean(catalogState.equipment[item.id]);
    const entry = document.createElement("section");

    entry.className =
      "catalog-entry " +
      (obtained ? "obtained" : "") +
      (!catalogState.revealEquipment ? " locked" : "");

    if (!catalogState.revealEquipment) {
      entry.innerHTML = `
        <h3 class="catalog-title">???</h3>
        <p class="catalog-description">
          این وسیله هنوز مخفی است.
        </p>
      `;

      grid.appendChild(entry);
      return;
    }

    entry.innerHTML = `
      <h3 class="catalog-title">${item.title}</h3>

      <p class="catalog-description">
        ${item.description}
      </p>

      <label class="obtained-label">
        <input type="checkbox" ${obtained ? "checked" : ""}>
        Obtained
      </label>
    `;

    const checkbox = entry.querySelector("input");

    checkbox.onchange = () => {
      catalogState.equipment[item.id] = checkbox.checked;
      saveCatalogState();
      renderCatalog();
    };

    grid.appendChild(entry);
  });

  if (!visibleItems.length) {
    grid.innerHTML = `
      <div class="catalog-empty">
        نتیجه‌ای پیدا نشد.
      </div>
    `;
  }
}

function renderCatalog() {
  if (!catalogState.data) return;

  const grid = document.getElementById("catalogGrid");
  const revealButton =
    document.getElementById("revealEquipment");

  grid.innerHTML = "";

  revealButton.textContent = catalogState.revealEquipment
    ? "Hide Equipment"
    : "Reveal Equipment";

  revealButton.style.display =
    catalogState.tab === "sideQuests" ? "none" : "block";

  if (catalogState.tab === "sideQuests") {
    renderSideQuests(grid, catalogState.data);
  } else {
    renderEquipment(grid, catalogState.data);
  }
}

async function loadGameDatabase() {
  const card = createCatalogCard();

  try {
    const response = await fetch(
      "./data/twilight-princess-hd.json",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Database request failed");
    }

    catalogState.data = await response.json();

    card.querySelector("#catalogVersion").textContent =
      `Data v${catalogState.data.contentVersion}`;

    renderCatalog();
  } catch (error) {
    card.querySelector("#catalogVersion").textContent =
      "Database unavailable";

    card.querySelector("#catalogWarning").textContent =
      "فایل اطلاعات بازی خوانده نشد. برنامه را از طریق سرور محلی اجرا کن.";

    card.querySelector("#catalogGrid").innerHTML = `
      <div class="catalog-empty">
        خطا در دریافت دیتابیس
      </div>
    `;
  }
}

loadGameDatabase();
