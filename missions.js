const chapters = [
  {
    title: "Ordon Village",
    description: "آغاز آرام ماجراجویی و آشنایی با زندگی Link در روستا.",
    tasks: [
      ["Village Life", "با اهالی Ordon Village صحبت کن و کارهای روزانه را انجام بده."],
      ["Goat Herding", "به مزرعه برو و در جمع‌کردن بزها کمک کن."],
      ["First Equipment", "وسایل ابتدایی موردنیاز Link را تهیه کن."],
      ["Journey Begins", "برای آغاز سفر به سمت Hyrule آماده شو."]
    ]
  },
  {
    title: "The Twilight",
    description: "اولین رویارویی با قلمروی اسرارآمیز Twilight.",
    tasks: [
      ["Prison Break", "راه خروج از زندان را پیدا کن."],
      ["Castle Sewers", "از مسیر زیرزمینی و فاضلاب عبور کن."],
      ["Hyrule Castle", "خودت را به بخش بالایی قلعه برسان."],
      ["Return to the Light", "راه بازگشت از قلمروی Twilight را پیدا کن."]
    ]
  },
  {
    title: "Faron Woods: Twilight",
    description: "بازگشت به جنگل و تلاش برای برگرداندن نور.",
    tasks: [
      ["Enter Faron Woods", "وارد بخش تاریک Faron Woods شو."],
      ["Tears of Light", "Tears of Lightهای این منطقه را پیدا کن."],
      ["Restore Faron", "نور را به Faron Province بازگردان."]
    ]
  },
  {
    title: "Forest Temple",
    description: "اولین سیاه‌چال بزرگ سفر.",
    tasks: [
      ["Enter the Temple", "مسیر ورود به Forest Temple را کامل کن."],
      ["Lost Monkeys", "میمون‌های گرفتار در معبد را پیدا کن."],
      ["Gale Boomerang", "آیتم اصلی این معبد را به دست بیاور."],
      ["Temple Guardian", "نبرد نهایی معبد را تمام کن."]
    ]
  },
  {
    title: "Kakariko Village: Twilight",
    description: "سفر به منطقه‌ای تازه که در تاریکی فرو رفته است.",
    tasks: [
      ["Reach Kakariko", "مسیر رسیدن به Kakariko Village را پیدا کن."],
      ["Search the Village", "تمام بخش‌های قابل‌دسترسی روستا را بررسی کن."],
      ["Tears of Light", "Tears of Lightهای این منطقه را جمع‌آوری کن."],
      ["Restore Eldin", "نور را به Eldin Province بازگردان."]
    ]
  },
  {
    title: "Death Mountain",
    description: "صعود از کوه و جلب اعتماد Goronها.",
    tasks: [
      ["Mountain Trail", "مسیر Death Mountain را طی کن."],
      ["Goron Challenge", "راه عبور از نگهبانان Goron را یاد بگیر."],
      ["Sumo Training", "برای رویارویی بعدی آماده شو."],
      ["Reach the Mines", "راه ورود به Goron Mines را باز کن."]
    ]
  },
  {
    title: "Goron Mines",
    description: "کاوش در معدن داغ و مکانیکی Goronها.",
    tasks: [
      ["Explore the Mines", "بخش‌های ابتدایی معدن را بررسی کن."],
      ["Goron Elders", "با بزرگان Goron ملاقات کن."],
      ["Hero's Bow", "آیتم اصلی معدن را به دست بیاور."],
      ["Mine Guardian", "نبرد نهایی معدن را تمام کن."]
    ]
  },
  {
    title: "Lanayru Province: Twilight",
    description: "گسترش سفر به بزرگ‌ترین بخش Hyrule.",
    tasks: [
      ["Reach Lake Hylia", "راه رسیدن به Lake Hylia را پیدا کن."],
      ["Restore the Water", "مشکل جریان آب منطقه را برطرف کن."],
      ["Tears of Light", "Tears of Lightهای Lanayru را جمع‌آوری کن."],
      ["Restore Lanayru", "نور را به این سرزمین بازگردان."]
    ]
  },
  {
    title: "Lakebed Temple",
    description: "ورود به معبدی پیچیده در اعماق آب.",
    tasks: [
      ["Prepare for the Depths", "تجهیزات لازم برای ورود به معبد را آماده کن."],
      ["Control the Water", "مسیر جریان آب داخل معبد را تغییر بده."],
      ["Clawshot", "آیتم اصلی معبد را پیدا کن."],
      ["Temple Guardian", "نبرد نهایی معبد را تمام کن."]
    ]
  },
  {
    title: "The Master Sword",
    description: "سفری مهم برای یافتن شمشیری افسانه‌ای.",
    tasks: [
      ["Help Midna", "راه نجات Midna را پیدا کن."],
      ["Enter Sacred Grove", "مسیر مخفی Sacred Grove را باز کن."],
      ["Guardian Puzzle", "معمای نگهبانان جنگل را حل کن."],
      ["Claim the Sword", "شمشیر افسانه‌ای را به دست بیاور."]
    ]
  },
  {
    title: "Gerudo Desert",
    description: "حرکت به سوی بیابانی دورافتاده و ناشناخته.",
    tasks: [
      ["Reach the Desert", "راه انتقال به Gerudo Desert را پیدا کن."],
      ["Desert Exploration", "بخش‌های مهم بیابان را بررسی کن."],
      ["Enemy Camp", "از اردوگاه دشمن عبور کن."],
      ["Ancient Grounds", "راه ورود به بنای باستانی را باز کن."]
    ]
  },
  {
    title: "Arbiter's Grounds",
    description: "کاوش در زندانی باستانی و تاریک.",
    tasks: [
      ["Four Poe Flames", "چهار شعلهٔ گمشده را پیدا کن."],
      ["Spinner", "آیتم اصلی این مکان را به دست بیاور."],
      ["Ancient Guardian", "نبرد اصلی این بخش را تمام کن."],
      ["Mirror Chamber", "خودت را به اتاق Mirror برسان."]
    ]
  },
  {
    title: "Scaling Snowpeak",
    description: "صعود از منطقه‌ای یخ‌زده و خطرناک.",
    tasks: [
      ["Follow the Scent", "رد مسیر را در میان برف دنبال کن."],
      ["Climb Snowpeak", "خودت را به بالای کوه برسان."],
      ["Snowboard Race", "مسیر سریع کوهستانی را کامل کن."],
      ["Reach the Ruins", "به عمارت متروکه وارد شو."]
    ]
  },
  {
    title: "Snowpeak Ruins",
    description: "جست‌وجو در عمارتی عجیب میان برف.",
    tasks: [
      ["Explore the Mansion", "اتاق‌های قابل‌دسترسی عمارت را بررسی کن."],
      ["Find the Ingredients", "به ساکنان عمارت برای تکمیل غذایشان کمک کن."],
      ["Ball and Chain", "آیتم اصلی عمارت را پیدا کن."],
      ["Mansion Guardian", "نبرد نهایی عمارت را تمام کن."]
    ]
  },
  {
    title: "Sacred Grove: Round Two",
    description: "بازگشت دوباره به جنگل مقدس.",
    tasks: [
      ["Return to the Grove", "دوباره مسیر Sacred Grove را پیدا کن."],
      ["Follow the Guide", "راهنمای جنگل را تا پایان دنبال کن."],
      ["Pedestal Puzzle", "معمای بخش مقدس را حل کن."],
      ["Open the Ancient Door", "دروازهٔ زمان را فعال کن."]
    ]
  },
  {
    title: "Temple of Time",
    description: "حرکت در معبدی میان گذشته و حال.",
    tasks: [
      ["Climb the Temple", "خودت را به طبقات بالاتر معبد برسان."],
      ["Dominion Rod", "آیتم اصلی معبد را پیدا کن."],
      ["Ancient Statue", "مجسمهٔ باستانی را به ورودی بازگردان."],
      ["Temple Guardian", "نبرد نهایی معبد را تمام کن."]
    ]
  },
  {
    title: "In Search of the Sky",
    description: "پیداکردن راه رسیدن به سرزمینی در آسمان.",
    tasks: [
      ["Restore the Memories", "برای بازیابی خاطرات ازدست‌رفته کمک کن."],
      ["Hidden Village", "روستای مخفی را پیدا کن."],
      ["Ancient Book", "اطلاعات کتاب باستانی را کامل کن."],
      ["Repair the Cannon", "وسیلهٔ رسیدن به آسمان را آماده کن."]
    ]
  },
  {
    title: "City in the Sky",
    description: "کاوش در شهری معلق بر فراز ابرها.",
    tasks: [
      ["Enter the City", "مسیر ابتدایی شهر آسمانی را طی کن."],
      ["Double Clawshots", "آیتم اصلی این بخش را به دست بیاور."],
      ["Cross the Sky", "با استفاده از توانایی جدید پیشروی کن."],
      ["Sky Guardian", "نبرد نهایی شهر را تمام کن."]
    ]
  },
  {
    title: "Palace of Twilight",
    description: "ورود به قلب قلمروی Twilight.",
    tasks: [
      ["Enter the Palace", "راه ورود به قصر را باز کن."],
      ["Recover the Sols", "منابع نور قصر را پیدا و منتقل کن."],
      ["Empower the Sword", "قدرت تازه‌ای برای شمشیر آزاد کن."],
      ["Palace Guardian", "نبرد اصلی این قلمرو را کامل کن."]
    ]
  },
  {
    title: "Hyrule Castle",
    description: "آخرین بخش از سفر اصلی در Hyrule.",
    tasks: [
      ["Enter the Castle", "راه ورود به Hyrule Castle را باز کن."],
      ["Explore the Castle", "مسیرهای داخلی و اختیاری قلعه را بررسی کن."],
      ["Reach the Throne", "خودت را برای رویارویی پایانی آماده کن."],
      ["Complete the Journey", "داستان اصلی Twilight Princess را تمام کن."]
    ]
  }
];

