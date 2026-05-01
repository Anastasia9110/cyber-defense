// База данных вопросов
const questions = [
  {
    text: "Банк Беларусь: СРОЧНО! Ваш аккаунт заблокирован! Для разблокировки перейдите по ссылке: bank-belarus-verify.com и введите ваш пароль от интернет-банкинга. У вас есть 24 часа!",
    isSafe: false, // Правильный ответ: Опасно (false)
    explanation:
      "⚠️ ЭТО ФИШИНГ!<br><br>Настоящий банк НИКОГДА не просит вводить пароль по ссылке из SMS.<br><br>Ссылка bank-belarus-verify.com — поддельная. Всегда проверяй официальный сайт банка в браузере.",
  },
  {
    text: "Telegram: Код подтверждения: 482915. Никому не сообщайте этот код, даже сотрудникам Telegram. Если это были не вы, просто игнорируйте это сообщение.",
    isSafe: true, // Правильный ответ: Безопасно (true)
    explanation:
      "✅ ВЕРНО!<br><br>Это настоящее уведомление безопасности от Telegram.<br><br>Оно предупреждает: код нельзя никому передавать — даже если кто-то представляется поддержкой.",
  },
  {
    text: "ВЫИГРЫШ! ПОЗДРАВЛЯЕМ! Вы выиграли iPhone 15 Pro! Для получения приза оплатите доставку: 15 BYN. ЖМИ СЮДА: win-iphone-free.com. Осталось 3 минуты!",
    isSafe: false, // Правильный ответ: Опасно (false)
    explanation:
      "️ КЛАССИЧЕСКОЕ МОШЕННИЧЕСТВО!<br><br>Никто не раздаёт айфоны за 15 рублей.<br><br>Ссылка win-iphone-free.com ведёт на фишинговый сайт. Не верь срочности и «выигрышам», в которых не участвовал.",
  },
  {
    text: "Instagram Shop: Ваш заказ #4829 доставлен! Спасибо за покупку. Оцените товар в приложении. Вопросы? Пишите в поддержку через официальный сайт.",
    isSafe: true, // Правильный ответ: Безопасно (true)
    explanation:
      "✅ ПРАВИЛЬНО!<br><br>Это безопасное уведомление:<br>• Нет ссылок<br>• Нет просьб ввести данные<br>• Нет срочности<br><br>Просто информация о заказе.",
  },
  {
    text: "МВД РБ: Вы оштрафованы на 50 BYN за нарушение ПДД. Оплатите штраф со скидкой 50% по ссылке: mvd-fine-by.com. Срок: сегодня до 23:59.",
    isSafe: false, // Правильный ответ: Опасно (false)
    explanation:
      "⚠️ ПОДДЕЛКА!<br><br>МВД не рассылает ссылки для оплаты штрафов в SMS.<br><br>Официальные штрафы можно проверить только на портале epay.by или в отделении милиции.<br><br>Ссылка mvd-fine-by.com — мошенническая.",
  },
];

let currentQuestionIndex = 0;

// 1. Старт игры
function startGame() {
  document.getElementById("intro-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
  loadQuestion();
}

// 2. Загрузка вопроса
function loadQuestion() {
  const q = questions[currentQuestionIndex];
  const bubble = document.getElementById("game-bubble");
  const answerButtons = document.getElementById("answer-buttons");
  const continueBtn = document.getElementById("continue-btn");

  // Сброс анимации (удаляем класс, вызываем перерисовку, добавляем снова)
  bubble.classList.remove("anim-once", "error-bubble");
  void bubble.offsetWidth; // Этот трюк перезапускает CSS анимацию
  bubble.classList.add("anim-once");

  // Сбрасываем стили на "синие" (безопасные)
  bubble.innerHTML = q.text;
  bubble.style.background = "linear-gradient(to right, #1E88C7, #0790d9)";

  // Показываем кнопки ответов, скрываем кнопку "Дальше"
  answerButtons.style.display = "flex";
  continueBtn.style.display = "none";
}

// 3. Проверка ответа
function checkAnswer(userSaidSafe) {
  const q = questions[currentQuestionIndex];
  const bubble = document.getElementById("game-bubble");
  const answerButtons = document.getElementById("answer-buttons");
  const continueBtn = document.getElementById("continue-btn");

  // Если ответ пользователя НЕ совпадает с правильным ответом -> ОШИБКА
  if (userSaidSafe !== q.isSafe) {
    // Перезапуск анимации
    bubble.classList.remove("anim-once");
    void bubble.offsetWidth;

    // ДОБАВЛЯЕМ класс ошибки (он покрасит хвостик в красный)
    bubble.classList.add("anim-once", "error-bubble");

    // Меняем текст на объяснение и фон на красный
    bubble.innerHTML = q.explanation;
    bubble.style.background = "linear-gradient(to right, #e94560, #c73e54)";

    // Скрываем ответы, показываем кнопку "Дальше"
    answerButtons.style.display = "none";
    continueBtn.style.display = "block";
  } else {
    // Если правильно — сразу следующий вопрос
    nextQuestion();
  }
}

// 4. Переход к следующему вопросу
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    // Если вопросы закончились — показываем финал
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("finish-screen").style.display = "block";
  }
}
