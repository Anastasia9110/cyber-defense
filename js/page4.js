let gameState = {
  level1: { found: 0, total: 4 },
  level2: { found: 0, total: 4 },
};

function startGame() {
  document.getElementById("intro-screen").style.display = "none";
  document.getElementById("game-level-1").classList.add("active");
}

function handleZoneClick(element) {
  if (element.classList.contains("found")) return;

  const msg = element.getAttribute("data-msg");
  const type = element.getAttribute("data-type");

  const circle = document.createElement("div");
  circle.classList.add("visual-circle", type);

  const style = window.getComputedStyle(element);
  circle.style.top = style.top;
  circle.style.left = style.left;
  circle.style.width = style.width;
  circle.style.height = style.height;

  const frame = element.closest(".phone-frame");
  const container = frame.querySelector(".visual-zones-container");
  container.appendChild(circle);

  element.classList.add("found");
  element.style.pointerEvents = "none";

  const screen = element.closest(".game-screen");
  let levelKey = screen.id === "game-level-1" ? "level1" : "level2";
  gameState[levelKey].found++;

  const counter = document.getElementById(
    `score-${levelKey === "level1" ? "l1" : "l2"}`,
  );
  if (counter) {
    counter.innerHTML = `Найдено: <span>${gameState[levelKey].found}</span> / ${gameState[levelKey].total}`;
  }

  updateRobotMessage(screen, msg);

  if (gameState[levelKey].found >= gameState[levelKey].total) {
    const btnId = levelKey === "level1" ? "btn-next-l1" : "btn-next-l2";
    const btn = document.getElementById(btnId);
    if (btn) btn.classList.remove("hidden");

    setTimeout(() => {
      const successMsg =
        levelKey === "level1"
          ? "🎯 Отлично! Все найдены! Жми ДАЛЬШЕ!"
          : "🔥 Ты прошёл все уровни!";
      updateRobotMessage(screen, successMsg);
    }, 1500);
  }
}

function updateRobotMessage(screen, text) {
  const msgEl = screen.querySelector(".robot-message");
  if (msgEl) {
    msgEl.classList.remove("active");
    setTimeout(() => {
      msgEl.textContent = text;
      msgEl.classList.add("active");
    }, 200);
  }
}

function goToLevel(levelNum) {
  document
    .querySelectorAll(".game-screen")
    .forEach((s) => s.classList.remove("active"));

  if (levelNum === 2) {
    document.getElementById("game-level-2").classList.add("active");
  } else if (levelNum === 3) {
    document.getElementById("screen-choose").classList.add("active");
  } else if (levelNum === 4) {
    document.getElementById("finish-screen").classList.add("active");
    startConfetti();
  }
}

function triggerTrap() {
  document
    .querySelectorAll(".game-screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById("screen-trap").classList.add("active");
}

function startConfetti() {
  const colors = [
    "#fbbf24",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#ef4444",
    "#a855f7",
  ];
  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
      confetti.style.top = "-10px";
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 5000);
    }, i * 20);
  }
}
