(() => {
  "use strict";

  const URL = "https://vhbcjfznzmpifjnwneaw.supabase.co";
  const KEY = "sb_publishable_dhNmwS9YTef0jy-kBNfNKQ_CY1Y_LXv";
  if (!window.supabase?.createClient) return;

  const client = window.supabase.createClient(URL, KEY);
  const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  const style = document.createElement("style");
  style.textContent = `
    .approved-wrap{margin-top:42px;text-align:left}.approved-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:15px;margin-bottom:15px}.approved-heading h2{margin:0;color:var(--gold);font:29px Georgia,serif}.approved-heading p{margin:5px 0 0;color:var(--muted);font-size:12px}.approved-count{color:#6fd5ab;font-size:12px;white-space:nowrap}.approved-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}.approved-game-link{text-decoration:none;color:inherit}.approved-game{position:relative;min-height:260px;overflow:hidden;border:1px solid var(--border);border-radius:20px;background:var(--panel)}.approved-cover{width:100%;height:145px;object-fit:cover;background:#142431}.approved-cover-empty{display:grid;place-items:center;color:var(--muted);font-size:36px}.approved-body{padding:14px}.approved-game h3{margin:0 0 7px;color:var(--gold);font:19px Georgia,serif;direction:ltr}.approved-meta{display:flex;gap:6px;flex-wrap:wrap}.approved-chip{padding:4px 7px;border-radius:999px;color:#6fd5ab;background:rgba(111,213,171,.09);font-size:10px}.approved-game p{margin:9px 0 27px;color:var(--muted);font-size:11px;line-height:1.65}.coming-badge{position:absolute;bottom:12px;inset-inline-end:12px;color:#e8c66a;font-size:10px}.approved-fa{direction:rtl}.approved-empty{padding:25px;border:1px dashed var(--border);border-radius:17px;text-align:center;color:var(--muted);font-size:12px}@media(max-width:720px){.approved-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:480px){.approved-grid{grid-template-columns:1fr}.approved-heading{align-items:flex-start;flex-direction:column}}
  `;
  document.head.appendChild(style);

  async function loadApproved() {
    const [candidateResult, journalResult] = await Promise.all([
      client.from("game_candidates")
        .select("id,title,cover_url,released,rating,metacritic,description,reviewed_at")
        .eq("status", "approved")
        .order("reviewed_at", { ascending: false })
        .limit(12),
      client.from("game_journals")
        .select("candidate_id,slug,status")
        .eq("status", "published")
    ]);

    if (candidateResult.error) return;
    const data = candidateResult.data || [];
    const published = new Map((journalResult.data || []).map(item => [item.candidate_id, item]));

    const section = document.createElement("section");
    section.className = "approved-wrap";
    section.innerHTML = `
      <div class="approved-heading">
        <div><h2>Upcoming Journals</h2><p class="approved-fa">بازی‌های تأییدشده و دفترچه‌های ساخته‌شده</p></div>
        <span class="approved-count">${data.length} Approved</span>
      </div>
      <div class="approved-grid"></div>
    `;

    const grid = section.querySelector(".approved-grid");
    if (!data.length) {
      grid.innerHTML = '<div class="approved-empty">No approved games yet · هنوز بازی تأییدشده‌ای وجود ندارد.</div>';
    } else {
      grid.innerHTML = data.map(game => {
        const ready = published.get(game.id);
        const open = ready
          ? `<a class="approved-game approved-game-link" href="journal.html?game=${encodeURIComponent(ready.slug)}">`
          : '<article class="approved-game">';
        const close = ready ? "</a>" : "</article>";
        return `
          ${open}
            ${game.cover_url
              ? `<img class="approved-cover" src="${escapeHtml(game.cover_url)}" alt="" loading="lazy">`
              : '<div class="approved-cover approved-cover-empty">🎮</div>'}
            <div class="approved-body">
              <h3>${escapeHtml(game.title)}</h3>
              <div class="approved-meta">
                ${game.metacritic != null ? `<span class="approved-chip">MC ${game.metacritic}</span>` : ""}
                ${game.rating != null ? `<span class="approved-chip">★ ${game.rating}</span>` : ""}
                ${game.released ? `<span class="approved-chip">${escapeHtml(game.released)}</span>` : ""}
              </div>
              ${game.description ? `<p>${escapeHtml(game.description).slice(0, 145)}</p>` : ""}
              <span class="coming-badge">${ready ? "Open Journal" : "Journal Coming Soon"}</span>
            </div>
          ${close}`;
      }).join("");
    }

    document.querySelector(".games").after(section);
  }
  loadApproved();
})();
