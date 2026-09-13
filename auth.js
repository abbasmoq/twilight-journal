/* Twilight Journal cloud accounts — Supabase */
(() => {
  "use strict";

  const SUPABASE_URL = "https://vhbcjfznzmpifjnwneaw.supabase.co";
  const SUPABASE_KEY = "sb_publishable_dhNmwS9YTef0jy-kBNfNKQ_CY1Y_LXv";
  const GAME_ID = document.body?.dataset.gameId || "twilight-princess-hd";
  const SAVE_PREFIX = document.body?.dataset.savePrefix || "tp-";
  const USER_DOMAIN = "users.twilight-journal.app";

  let client = null;
  let currentUser = null;
  let syncTimer = null;
  let applyingCloudSave = false;

  const nativeSetItem = Storage.prototype.setItem;
  const nativeRemoveItem = Storage.prototype.removeItem;
  const nativeClear = Storage.prototype.clear;

  function storageChanged(key) {
    if (!applyingCloudSave && (!key || String(key).startsWith(SAVE_PREFIX))) {
      queueCloudSync();
    }
  }

  Storage.prototype.setItem = function (key, value) {
    nativeSetItem.call(this, key, value);
    if (this === localStorage) storageChanged(key);
  };

  Storage.prototype.removeItem = function (key) {
    nativeRemoveItem.call(this, key);
    if (this === localStorage) storageChanged(key);
  };

  Storage.prototype.clear = function () {
    nativeClear.call(this);
    if (this === localStorage) storageChanged();
  };

  const words = {
    fa: {
      account: "حساب",
      title: "حساب و ذخیرهٔ آنلاین",
      intro: "با نام کاربری و رمز وارد شو تا پیشرفتت روی دستگاه‌های دیگر هم در دسترس باشد.",
      username: "نام کاربری انگلیسی",
      password: "رمز عبور",
      signIn: "ورود",
      signUp: "ساخت حساب",
      signOut: "خروج از حساب",
      guest: "ادامه به‌صورت مهمان",
      signedIn: name => `واردشده با نام ${name}`,
      syncing: "در حال همگام‌سازی…",
      synced: "ذخیرهٔ آنلاین انجام شد ✓",
      created: "حساب ساخته شد و اطلاعات فعلی ذخیره شد ✓",
      restored: "اطلاعات حساب بازیابی شد ✓",
      invalidUser: "نام کاربری باید ۳ تا ۲۴ حرف انگلیسی، عدد یا _ باشد.",
      shortPassword: "رمز عبور باید حداقل ۶ نویسه باشد.",
      wrongLogin: "نام کاربری یا رمز عبور اشتباه است.",
      userTaken: "این نام کاربری قبلاً گرفته شده است.",
      offline: "اتصال حساب فعلاً در دسترس نیست؛ ذخیرهٔ محلی همچنان فعال است.",
      error: "اتصال انجام نشد. اینترنت را بررسی کن و دوباره تلاش کن."
    },
    en: {
      account: "Account",
      title: "Account & Cloud Save",
      intro: "Sign in with a username and password to keep your progress available on your other devices.",
      username: "English username",
      password: "Password",
      signIn: "Sign In",
      signUp: "Create Account",
      signOut: "Sign Out",
      guest: "Continue as Guest",
      signedIn: name => `Signed in as ${name}`,
      syncing: "Syncing…",
      synced: "Cloud save complete ✓",
      created: "Account created and current progress saved ✓",
      restored: "Account progress restored ✓",
      invalidUser: "Use 3–24 English letters, numbers, or _ for the username.",
      shortPassword: "Password must contain at least 6 characters.",
      wrongLogin: "The username or password is incorrect.",
      userTaken: "That username is already taken.",
      offline: "Accounts are unavailable right now; local saving still works.",
      error: "Could not connect. Check your internet and try again."
    }
  };

  function language() {
    return typeof window.tpLanguage === "function" ? window.tpLanguage() :
      (localStorage.getItem(SAVE_PREFIX + "language") === "en" ? "en" : "fa");
  }

  function t(key, ...args) {
    const value = words[language()][key];
    return typeof value === "function" ? value(...args) : value;
  }

  function usernameFromUser(user) {
    return (user?.email || "").split("@")[0] || "player";
  }

  function normalizedUsername(value) {
    const username = value.trim().toLowerCase();
    return /^[a-z0-9_]{3,24}$/.test(username) ? username : null;
  }

  function accountEmail(username) {
    return `${username}@${USER_DOMAIN}`;
  }

  function collectSave() {
    const values = {};
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      if (key?.startsWith(SAVE_PREFIX)) values[key] = localStorage.getItem(key);
    }
    return { version: 1, values };
  }

  function normalizedSaveValues(save) {
    const values = save?.values || {};
    return Object.keys(values)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = values[key];
        return sorted;
      }, {});
  }

  function savesMatch(remote) {
    return JSON.stringify(normalizedSaveValues(remote)) ===
      JSON.stringify(normalizedSaveValues(collectSave()));
  }

  function applySave(save) {
    applyingCloudSave = true;
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(SAVE_PREFIX))
        .forEach(key => nativeRemoveItem.call(localStorage, key));

      Object.entries(save?.values || {}).forEach(([key, value]) => {
        if (key.startsWith(SAVE_PREFIX) && typeof value === "string") {
          nativeSetItem.call(localStorage, key, value);
        }
      });
    } finally {
      applyingCloudSave = false;
    }
  }

  async function syncNow() {
    clearTimeout(syncTimer);
    if (!client || !currentUser) return false;

    setStatus(t("syncing"));
    const { error } = await client.from("game_saves").upsert({
      user_id: currentUser.id,
      game_id: GAME_ID,
      save_data: collectSave(),
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id,game_id" });

    if (error) {
      setStatus(t("error"), true);
      return false;
    }

    setStatus(t("synced"));
    return true;
  }

  function queueCloudSync() {
    if (!currentUser || applyingCloudSave) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(syncNow, 700);
  }

  async function restoreCloudSave(user) {
    const { data, error } = await client
      .from("game_saves")
      .select("save_data,updated_at")
      .eq("user_id", user.id)
      .eq("game_id", GAME_ID)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      await syncNow();
      return false;
    }

    const changed = !savesMatch(data.save_data);
    if (changed) applySave(data.save_data);
    return changed;
  }

  function setStatus(message, isError = false) {
    const status = document.getElementById("tpAccountStatus");
    if (!status) return;
    status.textContent = message || "";
    status.classList.toggle("error", isError);
  }

  function updateAccountUI() {
    const button = document.getElementById("tpAccountButton");
    const signed = document.getElementById("tpSignedAccount");
    const form = document.getElementById("tpAccountForm");
    const signedText = document.getElementById("tpSignedText");

    if (!button) return;
    button.textContent = currentUser ? `☁ ${usernameFromUser(currentUser)}` : `☁ ${t("account")}`;
    signed.hidden = !currentUser;
    form.hidden = Boolean(currentUser);
    if (currentUser) signedText.textContent = t("signedIn", usernameFromUser(currentUser));
  }

  function translateUI() {
    const modal = document.getElementById("tpAccountModal");
    if (!modal) return;
    modal.dir = language() === "fa" ? "rtl" : "ltr";
    document.getElementById("tpAccountTitle").textContent = t("title");
    document.getElementById("tpAccountIntro").textContent = t("intro");
    document.getElementById("tpUsername").placeholder = t("username");
    document.getElementById("tpPassword").placeholder = t("password");
    document.getElementById("tpSignIn").textContent = t("signIn");
    document.getElementById("tpSignUp").textContent = t("signUp");
    document.getElementById("tpSignOut").textContent = t("signOut");
    document.getElementById("tpGuest").textContent = t("guest");
    updateAccountUI();
  }

  function openModal() {
    const modal = document.getElementById("tpAccountModal");
    modal.hidden = false;
    document.body.classList.add("tp-modal-open");
    translateUI();
  }

  function closeModal() {
    document.getElementById("tpAccountModal").hidden = true;
    document.body.classList.remove("tp-modal-open");
  }

  function credentials() {
    const username = normalizedUsername(document.getElementById("tpUsername").value);
    const password = document.getElementById("tpPassword").value;
    if (!username) throw new Error("INVALID_USER");
    if (password.length < 6) throw new Error("SHORT_PASSWORD");
    return { username, password, email: accountEmail(username) };
  }

  function readableError(error, creating = false) {
    if (error.message === "INVALID_USER") return t("invalidUser");
    if (error.message === "SHORT_PASSWORD") return t("shortPassword");
    const message = String(error.message || "").toLowerCase();
    if (creating && (message.includes("registered") || message.includes("exists"))) return t("userTaken");
    if (message.includes("invalid login")) return t("wrongLogin");
    return t("error");
  }

  async function signUp() {
    try {
      setStatus(t("syncing"));
      const { username, password, email } = credentials();
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: { data: { username } }
      });
      if (error) throw error;
      if (!data.session) throw new Error("CONFIRMATION_ENABLED");
      currentUser = data.user;
      updateAccountUI();
      await syncNow();
      setStatus(t("created"));
    } catch (error) {
      setStatus(readableError(error, true), true);
    }
  }

  async function signIn() {
    try {
      setStatus(t("syncing"));
      const { password, email } = credentials();
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      currentUser = data.user;
      updateAccountUI();
      const changed = await restoreCloudSave(currentUser);
      setStatus(t("restored"));
      if (changed) setTimeout(() => location.reload(), 450);
    } catch (error) {
      setStatus(readableError(error), true);
    }
  }

  async function signOut() {
    if (client) await client.auth.signOut();
    currentUser = null;
    updateAccountUI();
    setStatus("");
  }

  function buildUI() {
    const style = document.createElement("style");
    style.textContent = `
      .tp-account-button{position:absolute;top:20px;left:76px;height:46px;max-width:190px;padding:0 14px;border:1px solid var(--border);border-radius:23px;background:var(--panel);color:var(--gold);font-weight:bold;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;backdrop-filter:blur(12px)}
      .tp-account-modal[hidden]{display:none}.tp-account-modal{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:18px;background:rgba(3,5,8,.76);backdrop-filter:blur(9px)}
      .tp-account-panel{position:relative;width:min(100%,430px);padding:26px;border:1px solid var(--border);border-radius:24px;background:#111720;color:var(--text);box-shadow:0 25px 90px rgba(0,0,0,.55)}
      body.light .tp-account-panel{background:#e8eddd}.tp-account-close{position:absolute;top:12px;inset-inline-end:12px;width:38px;height:38px;border:0;border-radius:50%;background:rgba(255,255,255,.07);color:var(--text);font-size:22px}
      .tp-account-panel h2{margin:0 0 10px;padding-inline-end:38px;color:var(--gold);font:26px Georgia,serif}.tp-account-intro{margin:0 0 20px;color:var(--muted);font-size:13px;line-height:1.9}
      .tp-account-panel input{width:100%;margin:7px 0;padding:13px 14px;border:1px solid var(--border);border-radius:12px;outline:0;background:rgba(0,0,0,.18);color:var(--text);font:inherit;direction:ltr;text-align:left}.tp-account-panel input:focus{border-color:var(--gold)}
      .tp-account-actions{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:10px}.tp-account-primary,.tp-account-secondary,.tp-account-guest{padding:12px;border-radius:12px;font:inherit;font-weight:bold;cursor:pointer}
      .tp-account-primary{border:0;color:#17140b;background:linear-gradient(135deg,#f4d980,#b99338)}.tp-account-secondary{border:1px solid var(--border);color:var(--text);background:transparent}.tp-account-guest{width:100%;margin-top:9px;border:0;color:var(--muted);background:transparent}
      .tp-account-status{min-height:22px;margin:13px 0 0;color:var(--green);font-size:12px;line-height:1.7}.tp-account-status.error{color:#ff8f8f}.tp-signed-account{text-align:center}.tp-signed-account p{color:var(--green);overflow-wrap:anywhere}.tp-modal-open{overflow:hidden}
      @media(max-width:420px){.tp-account-button{width:46px;padding:0;font-size:0}.tp-account-button::first-letter{font-size:18px}.tp-account-actions{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);

    const button = document.createElement("button");
    button.id = "tpAccountButton";
    button.className = "tp-account-button";
    button.type = "button";
    document.querySelector(".hero").appendChild(button);

    const modal = document.createElement("div");
    modal.id = "tpAccountModal";
    modal.className = "tp-account-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <section class="tp-account-panel" role="dialog" aria-modal="true" aria-labelledby="tpAccountTitle">
        <button class="tp-account-close" id="tpAccountClose" type="button" aria-label="Close">×</button>
        <h2 id="tpAccountTitle"></h2>
        <p class="tp-account-intro" id="tpAccountIntro"></p>
        <div id="tpAccountForm">
          <input id="tpUsername" type="text" inputmode="text" autocomplete="username" maxlength="24">
          <input id="tpPassword" type="password" autocomplete="current-password" minlength="6">
          <div class="tp-account-actions">
            <button class="tp-account-primary" id="tpSignIn" type="button"></button>
            <button class="tp-account-secondary" id="tpSignUp" type="button"></button>
          </div>
        </div>
        <div class="tp-signed-account" id="tpSignedAccount" hidden>
          <p id="tpSignedText"></p>
          <button class="tp-account-secondary" id="tpSignOut" type="button"></button>
        </div>
        <p class="tp-account-status" id="tpAccountStatus" aria-live="polite"></p>
        <button class="tp-account-guest" id="tpGuest" type="button"></button>
      </section>`;
    document.body.appendChild(modal);

    button.onclick = openModal;
    document.getElementById("tpAccountClose").onclick = closeModal;
    document.getElementById("tpGuest").onclick = closeModal;
    document.getElementById("tpSignIn").onclick = signIn;
    document.getElementById("tpSignUp").onclick = signUp;
    document.getElementById("tpSignOut").onclick = signOut;
    modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
    window.addEventListener("tp-language-change", translateUI);
    translateUI();
  }

  async function initialize() {
    buildUI();
    if (!window.supabase?.createClient) {
      setStatus(t("offline"), true);
      return;
    }

    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });

    client.auth.onAuthStateChange((_event, session) => {
      currentUser = session?.user || null;
      updateAccountUI();
    });

    try {
      const { data } = await client.auth.getSession();
      currentUser = data.session?.user || null;
      updateAccountUI();
      if (currentUser) {
        const changed = await restoreCloudSave(currentUser);
        if (changed) location.reload();
      }
    } catch {
      setStatus(t("offline"), true);
    }
  }

  window.tpSyncNow = syncNow;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
