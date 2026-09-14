(() => {
  "use strict";

  const URL = "https://vhbcjfznzmpifjnwneaw.supabase.co";
  const KEY = "sb_publishable_dhNmwS9YTef0jy-kBNfNKQ_CY1Y_LXv";
  const client = window.supabase.createClient(URL, KEY);
  let journal = null;
  let section = "chapters";
  let editing = -1;

  const emptyContent = () => ({
    chapters: [], sideQuests: [], equipment: [], collectibles: []
  });
  const esc = (value = "") => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const idFrom = value => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `item-${Date.now()}`;
  const field = id => document.getElementById(id);

  const style = document.createElement("style");
  style.textContent = `
    .builder-modal[hidden]{display:none}.builder-modal{position:fixed;inset:0;z-index:2000;padding:14px;overflow:auto;background:rgba(2,5,8,.84);backdrop-filter:blur(9px)}.builder-box{width:min(100%,920px);margin:12px auto;padding:20px;border:1px solid var(--border);border-radius:23px;background:#0d1620;box-shadow:0 30px 100px rgba(0,0,0,.55)}.builder-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}.builder-head h2{margin:0;color:var(--gold);font:27px Georgia,serif}.builder-head p{margin:5px 0;color:var(--muted);font-size:11px}.builder-close{width:40px;height:40px;border:1px solid var(--border);border-radius:50%;color:var(--text);background:transparent;font-size:22px}.builder-details{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0}.builder-field{display:grid;gap:6px}.builder-field.wide{grid-column:1/-1}.builder-field label{color:var(--muted);font-size:11px}.builder-field input,.builder-field textarea,.builder-field select{width:100%;padding:11px;border:1px solid var(--border);border-radius:10px;outline:0;color:var(--text);background:#111f2b;font:inherit}.builder-field textarea{min-height:82px;resize:vertical}.builder-tabs{display:flex;gap:7px;overflow-x:auto;margin:18px 0 11px}.builder-tab{padding:9px 12px;border:1px solid var(--border);border-radius:999px;color:var(--muted);background:transparent;white-space:nowrap}.builder-tab.active{color:#17140b;background:var(--gold)}.builder-workspace{display:grid;grid-template-columns:1fr 1fr;gap:12px}.builder-list,.builder-form{padding:14px;border:1px solid var(--border);border-radius:16px;background:rgba(0,0,0,.1)}.builder-list h3,.builder-form h3{margin:0 0 12px;color:var(--gold);font:19px Georgia,serif}.builder-item{display:flex;align-items:center;justify-content:space-between;gap:9px;padding:10px 0;border-bottom:1px solid var(--border)}.builder-item:last-child{border:0}.builder-item strong{display:block;direction:ltr;text-align:left;font-size:13px}.builder-item small{color:var(--muted)}.builder-mini{padding:6px 8px;border:1px solid var(--border);border-radius:8px;color:var(--text);background:transparent;font-size:10px}.builder-form-grid{display:grid;gap:9px}.builder-help{color:var(--muted);font-size:10px;line-height:1.7}.builder-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}.builder-action{flex:1;min-width:130px;padding:12px;border:1px solid var(--border);border-radius:11px;color:var(--text);background:transparent;font-weight:bold}.builder-save{color:#17140b;border:0;background:linear-gradient(135deg,#f4dc84,#b68c32)}.builder-publish{color:var(--green)}.builder-status{min-height:20px;color:var(--green);font-size:11px}.builder-empty{padding:20px;text-align:center;color:var(--muted);font-size:11px}@media(max-width:680px){.builder-details,.builder-workspace{grid-template-columns:1fr}.builder-field.wide{grid-column:auto}.builder-box{padding:15px}}
  `;
  document.head.appendChild(style);

  const modal = document.createElement("div");
  modal.className = "builder-modal";
  modal.id = "journalBuilder";
  modal.hidden = true;
  modal.innerHTML = `
    <section class="builder-box" dir="rtl">
      <div class="builder-head"><div><h2>Journal Builder</h2><p>ساخت و مدیریت دفترچهٔ بازی</p></div><button class="builder-close" type="button">×</button></div>
      <div class="builder-details">
        <div class="builder-field"><label>نام بازی</label><input id="jbTitle" dir="ltr"></div>
        <div class="builder-field"><label>Slug / آدرس</label><input id="jbSlug" dir="ltr"></div>
        <div class="builder-field wide"><label>لینک تصویر</label><input id="jbCover" dir="ltr"></div>
        <div class="builder-field"><label>توضیح فارسی</label><textarea id="jbFa"></textarea></div>
        <div class="builder-field"><label>English description</label><textarea id="jbEn" dir="ltr"></textarea></div>
      </div>
      <div class="builder-tabs">
        <button class="builder-tab active" data-jb-tab="chapters">Main Chapters</button>
        <button class="builder-tab" data-jb-tab="sideQuests">Side Quests</button>
        <button class="builder-tab" data-jb-tab="equipment">Equipment</button>
        <button class="builder-tab" data-jb-tab="collectibles">Collectibles</button>
      </div>
      <div class="builder-workspace">
        <div class="builder-list"><h3 id="jbListTitle">Main Chapters</h3><div id="jbList"></div></div>
        <form class="builder-form" id="jbForm"><h3 id="jbFormTitle">افزودن مورد جدید</h3><div class="builder-form-grid" id="jbFields"></div><button class="primary" id="jbAdd" type="submit">افزودن</button></form>
      </div>
      <div class="builder-actions">
        <button class="builder-action builder-save" id="jbSave">Save Draft</button>
        <button class="builder-action builder-publish" id="jbPublish">Publish Journal</button>
      </div>
      <p class="builder-status" id="jbStatus"></p>
    </section>`;
  document.body.appendChild(modal);

  function content() {
    const value = journal.content && typeof journal.content === "object" ? journal.content : emptyContent();
    for (const key of Object.keys(emptyContent())) if (!Array.isArray(value[key])) value[key] = [];
    journal.content = value;
    return value;
  }

  function fieldsForSection() {
    const common = `
      <div class="builder-field"><label>English title *</label><input id="jbiTitle" required dir="ltr"></div>
      <div class="builder-field"><label>توضیح فارسی</label><textarea id="jbiFa"></textarea></div>
      <div class="builder-field"><label>English description</label><textarea id="jbiEn" dir="ltr"></textarea></div>`;
    if (section === "chapters") return common + `
      <div class="builder-field"><label>هدف‌های فصل</label><textarea id="jbiExtra" dir="ltr" placeholder="Task title | توضیح فارسی | English description"></textarea><span class="builder-help">هر هدف را در یک خط بنویس و سه قسمت را با | جدا کن.</span></div>`;
    if (section === "sideQuests") return common + `<div class="builder-field"><label>پس از فصل شماره</label><input id="jbiExtra" type="number" min="0" value="0" dir="ltr"></div>`;
    if (section === "equipment") return common + `<div class="builder-field"><label>Category</label><input id="jbiExtra" placeholder="weapon / armor / tool" dir="ltr"></div>`;
    return common + `<div class="builder-field"><label>تعداد کل</label><input id="jbiExtra" type="number" min="1" value="1" dir="ltr"></div>`;
  }

  function sectionLabel() {
    return ({ chapters: "Main Chapters", sideQuests: "Side Quests", equipment: "Equipment", collectibles: "Collectibles" })[section];
  }

  function renderBuilder() {
    field("jbTitle").value = journal.title || "";
    field("jbSlug").value = journal.slug || "";
    field("jbCover").value = journal.cover_url || "";
    field("jbFa").value = journal.description_fa || "";
    field("jbEn").value = journal.description_en || "";
    field("jbPublish").textContent = journal.status === "published" ? "Unpublish Journal" : "Publish Journal";
    renderSection();
  }

  function renderSection() {
    editing = -1;
    document.querySelectorAll("[data-jb-tab]").forEach(button => button.classList.toggle("active", button.dataset.jbTab === section));
    field("jbListTitle").textContent = sectionLabel();
    field("jbFormTitle").textContent = "افزودن مورد جدید";
    field("jbFields").innerHTML = fieldsForSection();
    field("jbAdd").textContent = "افزودن";
    const list = content()[section];

    field("jbList").innerHTML = list.length ? list.map((item, index) => `
      <div class="builder-item" data-index="${index}">
        <div><strong>${esc(item.title)}</strong><small>${section === "chapters" ? `${item.tasks?.length || 0} tasks` : esc(item.category || item.availableAfter || item.total || "")}</small></div>
        <div><button class="builder-mini" type="button" data-edit="${index}">ویرایش</button> <button class="builder-mini danger" type="button" data-delete="${index}">حذف</button></div>
      </div>`).join("") : '<div class="builder-empty">هنوز موردی اضافه نشده است.</div>';

    field("jbList").querySelectorAll("[data-delete]").forEach(button => button.onclick = () => {
      list.splice(Number(button.dataset.delete), 1);
      renderSection();
    });
    field("jbList").querySelectorAll("[data-edit]").forEach(button => editItem(Number(button.dataset.edit)));
  }

  function editItem(index) {
    editing = index;
    const item = content()[section][index];
    field("jbiTitle").value = item.title || "";
    field("jbiFa").value = item.summaryFa || item.descriptionFa || "";
    field("jbiEn").value = item.summaryEn || item.descriptionEn || "";
    if (section === "chapters") {
      field("jbiExtra").value = (item.tasks || []).map(task => task.join(" | ")).join("\n");
    } else if (section === "sideQuests") field("jbiExtra").value = item.availableAfter || 0;
    else if (section === "equipment") field("jbiExtra").value = item.category || "";
    else field("jbiExtra").value = item.total || 1;
    field("jbFormTitle").textContent = "ویرایش مورد";
    field("jbAdd").textContent = "ذخیرهٔ تغییر";
  }

  modal.querySelectorAll("[data-jb-tab]").forEach(button => button.onclick = () => {
    section = button.dataset.jbTab;
    renderSection();
  });

  field("jbForm").onsubmit = event => {
    event.preventDefault();
    const title = field("jbiTitle").value.trim();
    const fa = field("jbiFa").value.trim();
    const en = field("jbiEn").value.trim();
    const extra = field("jbiExtra").value.trim();
    let item = { id: idFrom(title), title };

    if (section === "chapters") {
      item.summaryFa = fa; item.summaryEn = en;
      item.tasks = extra.split("\n").map(line => line.trim()).filter(Boolean).map(line => {
        const parts = line.split("|").map(part => part.trim());
        return [parts[0] || "", parts[1] || "", parts[2] || ""];
      });
    } else {
      item.descriptionFa = fa; item.descriptionEn = en;
      if (section === "sideQuests") item.availableAfter = Number(extra) || 0;
      if (section === "equipment") item.category = extra || "item";
      if (section === "collectibles") item.total = Number(extra) || 1;
    }

    const list = content()[section];
    if (editing >= 0) list[editing] = item;
    else list.push(item);
    renderSection();
  };

  function readDetails() {
    journal.title = field("jbTitle").value.trim();
    journal.slug = idFrom(field("jbSlug").value || journal.title);
    journal.cover_url = field("jbCover").value.trim() || null;
    journal.description_fa = field("jbFa").value.trim() || null;
    journal.description_en = field("jbEn").value.trim() || null;
  }

  async function save(status = journal.status || "draft") {
    readDetails();
    field("jbStatus").textContent = "در حال ذخیره…";
    const payload = {
      title: journal.title, slug: journal.slug, cover_url: journal.cover_url,
      description_fa: journal.description_fa, description_en: journal.description_en,
      content: content(), status, updated_at: new Date().toISOString(),
      published_at: status === "published" ? (journal.published_at || new Date().toISOString()) : null
    };
    const { data, error } = await client.from("game_journals").update(payload).eq("id", journal.id).select().single();
    if (error) {
      field("jbStatus").textContent = error.message;
      field("jbStatus").style.color = "var(--red)";
      return false;
    }
    journal = data;
    field("jbStatus").style.color = "var(--green)";
    field("jbStatus").textContent = status === "published" ? "دفترچه منتشر شد ✓" : "Draft ذخیره شد ✓";
    renderBuilder();
    return true;
  }

  field("jbSave").onclick = () => save(journal.status || "draft");
  field("jbPublish").onclick = () => save(journal.status === "published" ? "draft" : "published");
  modal.querySelector(".builder-close").onclick = () => { modal.hidden = true; document.body.style.overflow = ""; };
  modal.onclick = event => { if (event.target === modal) modal.querySelector(".builder-close").click(); };

  window.openJournalBuilder = async candidateId => {
    field("jbStatus").textContent = "در حال آماده‌سازی Builder…";
    modal.hidden = false;
    document.body.style.overflow = "hidden";

    const { data: candidate, error: candidateError } = await client.from("game_candidates").select("*").eq("id", candidateId).single();
    if (candidateError) return field("jbStatus").textContent = candidateError.message;

    const existing = await client.from("game_journals").select("*").eq("candidate_id", candidateId).maybeSingle();
    if (existing.error) return field("jbStatus").textContent = existing.error.message;

    if (existing.data) {
      journal = existing.data;
    } else {
      const { data: session } = await client.auth.getSession();
      const created = await client.from("game_journals").insert({
        candidate_id: candidate.id,
        slug: candidate.slug,
        title: candidate.title,
        cover_url: candidate.cover_url,
        description_en: candidate.description,
        created_by: session.session.user.id,
        content: emptyContent()
      }).select().single();
      if (created.error) return field("jbStatus").textContent = created.error.message;
      journal = created.data;
    }

    field("jbStatus").textContent = "";
    section = "chapters";
    renderBuilder();
  };
})();
