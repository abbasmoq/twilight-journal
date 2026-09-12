const chapters = [
  {
    title: "Ordon Village",
    description: "آغاز آرام ماجراجویی و آشنایی با زندگی Link در روستا.",
    descriptionEn: "A quiet beginning that introduces Link's life in the village.",
    tasks: [
      ["Village Life", "با اهالی Ordon Village صحبت کن و کارهای روزانه را انجام بده.", "Talk to the residents of Ordon Village and finish the day's chores."],
      ["Goat Herding", "به مزرعه برو و در جمع‌کردن بزها کمک کن.", "Visit the ranch and help herd the goats."],
      ["First Equipment", "وسایل ابتدایی موردنیاز Link را تهیه کن.", "Gather Link's first pieces of equipment."],
      ["Journey Begins", "برای آغاز سفر به سمت Hyrule آماده شو.", "Prepare to begin the journey toward Hyrule."]
    ]
  },
  {
    title: "The Twilight",
    description: "اولین رویارویی با قلمروی اسرارآمیز Twilight.",
    descriptionEn: "The first encounter with the mysterious Twilight Realm.",
    tasks: [
      ["Prison Break", "راه خروج از زندان را پیدا کن.", "Find a way out of the prison."],
      ["Castle Sewers", "از مسیر زیرزمینی و فاضلاب عبور کن.", "Make your way through the underground sewers."],
      ["Hyrule Castle", "خودت را به بخش بالایی قلعه برسان.", "Reach the upper levels of the castle."],
      ["Return to the Light", "راه بازگشت از قلمروی Twilight را پیدا کن.", "Find a path back from the Twilight Realm."]
    ]
  },
  {
    title: "Faron Woods: Twilight",
    description: "بازگشت به جنگل و تلاش برای برگرداندن نور.",
    descriptionEn: "Return to the woods and begin restoring their light.",
    tasks: [
      ["Enter Faron Woods", "وارد بخش تاریک Faron Woods شو.", "Enter the shadow-covered Faron Woods."],
      ["Tears of Light", "Tears of Lightهای این منطقه را پیدا کن.", "Find the Tears of Light scattered through the area."],
      ["Restore Faron", "نور را به Faron Province بازگردان.", "Restore light to Faron Province."]
    ]
  },
  {
    title: "Forest Temple",
    description: "اولین سیاه‌چال بزرگ سفر.",
    descriptionEn: "The first major dungeon of the journey.",
    tasks: [
      ["Enter the Temple", "مسیر ورود به Forest Temple را کامل کن.", "Complete the route into the Forest Temple."],
      ["Lost Monkeys", "میمون‌های گرفتار در معبد را پیدا کن.", "Find the monkeys trapped inside the temple."],
      ["Gale Boomerang", "آیتم اصلی این معبد را به دست بیاور.", "Obtain the temple's key item."],
      ["Temple Guardian", "نبرد نهایی معبد را تمام کن.", "Complete the temple's final battle."]
    ]
  },
  {
    title: "Kakariko Village: Twilight",
    description: "سفر به منطقه‌ای تازه که در تاریکی فرو رفته است.",
    descriptionEn: "Travel to a new region swallowed by twilight.",
    tasks: [
      ["Reach Kakariko", "مسیر رسیدن به Kakariko Village را پیدا کن.", "Find the way to Kakariko Village."],
      ["Search the Village", "تمام بخش‌های قابل‌دسترسی روستا را بررسی کن.", "Explore every accessible part of the village."],
      ["Tears of Light", "Tears of Lightهای این منطقه را جمع‌آوری کن.", "Collect the Tears of Light in this region."],
      ["Restore Eldin", "نور را به Eldin Province بازگردان.", "Restore light to Eldin Province."]
    ]
  },
  {
    title: "Death Mountain",
    description: "صعود از کوه و جلب اعتماد Goronها.",
    descriptionEn: "Climb the mountain and earn the Gorons' trust.",
    tasks: [
      ["Mountain Trail", "مسیر Death Mountain را طی کن.", "Follow the trail up Death Mountain."],
      ["Goron Challenge", "راه عبور از نگهبانان Goron را یاد بگیر.", "Learn how to get past the Goron guards."],
      ["Sumo Training", "برای رویارویی بعدی آماده شو.", "Train for the challenge ahead."],
      ["Reach the Mines", "راه ورود به Goron Mines را باز کن.", "Open the way into the Goron Mines."]
    ]
  },
  {
    title: "Goron Mines",
    description: "کاوش در معدن داغ و مکانیکی Goronها.",
    descriptionEn: "Explore the Gorons' fiery, mechanical mine.",
    tasks: [
      ["Explore the Mines", "بخش‌های ابتدایی معدن را بررسی کن.", "Explore the mine's opening areas."],
      ["Goron Elders", "با بزرگان Goron ملاقات کن.", "Meet the Goron elders."],
      ["Hero's Bow", "آیتم اصلی معدن را به دست بیاور.", "Obtain the mine's key item."],
      ["Mine Guardian", "نبرد نهایی معدن را تمام کن.", "Complete the mine's final battle."]
    ]
  },
  {
    title: "Lanayru Province: Twilight",
    description: "گسترش سفر به بزرگ‌ترین بخش Hyrule.",
    descriptionEn: "Extend the journey into Hyrule's largest province.",
    tasks: [
      ["Reach Lake Hylia", "راه رسیدن به Lake Hylia را پیدا کن.", "Find a route to Lake Hylia."],
      ["Restore the Water", "مشکل جریان آب منطقه را برطرف کن.", "Restore the region's water flow."],
      ["Tears of Light", "Tears of Lightهای Lanayru را جمع‌آوری کن.", "Collect Lanayru's Tears of Light."],
      ["Restore Lanayru", "نور را به این سرزمین بازگردان.", "Bring light back to Lanayru Province."]
    ]
  },
  {
    title: "Lakebed Temple",
    description: "ورود به معبدی پیچیده در اعماق آب.",
    descriptionEn: "Enter a complex temple hidden beneath the water.",
    tasks: [
      ["Prepare for the Depths", "تجهیزات لازم برای ورود به معبد را آماده کن.", "Prepare the equipment needed to enter the temple."],
      ["Control the Water", "مسیر جریان آب داخل معبد را تغییر بده.", "Redirect the flow of water inside the temple."],
      ["Clawshot", "آیتم اصلی معبد را پیدا کن.", "Find the temple's key item."],
      ["Temple Guardian", "نبرد نهایی معبد را تمام کن.", "Complete the temple's final battle."]
    ]
  },
  {
    title: "The Master Sword",
    description: "سفری مهم برای یافتن شمشیری افسانه‌ای.",
    descriptionEn: "An important journey in search of a legendary sword.",
    tasks: [
      ["Help Midna", "راه نجات Midna را پیدا کن.", "Find a way to save Midna."],
      ["Enter Sacred Grove", "مسیر مخفی Sacred Grove را باز کن.", "Open the hidden path into the Sacred Grove."],
      ["Guardian Puzzle", "معمای نگهبانان جنگل را حل کن.", "Solve the forest guardians' puzzle."],
      ["Claim the Sword", "شمشیر افسانه‌ای را به دست بیاور.", "Claim the legendary sword."]
    ]
  },
  {
    title: "Gerudo Desert",
    description: "حرکت به سوی بیابانی دورافتاده و ناشناخته.",
    descriptionEn: "Travel toward a distant and unfamiliar desert.",
    tasks: [
      ["Reach the Desert", "راه انتقال به Gerudo Desert را پیدا کن.", "Find transportation to Gerudo Desert."],
      ["Desert Exploration", "بخش‌های مهم بیابان را بررسی کن.", "Explore the desert's important locations."],
      ["Enemy Camp", "از اردوگاه دشمن عبور کن.", "Make your way through the enemy camp."],
      ["Ancient Grounds", "راه ورود به بنای باستانی را باز کن.", "Open the entrance to the ancient grounds."]
    ]
  },
  {
    title: "Arbiter's Grounds",
    description: "کاوش در زندانی باستانی و تاریک.",
    descriptionEn: "Explore an ancient prison consumed by darkness.",
    tasks: [
      ["Four Poe Flames", "چهار شعلهٔ گمشده را پیدا کن.", "Find the four missing Poe flames."],
      ["Spinner", "آیتم اصلی این مکان را به دست بیاور.", "Obtain this dungeon's key item."],
      ["Ancient Guardian", "نبرد اصلی این بخش را تمام کن.", "Complete the dungeon's main battle."],
      ["Mirror Chamber", "خودت را به اتاق Mirror برسان.", "Reach the Mirror Chamber."]
    ]
  },
  {
    title: "Scaling Snowpeak",
    description: "صعود از منطقه‌ای یخ‌زده و خطرناک.",
    descriptionEn: "Climb through a frozen and dangerous region.",
    tasks: [
      ["Follow the Scent", "رد مسیر را در میان برف دنبال کن.", "Follow the scent trail through the snow."],
      ["Climb Snowpeak", "خودت را به بالای کوه برسان.", "Make your way to the top of Snowpeak."],
      ["Snowboard Race", "مسیر سریع کوهستانی را کامل کن.", "Complete the high-speed mountain route."],
      ["Reach the Ruins", "به عمارت متروکه وارد شو.", "Enter the abandoned mansion."]
    ]
  },
  {
    title: "Snowpeak Ruins",
    description: "جست‌وجو در عمارتی عجیب میان برف.",
    descriptionEn: "Search a strange mansion buried in the snow.",
    tasks: [
      ["Explore the Mansion", "اتاق‌های قابل‌دسترسی عمارت را بررسی کن.", "Explore the mansion's accessible rooms."],
      ["Find the Ingredients", "به ساکنان عمارت برای تکمیل غذایشان کمک کن.", "Help the mansion's residents finish their meal."],
      ["Ball and Chain", "آیتم اصلی عمارت را پیدا کن.", "Find the mansion's key item."],
      ["Mansion Guardian", "نبرد نهایی عمارت را تمام کن.", "Complete the mansion's final battle."]
    ]
  },
  {
    title: "Sacred Grove: Round Two",
    description: "بازگشت دوباره به جنگل مقدس.",
    descriptionEn: "Return once more to the Sacred Grove.",
    tasks: [
      ["Return to the Grove", "دوباره مسیر Sacred Grove را پیدا کن.", "Find the path back to the Sacred Grove."],
      ["Follow the Guide", "راهنمای جنگل را تا پایان دنبال کن.", "Follow the forest guide to the end."],
      ["Pedestal Puzzle", "معمای بخش مقدس را حل کن.", "Solve the puzzle in the sacred clearing."],
      ["Open the Ancient Door", "دروازهٔ زمان را فعال کن.", "Activate the ancient Door of Time."]
    ]
  },
  {
    title: "Temple of Time",
    description: "حرکت در معبدی میان گذشته و حال.",
    descriptionEn: "Navigate a temple stretching between past and present.",
    tasks: [
      ["Climb the Temple", "خودت را به طبقات بالاتر معبد برسان.", "Reach the temple's upper floors."],
      ["Dominion Rod", "آیتم اصلی معبد را پیدا کن.", "Find the temple's key item."],
      ["Ancient Statue", "مجسمهٔ باستانی را به ورودی بازگردان.", "Return the ancient statue to the entrance."],
      ["Temple Guardian", "نبرد نهایی معبد را تمام کن.", "Complete the temple's final battle."]
    ]
  },
  {
    title: "In Search of the Sky",
    description: "پیداکردن راه رسیدن به سرزمینی در آسمان.",
    descriptionEn: "Find a way to reach a land in the sky.",
    tasks: [
      ["Restore the Memories", "برای بازیابی خاطرات ازدست‌رفته کمک کن.", "Help restore the missing memories."],
      ["Hidden Village", "روستای مخفی را پیدا کن.", "Find the Hidden Village."],
      ["Ancient Book", "اطلاعات کتاب باستانی را کامل کن.", "Complete the ancient book's missing information."],
      ["Repair the Cannon", "وسیلهٔ رسیدن به آسمان را آماده کن.", "Prepare the device that can reach the sky."]
    ]
  },
  {
    title: "City in the Sky",
    description: "کاوش در شهری معلق بر فراز ابرها.",
    descriptionEn: "Explore a city suspended above the clouds.",
    tasks: [
      ["Enter the City", "مسیر ابتدایی شهر آسمانی را طی کن.", "Cross the opening section of the city in the sky."],
      ["Double Clawshots", "آیتم اصلی این بخش را به دست بیاور.", "Obtain this dungeon's key item."],
      ["Cross the Sky", "با استفاده از توانایی جدید پیشروی کن.", "Use the new ability to move through the sky."],
      ["Sky Guardian", "نبرد نهایی شهر را تمام کن.", "Complete the city's final battle."]
    ]
  },
  {
    title: "Palace of Twilight",
    description: "ورود به قلب قلمروی Twilight.",
    descriptionEn: "Enter the heart of the Twilight Realm.",
    tasks: [
      ["Enter the Palace", "راه ورود به قصر را باز کن.", "Open the way into the palace."],
      ["Recover the Sols", "منابع نور قصر را پیدا و منتقل کن.", "Find and carry the palace's sources of light."],
      ["Empower the Sword", "قدرت تازه‌ای برای شمشیر آزاد کن.", "Awaken a new power within the sword."],
      ["Palace Guardian", "نبرد اصلی این قلمرو را کامل کن.", "Complete the realm's main battle."]
    ]
  },
  {
    title: "Hyrule Castle",
    description: "آخرین بخش از سفر اصلی در Hyrule.",
    descriptionEn: "The final chapter of the main journey through Hyrule.",
    tasks: [
      ["Enter the Castle", "راه ورود به Hyrule Castle را باز کن.", "Open the way into Hyrule Castle."],
      ["Explore the Castle", "مسیرهای داخلی و اختیاری قلعه را بررسی کن.", "Explore the castle's main and optional paths."],
      ["Reach the Throne", "خودت را برای رویارویی پایانی آماده کن.", "Prepare for the final confrontation."],
      ["Complete the Journey", "داستان اصلی Twilight Princess را تمام کن.", "Complete the main story of Twilight Princess."]
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
      ${tpT("journeyHelp")}
    </p>

    <div id="chapterList"></div>

    <button class="reset-data" id="resetAll">
      ${tpT("resetAll")}
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
        <p class="small">${tpLanguage() === "en" ? chapter.descriptionEn : chapter.description}</p>

        <div class="missions"></div>

        <button class="finish-chapter">
          ${completed ? tpT("chapterCompleted") : tpT("completeChapter")}
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
          <span>${tpLanguage() === "en" ? task[2] : task[1]}</span>
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
    const accepted = confirm(tpT("resetAllConfirm"));

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
  resetStatsButton.textContent = tpT("resetStats");

  resetStatsButton.onclick = () => {
    const accepted = confirm(tpT("resetStatsConfirm"));

    if (!accepted) return;

    sessions = 0;
    hearts = 3;

    sessionsElement.textContent = sessions;
    heartsElement.textContent = hearts;

    localStorage.setItem("tp-sessions", "0");
    localStorage.setItem("tp-hearts", "3");
  };

  statsCard.appendChild(resetStatsButton);

  window.addEventListener("tp-language-change", () => {
    resetStatsButton.textContent = tpT("resetStats");
  });
}

window.addEventListener("tp-language-change", () => {
  renderJourney();
  updateMainProgress();
});
