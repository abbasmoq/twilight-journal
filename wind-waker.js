(() => {
  "use strict";

  const S = localStorage;
  const prefix = "ww-";
  let gameData = null;
  let activeTab = "side";

  const tr = {
    fa: {
      heroSubtitle:"دفترچهٔ شخصی و بدون اسپویل برای ثبت سفر تو در دریای بزرگ",
      scrollHint:"برای آغاز سفر پایین برو ↓",progressTitle:"پیشرفت سفر",progressHelp:"درصد سفر از روی هدف‌های کامل‌شدهٔ Main Journey محاسبه می‌شود.",
      statsTitle:"آمار سفر",sessions:"جلسه",hearts:"قلب",pieces:"قطعه قلب",addSession:"+ ثبت جلسهٔ جدید",addHeart:"♥ افزودن قلب",addPiece:"◇ افزودن Heart Piece",resetStats:"ریست آمار سفر",
      goalsTitle:"هدف‌های شخصی",notesTitle:"یادداشت‌های دریانوردی",notesPlaceholder:"جزیره‌ها، اتفاق‌ها و خاطرات سفرت را اینجا بنویس...",saved:"یادداشت ذخیره شد ✓",
      journey:"Main Journey",journeyHelp:"هر فصل را کامل کن تا مرحلهٔ بعدی از مه بیرون بیاید.",complete:"Complete Chapter",completed:"Chapter Completed ✓",locked:"???",resetJourney:"Reset Main Journey",resetJourneyAsk:"پیشرفت تمام فصل‌های اصلی پاک شود؟",
      database:"Great Sea Log",side:"Side Quests",charts:"Treasure Charts",equipment:"Equipment",songs:"Songs",search:"جست‌وجو...",resetSection:"Reset This Section",resetSectionAsk:"اطلاعات این بخش پاک شود؟",
      notStarted:"شروع‌نشده",inProgress:"در حال انجام",done:"تکمیل‌شده",obtained:"دریافت شده",chartFound:"Treasure recovered",lockedQuest:"این مأموریت پس از پیشرفت بیشتر در داستان آشکار می‌شود.",
      sideSummary:(a,b)=>`${a} از ${b} مأموریت تکمیل شده`,chartSummary:(a,b)=>`${a} از ${b} گنج پیدا شده`,equipmentSummary:(a,b)=>`${a} از ${b} وسیله دریافت شده`,songSummary:(a,b)=>`${a} از ${b} آهنگ یاد گرفته شده`,
      dataError:"فایل اطلاعات Wind Waker خوانده نشد.",quote:"«وقتی باد تو را فرا می‌خواند، افق پایان راه نیست؛ آغاز سفر است.»",footer:"دفترچهٔ طرفداری The Wind Waker HD • اطلاعات هر بازی جداگانه ذخیره می‌شود",
      goalExplore:"هر جزیره را بدون عجله کشف کن",goalCharts:"Treasure Chartها را دنبال کن",goalGallery:"Nintendo Gallery را کامل کن",goalStory:"داستان اصلی را تمام کن",resetAllAsk:"تمام اطلاعات ذخیره‌شدهٔ Wind Waker پاک شود؟"
    },
    en: {
      heroSubtitle:"A personal, spoiler-conscious journal for your voyage across the Great Sea.",scrollHint:"Scroll down to begin your voyage ↓",progressTitle:"Voyage Progress",progressHelp:"Progress is calculated from completed Main Journey objectives.",
      statsTitle:"Voyage Stats",sessions:"Sessions",hearts:"Hearts",pieces:"Heart Pieces",addSession:"+ Add Play Session",addHeart:"♥ Add Heart",addPiece:"◇ Add Heart Piece",resetStats:"Reset Voyage Stats",
      goalsTitle:"Personal Goals",notesTitle:"Captain's Notes",notesPlaceholder:"Write down islands, discoveries, and memories from your voyage...",saved:"Note saved ✓",
      journey:"Main Journey",journeyHelp:"Complete each chapter to bring the next one out of the fog.",complete:"Complete Chapter",completed:"Chapter Completed ✓",locked:"???",resetJourney:"Reset Main Journey",resetJourneyAsk:"Reset all Main Journey progress?",
      database:"Great Sea Log",side:"Side Quests",charts:"Treasure Charts",equipment:"Equipment",songs:"Songs",search:"Search...",resetSection:"Reset This Section",resetSectionAsk:"Clear the saved state for this section?",
      notStarted:"Not Started",inProgress:"In Progress",done:"Completed",obtained:"Obtained",chartFound:"Treasure recovered",lockedQuest:"This quest is revealed after more Main Journey progress.",
      sideSummary:(a,b)=>`${a} of ${b} side quests completed`,chartSummary:(a,b)=>`${a} of ${b} treasures recovered`,equipmentSummary:(a,b)=>`${a} of ${b} items obtained`,songSummary:(a,b)=>`${a} of ${b} songs learned`,
      dataError:"The Wind Waker data file could not be loaded.",quote:"“When the wind calls, the horizon is not the end—it is the beginning.”",footer:"Fan-made The Wind Waker HD journal • Each game's data is saved separately",
      goalExplore:"Explore every island at your own pace",goalCharts:"Follow the Treasure Charts",goalGallery:"Complete the Nintendo Gallery",goalStory:"Finish the main story",resetAllAsk:"Delete all saved Wind Waker data?"
    }
  };

  function lang(){return S.getItem(prefix+"language")==="en"?"en":"fa"}
  function t(key,...args){const value=tr[lang()][key];return typeof value==="function"?value(...args):value}
  window.tpLanguage=lang;window.tpT=t;

  function json(key,fallback){try{return JSON.parse(S.getItem(key)||JSON.stringify(fallback))}catch{return fallback}}
  function missionState(){return json(prefix+"missions",{unlocked:1,completed:[],checks:{}})}
  function saveMission(state){S.setItem(prefix+"missions",JSON.stringify(state))}
  function localized(fa,en){return lang()==="en"?en:fa}

  const extraStyles=document.createElement("style");
  extraStyles.textContent=`
    .journey-head,.log-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.journey-rate{color:var(--gold);font:25px Georgia,serif}.chapter{margin-top:13px;border:1px solid var(--border);border-radius:18px;overflow:hidden;background:rgba(0,0,0,.1)}.chapter.locked{opacity:.45;filter:grayscale(1)}
    .chapter summary{display:flex;align-items:center;gap:13px;padding:17px;cursor:pointer;list-style:none}.chapter summary::-webkit-details-marker{display:none}.chapter-number{width:39px;height:39px;display:grid;place-items:center;flex:none;border-radius:50%;color:var(--gold);background:rgba(240,203,101,.1)}.chapter-title{direction:ltr;text-align:left;font:21px Georgia,serif}.chapter-body{padding:0 17px 17px}.chapter-summary{margin:0 0 12px;color:var(--muted);line-height:1.8;font-size:13px}.mission-row{display:grid;grid-template-columns:auto 1fr;gap:11px;padding:13px 0;border-bottom:1px solid var(--border)}.mission-row input{width:19px;height:19px;accent-color:var(--green)}.mission-copy strong{display:block;direction:ltr;text-align:left}.mission-copy span{display:block;margin-top:5px;color:var(--muted);font-size:12px;line-height:1.7}.chapter-finish{width:100%;margin-top:14px;padding:12px;border:0;border-radius:12px;color:#17140b;background:linear-gradient(135deg,#f5dc84,#ae8731);font-weight:bold}.chapter-finish:disabled{opacity:.38}.reset-line{width:100%;margin-top:16px;padding:11px;border:1px solid rgba(255,120,120,.27);border-radius:12px;color:var(--danger);background:rgba(120,20,20,.1)}
    .log-tabs{display:flex;gap:8px;width:100%;overflow-x:auto;padding:4px 0 12px}.log-tab{padding:9px 13px;border:1px solid var(--border);border-radius:999px;color:var(--muted);background:transparent;white-space:nowrap}.log-tab.active{color:#172027;background:var(--gold);border-color:var(--gold)}.log-search{width:100%;padding:12px 14px;margin:3px 0 12px;border:1px solid var(--border);border-radius:12px;outline:0;color:var(--text);background:rgba(0,0,0,.15);font:inherit}.log-summary{margin:0 0 12px;color:var(--muted);font-size:12px}.log-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.log-entry{min-width:0;padding:14px;border:1px solid var(--border);border-radius:15px;background:rgba(0,0,0,.1)}.log-entry.done{border-color:rgba(105,221,178,.55)}.log-entry.locked{opacity:.45}.log-title{margin:0 0 7px;color:var(--gold);font:18px Georgia,serif;direction:ltr;text-align:left}.log-description{min-height:40px;margin:0;color:var(--muted);font-size:12px;line-height:1.75}.log-entry select{width:100%;margin-top:10px;padding:9px;border:1px solid var(--border);border-radius:9px;color:var(--text);background:#102430}.log-check{display:flex;align-items:center;gap:8px;margin-top:11px;color:var(--muted);font-size:12px}.log-check input{width:18px;height:18px;accent-color:var(--green)}.log-reset{width:100%;margin-top:14px;padding:11px;border:1px solid var(--border);border-radius:11px;color:var(--text);background:transparent}
    body.light .log-entry select{color:#172c32;background:#e6eee6}@media(max-width:650px){.log-grid{grid-template-columns:1fr}.chapter summary{padding:14px}.chapter-body{padding:0 14px 14px}}
  `;document.head.appendChild(extraStyles);

  function applyLanguage(){
    const isFa=lang()==="fa";document.documentElement.lang=isFa?"fa":"en";document.documentElement.dir=isFa?"rtl":"ltr";
    document.getElementById("languageButton").textContent=isFa?"EN":"FA";
    ["heroSubtitle","scrollHint","progressTitle","progressHelp","statsTitle","notesTitle","quote","footer"].forEach(id=>document.getElementById(id).textContent=t(id));
    document.getElementById("sessionsLabel").textContent=t("sessions");document.getElementById("heartsLabel").textContent=t("hearts");document.getElementById("piecesLabel").textContent=t("pieces");
    document.getElementById("sessionButton").textContent=t("addSession");document.getElementById("heartButton").textContent=t("addHeart");document.getElementById("pieceButton").textContent=t("addPiece");document.getElementById("resetStats").textContent=t("resetStats");
    document.getElementById("goalsTitle").textContent=t("goalsTitle");document.getElementById("notes").placeholder=t("notesPlaceholder");document.getElementById("savedMessage").textContent=t("saved");
    renderGoals();if(gameData){renderJourney();renderLog()}
  }
  window.applyTpLanguage=applyLanguage;

  function renderGoals(){
    const goals=[["explore","goalExplore"],["charts","goalCharts"],["gallery","goalGallery"],["story","goalStory"]];
    document.getElementById("goals").innerHTML=goals.map(([id,label])=>`<label class="check-item"><input type="checkbox" data-goal="${id}" ${S.getItem(prefix+"goal-"+id)==="true"?"checked":""}><span>${t(label)}</span></label>`).join("");
    document.querySelectorAll("[data-goal]").forEach(box=>box.onchange=()=>S.setItem(prefix+"goal-"+box.dataset.goal,String(box.checked)));
  }

  function updateProgress(){
    if(!gameData)return;const state=missionState();let total=0,done=0;
    gameData.chapters.forEach((chapter,ci)=>chapter.tasks.forEach((_,ti)=>{total++;if(state.checks[ci+"-"+ti])done++}));
    const value=total?Math.round(done/total*100):0;document.getElementById("progressValue").textContent=value;document.getElementById("progress").value=value;
    const rate=document.querySelector(".journey-rate");if(rate)rate.textContent=value+"%";
  }

  function renderJourney(){
    const state=missionState(),card=document.getElementById("journeyCard");
    card.innerHTML=`<div class="journey-head"><div><h2 class="card-title" style="margin-bottom:6px">${t("journey")}</h2><p class="small" style="margin:0">${t("journeyHelp")}</p></div><span class="journey-rate">0%</span></div><div id="chapterList"></div><button class="reset-line" id="resetJourney">${t("resetJourney")}</button>`;
    const list=card.querySelector("#chapterList");
    gameData.chapters.forEach((chapter,ci)=>{
      const unlocked=ci<state.unlocked,completed=state.completed.includes(ci),details=document.createElement("details");details.className="chapter"+(unlocked?"":" locked");details.open=unlocked&&ci===state.unlocked-1;
      if(!unlocked){details.innerHTML=`<summary><span class="chapter-number">⌁</span><span class="chapter-title">${t("locked")}</span></summary>`;list.appendChild(details);return}
      details.innerHTML=`<summary><span class="chapter-number">${ci+1}</span><span class="chapter-title">${chapter.title}</span></summary><div class="chapter-body"><p class="chapter-summary">${localized(chapter.summaryFa,chapter.summaryEn)}</p><div class="chapter-tasks"></div><button class="chapter-finish">${completed?t("completed"):t("complete")}</button></div>`;
      const tasks=details.querySelector(".chapter-tasks"),finish=details.querySelector(".chapter-finish");
      chapter.tasks.forEach((task,ti)=>{const key=ci+"-"+ti,label=document.createElement("label");label.className="mission-row";label.innerHTML=`<input type="checkbox" ${state.checks[key]?"checked":""}><span class="mission-copy"><strong>${task[0]}</strong><span>${localized(task[1],task[2])}</span></span>`;label.querySelector("input").onchange=e=>{state.checks[key]=e.target.checked;saveMission(state);finish.disabled=completed||!chapter.tasks.every((_,i)=>state.checks[ci+"-"+i]);updateProgress()};tasks.appendChild(label)});
      finish.disabled=completed||!chapter.tasks.every((_,i)=>state.checks[ci+"-"+i]);finish.onclick=()=>{if(!state.completed.includes(ci))state.completed.push(ci);state.unlocked=Math.min(gameData.chapters.length,Math.max(state.unlocked,ci+2));saveMission(state);renderJourney();updateProgress();document.querySelectorAll(".chapter")[ci+1]?.scrollIntoView({behavior:"smooth",block:"center"})};list.appendChild(details);
    });
    card.querySelector("#resetJourney").onclick=()=>{if(!confirm(t("resetJourneyAsk")))return;S.removeItem(prefix+"missions");renderJourney();updateProgress()};updateProgress();
  }

  function available(side){return side[4]<=1||missionState().completed.includes(side[4]-1)}
  function currentStore(){return activeTab==="side"?json(prefix+"side-statuses",{}):activeTab==="charts"?json(prefix+"treasure-statuses",{}):activeTab==="equipment"?json(prefix+"equipment-statuses",{}):json(prefix+"song-statuses",{})}
  function saveStore(value){const key={side:"side-statuses",charts:"treasure-statuses",equipment:"equipment-statuses",songs:"song-statuses"}[activeTab];S.setItem(prefix+key,JSON.stringify(value))}

  function renderLog(){
    const card=document.getElementById("databaseCard"),query=(card.querySelector(".log-search")?.value||"").trim().toLowerCase();
    card.innerHTML=`<div class="log-head"><h2 class="card-title">${t("database")}</h2><span class="small">Data v${gameData.contentVersion}</span></div><div class="log-tabs">${[["side","side"],["charts","charts"],["equipment","equipment"],["songs","songs"]].map(([id,label])=>`<button class="log-tab ${activeTab===id?"active":""}" data-tab="${id}">${t(label)}</button>`).join("")}</div><input class="log-search" type="search" placeholder="${t("search")}" value="${query.replaceAll('"','&quot;')}"><p class="log-summary"></p><div class="log-grid"></div><button class="log-reset">${t("resetSection")}</button>`;
    card.querySelectorAll("[data-tab]").forEach(button=>button.onclick=()=>{activeTab=button.dataset.tab;renderLog()});card.querySelector(".log-search").oninput=e=>renderEntries(e.target.value.trim().toLowerCase());card.querySelector(".log-reset").onclick=()=>{if(!confirm(t("resetSectionAsk")))return;saveStore({});renderLog()};renderEntries(query);
  }

  function renderEntries(query=""){
    const grid=document.querySelector("#databaseCard .log-grid"),summary=document.querySelector("#databaseCard .log-summary"),state=currentStore();grid.innerHTML="";
    if(activeTab==="side"){
      const done=gameData.sideQuests.filter(x=>state[x[0]]==="completed").length;summary.textContent=t("sideSummary",done,gameData.sideQuests.length);
      gameData.sideQuests.filter(x=>!query||x[1].toLowerCase().includes(query)||localized(x[2],x[3]).toLowerCase().includes(query)).forEach(item=>{const unlocked=available(item),status=state[item[0]]||"not-started",el=document.createElement("section");el.className="log-entry"+(status==="completed"?" done":"")+(unlocked?"":" locked");el.innerHTML=unlocked?`<h3 class="log-title">${item[1]}</h3><p class="log-description">${localized(item[2],item[3])}</p><select><option value="not-started">${t("notStarted")}</option><option value="in-progress">${t("inProgress")}</option><option value="completed">${t("done")}</option></select>`:`<h3 class="log-title">???</h3><p class="log-description">${t("lockedQuest")}</p>`;if(unlocked){const select=el.querySelector("select");select.value=status;select.onchange=()=>{state[item[0]]=select.value;saveStore(state);renderEntries(query)}}grid.appendChild(el)});
    } else if(activeTab==="charts"){
      const items=Array.from({length:46},(_,i)=>({id:"chart-"+(i+1),title:"Treasure Chart #"+(i+1)})),done=items.filter(x=>state[x.id]).length;summary.textContent=t("chartSummary",done,items.length);items.filter(x=>!query||x.title.toLowerCase().includes(query)).forEach(item=>grid.appendChild(checkCard(item.id,item.title,"",Boolean(state[item.id]),value=>{state[item.id]=value;saveStore(state);renderEntries(query)},t("chartFound"))));
    } else {
      const items=activeTab==="equipment"?gameData.equipment:gameData.songs,done=items.filter(x=>state[x[0]]).length;summary.textContent=t(activeTab==="equipment"?"equipmentSummary":"songSummary",done,items.length);
      items.filter(x=>!query||x[1].toLowerCase().includes(query)||localized(activeTab==="equipment"?x[3]:x[2],activeTab==="equipment"?x[4]:x[3]).toLowerCase().includes(query)).forEach(item=>{const fa=activeTab==="equipment"?item[3]:item[2],en=activeTab==="equipment"?item[4]:item[3];grid.appendChild(checkCard(item[0],item[1],localized(fa,en),Boolean(state[item[0]]),value=>{state[item[0]]=value;saveStore(state);renderEntries(query)},t("obtained")))});
    }
  }

  function checkCard(id,title,description,checked,onchange,label){const el=document.createElement("section");el.className="log-entry"+(checked?" done":"");el.innerHTML=`<h3 class="log-title">${title}</h3>${description?`<p class="log-description">${description}</p>`:""}<label class="log-check"><input type="checkbox" ${checked?"checked":""}>${label}</label>`;el.querySelector("input").onchange=e=>onchange(e.target.checked);return el}

  function initStats(){let sessions=Number(S.getItem(prefix+"sessions")||0),hearts=Number(S.getItem(prefix+"hearts")||3),pieces=Number(S.getItem(prefix+"heart-pieces")||0);const draw=()=>{document.getElementById("sessions").textContent=sessions;document.getElementById("hearts").textContent=hearts;document.getElementById("heartPieces").textContent=pieces};draw();document.getElementById("sessionButton").onclick=()=>{sessions++;S.setItem(prefix+"sessions",sessions);draw()};document.getElementById("heartButton").onclick=()=>{hearts=Math.min(20,hearts+1);S.setItem(prefix+"hearts",hearts);draw()};document.getElementById("pieceButton").onclick=()=>{pieces=Math.min(44,pieces+1);S.setItem(prefix+"heart-pieces",pieces);draw()};document.getElementById("resetStats").onclick=()=>{sessions=0;hearts=3;pieces=0;S.setItem(prefix+"sessions",0);S.setItem(prefix+"hearts",3);S.setItem(prefix+"heart-pieces",0);draw()}}

  async function init(){
    document.getElementById("languageButton").onclick=()=>{S.setItem(prefix+"language",lang()==="fa"?"en":"fa");applyLanguage();window.dispatchEvent(new CustomEvent("tp-language-change"))};
    const theme=document.getElementById("themeButton");if(S.getItem(prefix+"theme")==="light"){document.body.classList.add("light");theme.textContent="☀"}theme.onclick=()=>{document.body.classList.toggle("light");const light=document.body.classList.contains("light");theme.textContent=light?"☀":"☾";S.setItem(prefix+"theme",light?"light":"dark")};
    const notes=document.getElementById("notes"),saved=document.getElementById("savedMessage");notes.value=S.getItem(prefix+"notes")||"";notes.oninput=()=>{S.setItem(prefix+"notes",notes.value);saved.classList.add("show");clearTimeout(window.wwSaved);window.wwSaved=setTimeout(()=>saved.classList.remove("show"),1000)};
    initStats();applyLanguage();for(let i=0;i<28;i++){const b=document.createElement("span");b.className="bubble";b.style.left=Math.random()*100+"%";b.style.animationDuration=7+Math.random()*9+"s";b.style.animationDelay=Math.random()*9+"s";document.getElementById("bubbles").appendChild(b)}
    try{const response=await fetch("./data/wind-waker-hd.json",{cache:"no-store"});if(!response.ok)throw new Error();gameData=await response.json();renderJourney();renderLog()}catch{document.getElementById("journeyCard").innerHTML=`<p class="small">${t("dataError")}</p>`;document.getElementById("databaseCard").innerHTML=`<p class="small">${t("dataError")}</p>`}
  }
  init();
})();
