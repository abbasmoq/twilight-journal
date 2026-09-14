(() => {
  "use strict";

  const URL = "https://vhbcjfznzmpifjnwneaw.supabase.co";
  const KEY = "sb_publishable_dhNmwS9YTef0jy-kBNfNKQ_CY1Y_LXv";
  const DOMAIN = "users.twilight-journal.app";
  const client = window.supabase?.createClient(URL, KEY, {
    auth: { persistSession: true, autoRefreshToken: true }
  });

  let user = null;
  let candidates = [];
  let filter = "pending";
  let language = localStorage.getItem("admin-language") === "en" ? "en" : "fa";

  const words = {
    fa: {
      loginTitle: "ورود مدیر", loginHelp: "با همان حساب Adventure Journals وارد شو. فقط حساب ثبت‌شدهٔ مدیر اجازهٔ ورود دارد.",
      username: "نام کاربری انگلیسی", password: "رمز عبور", signIn: "ورود به پنل",
      deniedTitle: "دسترسی مجاز نیست", deniedHelp: "این حساب در فهرست مدیران پروژه قرار ندارد.", tryAnother: "ورود با حساب دیگر",
      dashboard: "Dashboard", welcome: "پیشنهادهای بازی و محتوای آیندهٔ سایت را از اینجا مدیریت کن.",
      pending: "Pending", approved: "Approved", rejected: "Rejected", total: "تمام پیشنهادها",
      candidates: "Game Candidates", apiWaiting: "RAWG API هنوز متصل نشده است.", apiNever: "هنوز دریافت خودکاری اجرا نشده است.",
      apiLast: (count, date) => `آخرین اجرا: ${count} بازی • ${date}`, all: "همه",
      manualAdd: "افزودن دستی بازی", manualHelp: "بازی ابتدا وارد Pending می‌شود.", gameTitle: "نام بازی *",
      coverUrl: "لینک تصویر", releaseDate: "تاریخ انتشار", description: "توضیح کوتاه", addPending: "افزودن به Pending",
      empty: "در این بخش بازی‌ای وجود ندارد.", approve: "تأیید", reject: "رد", pendingAction: "بازگردانی",
      delete: "حذف", build: "ساخت دفترچه", added: "بازی با موفقیت اضافه شد ✓",
      confirmDelete: "این بازی برای همیشه حذف شود؟", wrong: "نام کاربری یا رمز اشتباه است.",
      invalid: "نام کاربری باید ۳ تا ۲۴ حرف انگلیسی، عدد یا _ باشد.", connectError: "ارتباط با Supabase برقرار نشد.",
      loading: "در حال دریافت اطلاعات…", logout: "خروج", coming: "Journal Builder در مرحلهٔ بعد فعال می‌شود."
    },
    en: {
      loginTitle: "Admin Sign In", loginHelp: "Use your Adventure Journals account. Only registered administrators can continue.",
      username: "English username", password: "Password", signIn: "Open Admin Panel",
      deniedTitle: "Access Denied", deniedHelp: "This account is not registered as a project administrator.", tryAnother: "Use Another Account",
      dashboard: "Dashboard", welcome: "Manage game suggestions and future journal content.",
      pending: "Pending", approved: "Approved", rejected: "Rejected", total: "Total Candidates",
      candidates: "Game Candidates", apiWaiting: "RAWG API is not connected yet.", apiNever: "No automatic discovery run yet.",
      apiLast: (count, date) => `Last run: ${count} games • ${date}`, all: "All",
      manualAdd: "Add Game Manually", manualHelp: "The game will be added as Pending.", gameTitle: "Game title *",
      coverUrl: "Cover image URL", releaseDate: "Release date", description: "Short description", addPending: "Add to Pending",
      empty: "No games in this section.", approve: "Approve", reject: "Reject", pendingAction: "Move to Pending",
      delete: "Delete", build: "Build Journal", added: "Game added successfully ✓",
      confirmDelete: "Delete this game permanently?", wrong: "Incorrect username or password.",
      invalid: "Use 3–24 English letters, numbers, or _.", connectError: "Could not connect to Supabase.",
      loading: "Loading…", logout: "Sign Out", coming: "Journal Builder will be enabled in the next step."
    }
  };

  const t = (key, ...args) => {
    const value = words[language][key];
    return typeof value === "function" ? value(...args) : value;
  };
  const byId = id => document.getElementById(id);

  function showMessage(id, value, error = false) {
    const node = byId(id);
    node.textContent = value;
    node.classList.toggle("error", error);
  }

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function slugify(value) {
    return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `game-${Date.now()}`;
  }

  function applyLanguage() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
    byId("languageButton").textContent = language === "fa" ? "EN" : "FA";
    document.querySelectorAll("[data-t]").forEach(node => {
      node.textContent = t(node.dataset.t);
    });
    byId("logoutButton").textContent = t("logout");
    renderCandidates();
  }

  byId("languageButton").onclick = () => {
    language = language === "fa" ? "en" : "fa";
    localStorage.setItem("admin-language", language);
    applyLanguage();
  };

  async function login() {
    if (!client) return showMessage("loginMessage", t("connectError"), true);
    const username = byId("username").value.trim().toLowerCase();
    if (!/^[a-z0-9_]{3,24}$/.test(username)) {
      return showMessage("loginMessage", t("invalid"), true);
    }
    showMessage("loginMessage", t("loading"));
    const { data, error } = await client.auth.signInWithPassword({
      email: `${username}@${DOMAIN}`,
      password: byId("password").value
    });
    if (error) return showMessage("loginMessage", t("wrong"), true);
    user = data.user;
    await authorize();
  }

  byId("loginButton").onclick = login;
  byId("password").addEventListener("keydown", event => {
    if (event.key === "Enter") login();
  });

  async function authorize() {
    const { data, error } = await client.rpc("is_admin");
    byId("loginGate").classList.add("hidden");
    if (error || data !== true) {
      byId("deniedGate").classList.remove("hidden");
      return;
    }
    byId("deniedGate").classList.add("hidden");
    byId("adminApp").classList.remove("hidden");
    byId("logoutButton").classList.remove("hidden");
    byId("adminName").textContent = (user.email || "Administrator").split("@")[0];
    await loadData();
  }

  async function logout() {
    if (client) await client.auth.signOut();
    user = null;
    byId("adminApp").classList.add("hidden");
    byId("deniedGate").classList.add("hidden");
    byId("logoutButton").classList.add("hidden");
    byId("loginGate").classList.remove("hidden");
    showMessage("loginMessage", "");
  }

  byId("logoutButton").onclick = logout;
  byId("deniedLogout").onclick = logout;

  async function loadData() {
    const [gameResult, runResult] = await Promise.all([
      client.from("game_candidates").select("*").order("discovered_at", { ascending: false }),
      client.from("discovery_runs").select("*").order("started_at", { ascending: false }).limit(1).maybeSingle()
    ]);

    if (gameResult.error) {
      byId("candidateGrid").innerHTML = `<div class="empty">${escapeHtml(gameResult.error.message)}</div>`;
      return;
    }

    candidates = gameResult.data || [];
    updateCounts();

    if (runResult.data) {
      const run = runResult.data;
      const date = new Date(run.finished_at || run.started_at).toLocaleString(language === "fa" ? "fa-IR" : "en-US");
      byId("apiState").textContent = t("apiLast", run.games_found, date);
    } else {
      byId("apiState").textContent = t("apiNever");
    }
    renderCandidates();
  }

  function updateCounts() {
    byId("pendingCount").textContent = candidates.filter(item => item.status === "pending").length;
    byId("approvedCount").textContent = candidates.filter(item => item.status === "approved").length;
    byId("rejectedCount").textContent = candidates.filter(item => item.status === "rejected").length;
    byId("totalCount").textContent = candidates.length;
  }

  document.querySelectorAll("[data-status]").forEach(button => {
    button.onclick = () => {
      filter = button.dataset.status;
      document.querySelectorAll("[data-status]").forEach(item => item.classList.toggle("active", item === button));
      renderCandidates();
    };
  });

  function renderCandidates() {
    const grid = byId("candidateGrid");
    if (!grid) return;
    const list = filter === "all" ? candidates : candidates.filter(item => item.status === filter);

    if (!list.length) {
      grid.innerHTML = `<div class="empty">${t("empty")}</div>`;
      return;
    }

    grid.innerHTML = list.map(item => `
      <article class="candidate" data-id="${item.id}">
        ${item.cover_url
          ? `<img class="cover" src="${escapeHtml(item.cover_url)}" alt="" loading="lazy">`
          : `<div class="cover cover-placeholder">🎮</div>`}
        <div class="candidate-body">
          <h4>${escapeHtml(item.title)}</h4>
          <div class="meta">
            ${item.metacritic != null ? `<span class="chip">MC ${item.metacritic}</span>` : ""}
            ${item.rating != null ? `<span class="chip">★ ${item.rating}</span>` : ""}
            ${item.released ? `<span class="chip">${escapeHtml(item.released)}</span>` : ""}
          </div>
          ${item.description ? `<p>${escapeHtml(item.description).slice(0, 190)}</p>` : ""}
          <div class="candidate-actions">
            ${item.status !== "approved"
              ? `<button class="small-button approve" data-action="approved">${t("approve")}</button>`
              : `<button class="small-button approve" data-action="build">${t("build")}</button>`}
            ${item.status !== "rejected"
              ? `<button class="small-button reject" data-action="rejected">${t("reject")}</button>` : ""}
            ${item.status !== "pending"
              ? `<button class="small-button" data-action="pending">${t("pendingAction")}</button>` : ""}
            <button class="small-button danger" data-action="delete">${t("delete")}</button>
          </div>
        </div>
      </article>
    `).join("");

    grid.querySelectorAll("[data-action]").forEach(button => {
      button.onclick = () => candidateAction(
        Number(button.closest("[data-id]").dataset.id),
        button.dataset.action
      );
    });
  }

  async function candidateAction(id, action) {
    if (action === "build") return alert(t("coming"));

    if (action === "delete") {
      if (!confirm(t("confirmDelete"))) return;
      const { error } = await client.from("game_candidates").delete().eq("id", id);
      if (error) return alert(error.message);
      candidates = candidates.filter(item => item.id !== id);
    } else {
      const { error } = await client.from("game_candidates").update({
        status: action,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id
      }).eq("id", id);
      if (error) return alert(error.message);
      const item = candidates.find(entry => entry.id === id);
      if (item) item.status = action;
    }
    updateCounts();
    renderCandidates();
  }

  byId("manualForm").onsubmit = async event => {
    event.preventDefault();
    showMessage("manualMessage", t("loading"));
    const title = byId("gameTitle").value.trim();
    const payload = {
      source: "manual",
      source_id: `manual-${Date.now()}`,
      slug: slugify(title),
      title,
      cover_url: byId("coverUrl").value.trim() || null,
      released: byId("releaseDate").value || null,
      metacritic: byId("metacritic").value ? Number(byId("metacritic").value) : null,
      description: byId("description").value.trim() || null,
      status: "pending"
    };

    const { data, error } = await client.from("game_candidates").insert(payload).select().single();
    if (error) return showMessage("manualMessage", error.message, true);

    candidates.unshift(data);
    event.target.reset();
    filter = "pending";
    document.querySelectorAll("[data-status]").forEach(item => {
      item.classList.toggle("active", item.dataset.status === "pending");
    });
    updateCounts();
    renderCandidates();
    showMessage("manualMessage", t("added"));
  };

  async function init() {
    applyLanguage();
    if (!client) return showMessage("loginMessage", t("connectError"), true);
    const { data } = await client.auth.getSession();
    user = data.session?.user || null;
    if (user) await authorize();
  }

  init();
})();