const missionStyle = document.createElement("style");
missionStyle.textContent = `
  .journey-head {
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:12px;
    margin-bottom:18px;
    min-width:0;
  }

  .journey-progress {
    color:var(--gold);
    font-weight:bold;
    white-space:nowrap;
  }

  .chapter {
    margin:12px 0;
    width:100%;
    min-width:0;
    max-width:100%;
    border:1px solid var(--border);
    border-radius:17px;
    overflow:hidden;
    background:rgba(0,0,0,.13);
    transition:.35s;
  }

  .chapter.locked {
    opacity:.52;
    filter:grayscale(1);
  }

  .chapter.completed {
    border-color:rgba(101,214,160,.55);
  }

  .chapter-header {
    width:100%;
    min-width:0;
    padding:16px;
    border:0;
    color:var(--text);
    background:transparent;
    display:flex;
    align-items:center;
    gap:12px;
    text-align:right;
    cursor:pointer;
  }

  .chapter-number {
    width:34px;
    height:34px;
    border-radius:50%;
    display:grid;
    place-items:center;
    background:rgba(232,198,106,.12);
    color:var(--gold);
    flex:none;
  }

  .chapter-name {
    flex:1;
    min-width:0;
    overflow-wrap:anywhere;
    font-family:Georgia,serif;
    font-size:17px;
  }

  .chapter-status {
    color:var(--muted);
  }

  .chapter-body {
    display:none;
    min-width:0;
    padding:0 16px 16px;
  }

  .chapter.open .chapter-body {
    display:block;
    animation:chapterOpen .35s ease;
  }

  @keyframes chapterOpen {
    from { opacity:0; transform:translateY(-8px); }
  }

  .mission {
    display:grid;
    grid-template-columns:24px 1fr;
    width:100%;
    min-width:0;
    gap:10px;
    padding:13px 0;
    border-bottom:1px solid var(--border);
  }

  .mission input {
    width:19px;
    height:19px;
    accent-color:var(--green);
  }

  .mission strong {
    display:block;
    direction:ltr;
    text-align:left;
    color:var(--text);
    margin-bottom:5px;
  }

  .mission span {
    min-width:0;
    overflow-wrap:anywhere;
    color:var(--muted);
    font-size:13px;
    line-height:1.8;
  }

  .finish-chapter, .reset-data {
    width:100%;
    margin-top:15px;
    padding:12px;
    border-radius:12px;
    border:0;
    font-weight:bold;
  }

  .finish-chapter {
    color:#17140b;
    background:linear-gradient(135deg,#f4d980,#b99338);
  }

  .finish-chapter:disabled {
    opacity:.35;
  }

  .reset-data {
    color:#ffb5b5;
    border:1px solid rgba(255,100,100,.25);
    background:rgba(150,30,30,.16);
  }

  .unlock-flash {
    animation:unlockFlash 1.1s ease;
  }

  @keyframes unlockFlash {
    50% {
      box-shadow:0 0 35px rgba(232,198,106,.65);
      transform:scale(1.01);
    }
  }
`;
document.head.appendChild(missionStyle);

