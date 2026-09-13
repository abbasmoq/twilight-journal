(() => {
  const hero = document.querySelector(".hero");
  if (!hero || document.getElementById("gameSwitcherButton")) return;

  const style = document.createElement("style");
  style.textContent = `
    .game-switcher-button{position:absolute;top:20px;right:76px;width:46px;height:46px;display:grid;place-items:center;border:1px solid var(--border);border-radius:50%;background:var(--panel);color:var(--gold);text-decoration:none;font-size:19px;backdrop-filter:blur(12px);z-index:2}
    .game-switcher-button:active{transform:scale(.96)}
  `;
  document.head.appendChild(style);

  const link = document.createElement("a");
  link.id = "gameSwitcherButton";
  link.className = "game-switcher-button";
  link.href = "games.html";
  link.textContent = "🎮";
  link.setAttribute("aria-label", "Choose game");
  link.title = "Choose Game";
  hero.appendChild(link);
})();
