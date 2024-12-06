let currentQuestionIndex = 0; // Индекс текущего вопроса
let userScore = 0; // Количество правильных ответов пользователя
let timer; // Таймер для отсчёта времени
let leaderboard = []; // таблица лидеров

// Получаем элементы DOM
const startButton = document.querySelector(".start_btn button"); // Кнопка "Играть"
const nextButton = document.querySelector(".next_btn"); // Кнопка "Следующий вопрос"
const quizBox = document.querySelector(".quiz_box"); // Контейнер викторины
const resultBox = document.querySelector(".result_box"); // Контейнер с результатами
const timeCount = document.querySelector(".timer_sec"); // Секундный таймер
const questionText = document.querySelector(".que_text"); // Текст вопроса
const optionList = document.querySelector(".option_list"); // Список вариантов ответа

// Массив вопросов
const questions = [
  { question: "Укажите столицу Греции?", options: ["Солоники", "Рим", "Афины", "Москва"], answer: "Афины" },
  { question: "Укажите столицу США?", options: ["Нью-Йорк", "Колорадо", "Вашингтон", "Нью-Джерси"], answer: "Вашингтон" },
  { question: "Укажите столицу Италии?", options: ["Неаполь", "Рим", "Ватикан", "Тоскана"], answer: "Рим" },
  { question: "Укажите столицу Египта?", options: ["Каир", "Мемфис", "Анжеро-Судженск", "Александрия"], answer: "Каир" },
  { question: "Укажите столицу Израиля?", options: ["Аман", "Гиза", "Иерусалим", "Вологда"], answer: "Иерусалим" },
];

// Начать викторину
startButton.onclick = () => {
  document.querySelector(".start_btn").style.display = "none"; // Скрыть кнопку "Играть"
  quizBox.classList.add("active"); // Показать контейнер викторины
  showQuestion(0); // Показать первый вопрос
  startTimer(15); // Запустить таймер на 15 секунд
};

// Показать текущий вопрос
function showQuestion(index) {
  // Отображение текста вопроса
  questionText.innerHTML = `${index + 1}. ${questions[index].question}`;
  
  // Генерация вариантов ответа
  optionList.innerHTML = questions[index].options
    .map((option) => `<div class="option">${option}</div>`) // Создаём блоки с классом "option"
    .join(""); // Объединяем их в строку

  // Обновляем номер текущего вопроса (например, "1 из 5 Вопросов")
  document.querySelector(".total_que").innerHTML = `${index + 1} из ${questions.length} Вопросов`;

  // Добавляем обработчик клика для каждого варианта
  optionList.querySelectorAll(".option").forEach((item) =>
    item.setAttribute("onclick", "optionSelected(this)")
  );
}

// выбор варианта ответа
function optionSelected(answer) {
  clearInterval(timer); 
  
  const correctAnswer = questions[currentQuestionIndex].answer; // Получаем правильный ответ
  const userAnswer = answer.textContent; // Получаем текст ответа пользователя

  if (userAnswer === correctAnswer) {
    answer.classList.add("correct");
    userScore++; 
  } else {
    answer.classList.add("wrong");
    highlightCorrectAnswer(correctAnswer);
  }

  disableOptions(); // Блокируем все варианты после выбора
  nextButton.classList.add("show"); // Показываем кнопку "Следующий вопрос"
}

// Подсветить правильный ответ
function highlightCorrectAnswer(correctAnswer) {
  // Находим правильный ответ и добавляем ему класс "correct"
  optionList.querySelectorAll(".option").forEach((item) => {
    if (item.textContent === correctAnswer) {
      item.classList.add("correct");
    }
  });
}

// Блокировать все варианты
function disableOptions() {
  optionList.querySelectorAll(".option").forEach((item) => {
    item.classList.add("disabled");
  });
}

nextButton.onclick = () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
    clearInterval(timer); 
    startTimer(15);
    nextButton.classList.remove("show");
  } else {
    showResults(); // Если вопросы закончились, показать результаты
  }
};

// Таймер обратного отсчёта
function startTimer(time) {
  timeCount.textContent = time; // Устанавливаем начальное значение таймера
  timer = setInterval(() => {
    if (time > 0) {
      time--; // Уменьшаем время
      timeCount.textContent = time; // Обновляем отображение таймера
    } else {
      clearInterval(timer); // Останавливаем таймер
      autoSelectAnswer(); // Автоматически выбираем правильный ответ
    }
  }, 1000);
}

// Автоматический выбор правильного ответа
// Автоматический выбор правильного ответа
function autoSelectAnswer() {
  const correctAnswer = questions[currentQuestionIndex].answer; // Правильный ответ
  
  // Подсвечиваем правильный ответ зеленым
  highlightCorrectAnswer(correctAnswer);

  // Подсвечиваем все остальные ответы красным
  optionList.querySelectorAll(".option").forEach((item) => {
    if (item.textContent !== correctAnswer) {
      item.classList.add("wrong");
    }
  });

  disableOptions(); // Блокируем варианты
  nextButton.classList.add("show"); // Показываем кнопку "Следующий вопрос"
}

function saveLeaderboard() {
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function loadLeaderboard() {
  const storedData = localStorage.getItem("leaderboard");
  if (storedData) {
    leaderboard = JSON.parse(storedData);
    renderLeaderboard();
  }
}

// Загружаем таблицу при загрузке страницы
window.onload = loadLeaderboard;

function updateLeaderboard(name, score) {
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  renderLeaderboard();
  saveLeaderboard(); // Сохраняем таблицу
}

// Функция отображения таблицы лидеров
function renderLeaderboard() {
  const leaderboardBody = document.getElementById("leaderboardBody");
  leaderboardBody.innerHTML = leaderboard
    .map(
      (entry) => `
      <tr>
        <td>${entry.name}</td>
        <td>${entry.score}</td>
      </tr>
    `
    )
    .join("");
}

function showResults() {
  quizBox.classList.remove("active"); // Скрываем контейнер викторины
  resultBox.classList.add("active"); // Показываем контейнер с результатами

  const userName = prompt("Введите ваше имя для таблицы лидеров:") || "Аноним"; // Имя пользователя
  updateLeaderboard(userName, userScore); // Обновляем таблицу лидеров

  resultBox.querySelector(
    ".score_text"
  ).innerHTML = `Вы набрали ${userScore} из ${questions.length}`; // Отображаем результат
}

document.querySelector('.quit').onclick = () => {
  window.location.href = 'https://www.wikipedia.com';
};

