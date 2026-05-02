const levels = [
  {
    image: "assets/img/post1.svg",
    messageClass: "message-1",
    total: 5,
    hint: "Билет содержит личную информацию: ФИО, номер рейса, дату, время и место. Это может использовать мошенник!",
  },
  {
    image: "assets/img/post2.svg",
    messageClass: "message-2",
    total: 3,
    hint: "Номер квартиры на бирке и фото у подъезда выдают точный адрес проживания!",
  },
  {
    image: "assets/img/post3.svg",
    messageClass: "message-3",
    total: 3,
    hint: "Номер карты, срок действия и CVV — это прямой доступ к деньгам!",
  },
  {
    image: "assets/img/post4.svg",
    messageClass: "message-4",
    total: 1,
    hint: "Паспорт — главный документ. Никогда не публикуй его фото!",
  },
];

const zonesData = [
  [
    { top: "36%", left: "40%", w: "16%", h: "6%" },
    { top: "44%", left: "30%", w: "9%", h: "7%" },
    { top: "49%", left: "40%", w: "16%", h: "6%" },
    { top: "46%", left: "60%", w: "14%", h: "5%" },
    { top: "52%", left: "60%", w: "10%", h: "6%" },
  ],
  [
    { top: "62%", left: "36%", w: "10%", h: "7%" },
    { top: "25%", left: "58%", w: "32%", h: "30%" },
    { top: "47%", left: "40%", w: "20%", h: "12%" },
  ],
  [
    { top: "45%", left: "40%", w: "15%", h: "8%" },
    { top: "57%", left: "45%", w: "25%", h: "4%" },
    { top: "60%", left: "40%", w: "10%", h: "8%" },
  ],
  [{ top: "15%", left: "12%", w: "76%", h: "65%" }],
];

let currentLevel = 0;
let foundCount = 0;

function startGame() {
  document.getElementById("intro-screen").classList.add("hidden");
  document.getElementById("leak-game-screen").classList.remove("hidden");
  loadLevel(0);
}

function loadLevel(index) {
  if (index >= levels.length) {
    document.getElementById("leak-game-screen").classList.add("hidden");
    document.getElementById("finish-screen").classList.remove("hidden");
    return;
  }
  currentLevel = index;
  foundCount = 0;
  const level = levels[index];
  document
    .querySelectorAll(".robot-message")
    .forEach((msg) => msg.classList.remove("active"));
  document.querySelector("." + level.messageClass).classList.add("active");
  document.getElementById("leak-image").src = level.image;
  document.getElementById("found-count").textContent = 0;
  document.getElementById("total-count").textContent = level.total;
  document.getElementById("score-counter").classList.remove("hidden");
  document.getElementById("next-level-btn").classList.add("hidden");
  const container = document.getElementById("hotspots-container");
  container.innerHTML = "";
  zonesData[index].forEach((zone) => {
    const div = document.createElement("div");
    div.className = "hotspot";
    div.style.top = zone.top;
    div.style.left = zone.left;
    div.style.width = zone.w;
    div.style.height = zone.h;
    div.addEventListener("click", function () {
      if (!this.classList.contains("found")) {
        this.classList.add("found");
        foundCount++;
        document.getElementById("found-count").textContent = foundCount;
        if (foundCount === level.total) levelComplete(level.hint);
      }
    });
    container.appendChild(div);
  });
}

function levelComplete(hintText) {
  const activeMessage = document.querySelector(".robot-message.active");
  activeMessage.innerHTML = hintText;
  document.getElementById("score-counter").classList.add("hidden");
  document.getElementById("next-level-btn").classList.remove("hidden");
}

function nextLevel() {
  loadLevel(currentLevel + 1);
}
