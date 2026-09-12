const tpTranslations = {
  fa: {
    pageTitle: "Twilight Journal — دفترچه ماجراجویی",
    heroSubtitle: "دفترچهٔ شخصی و بدون اسپویل برای ثبت سفر، پیشرفت و خاطرات تو در سرزمین هایرول",
    scrollHint: "برای ورود به دفترچه پایین برو ↓",
    progressTitle: "پیشرفت ماجراجویی",
    progressHelp: "میزان پیشرفت تو از روی مأموریت‌های اصلی محاسبه می‌شود.",
    statsTitle: "آمار سفر",
    sessions: "جلسه بازی",
    hearts: "قلب",
    addSession: "+ ثبت یک جلسهٔ جدید",
    addHeart: "♥ افزودن قلب",
    goalsTitle: "هدف‌های شخصی",
    goalStart: "شروع ماجراجویی در هایرول",
    goalExplore: "گشت‌وگذار بدون عجله و کشف مسیرهای فرعی",
    goalMusic: "گوش‌دادن کامل به موسیقی و فضای هر منطقه",
    goalFinish: "تمام‌کردن داستان اصلی",
    notesTitle: "یادداشت‌های ماجراجویی",
    notesPlaceholder: "اتفاق‌های مهم، احساسات و چیزهایی را که کشف کردی اینجا بنویس...",
    notesSaved: "یادداشت ذخیره شد ✓",
    quote: "«هر سفری در تاریکی، راهی به سوی نور پیدا می‌کند.»",
    footer: "دفترچهٔ ماجراجویی ساخته‌شده توسط طرفداران • بدون اسپویل و قابل استفاده به‌صورت آفلاین",
    journeyHelp: "فصل جاری را کامل کن تا فصل بعدی از تاریکی خارج شود.",
    completeChapter: "Complete Chapter",
    chapterCompleted: "Chapter Completed ✓",
    resetAll: "Reset All Saved Data",
    resetAllConfirm: "تمام پیشرفت، قلب‌ها، جلسات و یادداشت‌ها پاک شوند؟",
    resetStats: "Reset Hearts & Sessions",
    resetStatsConfirm: "تعداد قلب‌ها و جلسه‌های بازی به حالت اولیه برگردند؟",
    gameDatabase: "Game Database",
    loadingData: "در حال دریافت اطلاعات...",
    searchPlaceholder: "جست‌وجوی مأموریت یا تجهیزات...",
    sideQuests: "Side Quests",
    armor: "Armor",
    swords: "Swords",
    shields: "Shields",
    tools: "Tools",
    revealEquipment: "Reveal Equipment",
    hideEquipment: "Hide Equipment",
    resetSection: "Reset This Section",
    revealConfirm: "نام تمام تجهیزات ممکن است بخشی از بازی را لو بدهد. نمایش داده شوند؟",
    resetCatalogConfirm: "وضعیت مأموریت‌های فرعی و تجهیزات پاک شود؟",
    sideSummary: (done, total) => `${done} تکمیل‌شده از ${total} مأموریت فرعی`,
    sideWarning: "مأموریت‌های فرعی فقط پس از تکمیل فصل مرتبط در Main Journey نمایش داده می‌شوند.",
    unlockQuest: "برای مشاهده، ابتدا فصل مرتبط در Main Journey را کامل کن.",
    noResults: "نتیجه‌ای پیدا نشد.",
    equipmentSummary: (done, total) => `${done} دریافت‌شده از ${total} مورد`,
    equipmentVisible: "نمایش کامل تجهیزات فعال است.",
    equipmentHidden: "محافظت در برابر اسپویل فعال است؛ برای مشاهده نام تجهیزات از Reveal Equipment استفاده کن.",
    hiddenItem: "این وسیله هنوز مخفی است.",
    obtained: "Obtained",
    notStarted: "شروع‌نشده",
    inProgress: "در حال انجام",
    completed: "تکمیل‌شده",
    dataUnavailable: "Database unavailable",
    dataErrorHelp: "فایل اطلاعات بازی خوانده نشد. صفحه را دوباره بارگذاری کن.",
    dataError: "خطا در دریافت دیتابیس"
  },
  en: {
    pageTitle: "Twilight Journal — Adventure Tracker",
    heroSubtitle: "A personal, spoiler-conscious journal for tracking your journey, progress, and memories across Hyrule.",
    scrollHint: "Scroll down to open your journal ↓",
    progressTitle: "Adventure Progress",
    progressHelp: "Your progress is calculated from completed Main Journey objectives.",
    statsTitle: "Journey Stats",
    sessions: "Play Sessions",
    hearts: "Hearts",
    addSession: "+ Add New Session",
    addHeart: "♥ Add Heart",
    goalsTitle: "Personal Goals",
    goalStart: "Begin the adventure in Hyrule",
    goalExplore: "Explore at your own pace and discover side paths",
    goalMusic: "Take time to enjoy each area's music and atmosphere",
    goalFinish: "Complete the main story",
    notesTitle: "Adventure Notes",
    notesPlaceholder: "Write down important moments, feelings, and discoveries...",
    notesSaved: "Note saved ✓",
    quote: "“Every journey through darkness finds a path toward the light.”",
    footer: "Fan-made adventure journal • Spoiler-conscious and available offline",
    journeyHelp: "Complete the current chapter to bring the next one out of the twilight.",
    completeChapter: "Complete Chapter",
    chapterCompleted: "Chapter Completed ✓",
    resetAll: "Reset All Saved Data",
    resetAllConfirm: "Delete all progress, hearts, sessions, and notes?",
    resetStats: "Reset Hearts & Sessions",
    resetStatsConfirm: "Reset hearts and play sessions to their starting values?",
    gameDatabase: "Game Database",
    loadingData: "Loading game data...",
    searchPlaceholder: "Search quests or equipment...",
    sideQuests: "Side Quests",
    armor: "Armor",
    swords: "Swords",
    shields: "Shields",
    tools: "Tools",
    revealEquipment: "Reveal Equipment",
    hideEquipment: "Hide Equipment",
    resetSection: "Reset This Section",
    revealConfirm: "Equipment names may reveal parts of the game. Show them anyway?",
    resetCatalogConfirm: "Clear all side-quest and equipment statuses?",
    sideSummary: (done, total) => `${done} of ${total} side quests completed`,
    sideWarning: "Side quests appear only after their related Main Journey chapter is completed.",
    unlockQuest: "Complete the related Main Journey chapter to reveal this quest.",
    noResults: "No results found.",
    equipmentSummary: (done, total) => `${done} of ${total} items obtained`,
    equipmentVisible: "All equipment names are visible.",
    equipmentHidden: "Spoiler protection is active. Use Reveal Equipment to show item names.",
    hiddenItem: "This item is still hidden.",
    obtained: "Obtained",
    notStarted: "Not Started",
    inProgress: "In Progress",
    completed: "Completed",
    dataUnavailable: "Database unavailable",
    dataErrorHelp: "The game database could not be loaded. Refresh the page and try again.",
    dataError: "Could not load the database"
  }
};

function tpLanguage() {
  return localStorage.getItem("tp-language") === "en" ? "en" : "fa";
}

function tpT(key, ...args) {
  const value = tpTranslations[tpLanguage()][key] ?? tpTranslations.en[key] ?? key;
  return typeof value === "function" ? value(...args) : value;
}

function applyTpLanguage() {
  const language = tpLanguage();
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  document.title = tpT("pageTitle");

  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = tpT(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    element.placeholder = tpT(element.dataset.i18nPlaceholder);
  });

  const button = document.getElementById("languageButton");
  if (button) {
    button.textContent = language === "fa" ? "EN" : "FA";
    button.setAttribute("aria-label", language === "fa" ? "Switch to English" : "تغییر به فارسی");
  }
}

window.tpLanguage = tpLanguage;
window.tpT = tpT;
window.applyTpLanguage = applyTpLanguage;

document.addEventListener("DOMContentLoaded", applyTpLanguage);