const missionState = JSON.parse(
  localStorage.getItem("tp-missions") ||
  '{"unlocked":1,"completed":[],"checks":{}}'
);

function saveMissionState() {
  localStorage.setItem("tp-missions", JSON.stringify(missionState));
}

function missionProgress() {
  const total = chapters.reduce((sum, chapter) => sum + chapter.tasks.length, 0);
  const done = Object.values(missionState.checks).filter(Boolean).length;
  return Math.round((done / total) * 100);
}

function updateMainProgress() {
  const value = missionProgress();
  const number = document.getElementById("progressValue");
  const range = document.getElementById("progress");

  if (number) number.textContent = value;

  if (range) {
    range.value = value;
    range.disabled = true;
  }

  localStorage.setItem("tp-progress", value);
}

function renderJourney() {
  const old = document.getElementById("journeyCard");
  if (old) old.remove();

  const journey = document.createElement("article");
  journey.id = "journeyCard";
  journey.className = "card wide";

  journey.innerHTML = `
    <div class="journey-head">
      <h2 class="card-title" style="margin:0">Main Journey</h2>
      <span class="journey-progress">${missionProgress()}%</span>
    </div>

    <p class="small">
      فصل جاری را کامل کن تا فصل بعدی از تاریکی خارج شود.
    </p>

    <div id="chapterList"></div>

    <button class="reset-data" id="resetAll">
      Reset All Saved Data
    </button>
  `;

  const notesCard = document.getElementById("notes")?.closest(".card");
  const grid = document.querySelector(".grid");

  if (notesCard) {
    grid.insertBefore(journey, notesCard);
  } else {
    grid.appendChild(journey);
  }

  const list = journey.querySelector("#chapterList");

  chapters.forEach((chapter, chapterIndex) => {
    const unlocked = chapterIndex < missionState.unlocked;
    const completed = missionState.completed.includes(chapterIndex);

    const element = document.createElement("section");
    element.className =
      "chapter " +
      (!unlocked ? "locked" : "") +
      (completed ? " completed" : "");

    if (!unlocked) {
      element.innerHTML = `
        <button class="chapter-header" disabled>
          <span class="chapter-number">⌁</span>
          <span class="chapter-name">???</span>
          <span class="chapter-status">🔒</span>
        </button>
      `;
      list.appendChild(element);
      return;
    }

    element.innerHTML = `
      <button class="chapter-header">
        <span class="chapter-number">${chapterIndex + 1}</span>
        <span class="chapter-name">${chapter.title}</span>
        <span class="chapter-status">${completed ? "✓" : "⌄"}</span>
      </button>

      <div class="chapter-body">
        <p class="small">${chapter.description}</p>

        <div class="missions"></div>

        <button class="finish-chapter">
          ${completed ? "Chapter Completed ✓" : "Complete Chapter"}
        </button>
      </div>
    `;

    if (chapterIndex === missionState.unlocked - 1 && !completed) {
      element.classList.add("open");
    }

    element.querySelector(".chapter-header").onclick = () => {
      element.classList.toggle("open");
    };

    const missionsBox = element.querySelector(".missions");
    const finishButton = element.querySelector(".finish-chapter");

    chapter.tasks.forEach((task, taskIndex) => {
      const key = chapterIndex + "-" + taskIndex;
      const label = document.createElement("label");
      label.className = "mission";

      label.innerHTML = `
        <input type="checkbox"
          ${missionState.checks[key] ? "checked" : ""}
          ${completed ? "disabled" : ""}>

        <span>
          <strong>${task[0]}</strong>
          <span>${task[1]}</span>
        </span>
      `;

      const checkbox = label.querySelector("input");

      checkbox.onchange = () => {
        missionState.checks[key] = checkbox.checked;
        saveMissionState();
        updateMainProgress();

        const allDone = chapter.tasks.every((_, index) =>
          missionState.checks[chapterIndex + "-" + index]
        );

        finishButton.disabled = !allDone;
        journey.querySelector(".journey-progress").textContent =
          missionProgress() + "%";
      };

      missionsBox.appendChild(label);
    });

    const allDone = chapter.tasks.every((_, index) =>
      missionState.checks[chapterIndex + "-" + index]
    );

    finishButton.disabled = !allDone || completed;

    finishButton.onclick = () => {
      if (!missionState.completed.includes(chapterIndex)) {
        missionState.completed.push(chapterIndex);
      }

      missionState.unlocked = Math.min(
        chapters.length,
        Math.max(missionState.unlocked, chapterIndex + 2)
      );

      saveMissionState();
      renderJourney();
      updateMainProgress();

      const next = document.querySelectorAll(".chapter")[chapterIndex + 1];

      if (next) {
        next.classList.add("unlock-flash");
        next.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    list.appendChild(element);
  });

  journey.querySelector("#resetAll").onclick = () => {
    const accepted = confirm(
      "تمام پیشرفت، قلب‌ها، جلسات و یادداشت‌ها پاک شوند؟"
    );

    if (!accepted) return;

    Object.keys(localStorage)
      .filter(key => key.startsWith("tp-"))
      .forEach(key => localStorage.removeItem(key));

    location.reload();
  };
}

renderJourney();
updateMainProgress();

const statsCard = document.getElementById("sessions")?.closest(".card");

if (statsCard) {
  const resetStatsButton = document.createElement("button");

  resetStatsButton.className = "reset-data";
  resetStatsButton.textContent = "Reset Hearts & Sessions";

  resetStatsButton.onclick = () => {
    const accepted = confirm(
      "تعداد قلب‌ها و جلسه‌های بازی به حالت اولیه برگردند؟"
    );

    if (!accepted) return;

    sessions = 0;
    hearts = 3;

    sessionsElement.textContent = sessions;
    heartsElement.textContent = hearts;

    localStorage.setItem("tp-sessions", "0");
    localStorage.setItem("tp-hearts", "3");
  };

  statsCard.appendChild(resetStatsButton);
}
