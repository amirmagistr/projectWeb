<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Викторина</title>
  <link rel="stylesheet" href="midterm.css"> <!-- Подключение CSS -->
</head>
<body>
  <!-- Кнопка "Играть" -->
  <div class="start_btn">
    <button>Играть</button>
  </div>

  <!-- Контейнер викторины -->
  <div class="quiz_box">
    <header>
      <div class="title">Игра Викторина</div>
      <div class="timer">
        <div class="time_left_txt">Осталось секунд</div>
        <div class="timer_sec">15</div>
      </div>
    </header>
    <section>
      <div class="que_text"></div> <!-- Вопрос -->
      <div class="option_list"></div> <!-- Варианты ответов -->
    </section>
    <footer>
      <div class="total_que">1 из 5 Вопросов</div>
      <button class="next_btn">Следующий вопрос</button>
    </footer>
  </div>

  <!-- Контейнер с результатами -->
  <div class="result_box">
  <div class="icon">
    <i>🏆</i>
  </div>
  <div class="complete_text">Вы прошли викторину!</div>
  <div class="score_text"></div> <!-- Результаты -->
  <div class="leaderboard">
    <h3>Таблица лидеров</h3>
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Очки</th>
        </tr>
      </thead>
      <tbody id="leaderboardBody">
        <!-- Здесь будут динамически добавляться записи -->
      </tbody>
    </table>
  </div>
  <div class="buttons">
    <button class="restart" onclick="location.reload()">Играть заново</button>
    <button class="quit" onclick="location.reload()">Выйти</button>
  </div>
</div>
  <script src="midterm.js"></script> <!-- Подключение JavaScript -->
</body>
</html>
/* Общие стили */
body {
  font-family: Arial, sans-serif;
  background-image: url('proect.jpg'); 
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0; /* Убираем отступы страницы */
}

/* Стили для кнопок */
button {
  cursor: pointer;
  border: none;
}

/* Кнопка "Играть" */
.start_btn {

}

.start_btn button {
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  background-color: #4caf50; /* Зеленый фон */
  color: white;
  border-radius: 5px;
}

.start_btn button:hover {
  background-color: #45a049;
}

/* Контейнер с викториной */
.quiz_box {
  display: none;
  background-color: rgba(255, 255, 255, 0.9); /* Прозрачный белый фон */
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  padding: 20px;
  text-align: center;
}

.quiz_box.active {
  display: block;
}

/* Заголовок и таймер */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

header .title {
  font-size: 22px;
  font-weight: bold;
  flex: 1;
  text-align: left;
}

header .timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

header .time_left_txt {
  font-size: 14px;
  color: #555;
}

header .timer_sec {
  font-size: 24px;
  font-weight: bold;
  color: #4caf50;
  width: 40px;
  text-align: center;
}

.time_line {
  margin-top: 10px;
  height: 4px;
  background-color: #ddd;
  width: 0;
  border-radius: 4px;
}

/* Вопрос */
.que_text {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

/* Варианты ответов */
.option_list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option {
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.option:hover {
  background-color: #e0e0e0;
}

.option.correct {
  background-color: #4caf50;
  color: white;
}

.option.wrong {
  background-color: #f44336;
  color: white;
}

.option.disabled {
  pointer-events: none;
  opacity: 0.6;
}

/* Кнопка "Следующий вопрос" */
footer {
  margin-top: 20px;
}

footer .total_que {
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

footer .next_btn {
  display: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
}

footer .next_btn.show {
  display: inline-block;  
}

footer .next_btn:hover {
  background-color: #45a049;
}

/* Контейнер с результатами */
.result_box {
  display: none;
  background-color: rgba(255, 255, 255, 0.9); /* Прозрачный белый фон */
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  padding: 20px;
  text-align: center;
}

.result_box.active {
  display: block;
}

.result_box .icon {
  font-size: 50px;
  color: #4caf50;
  margin-bottom: 10px;
}

.result_box .complete_text {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.result_box .score_text {
  font-size: 16px;
  margin-bottom: 20px;
}

.result_box .buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.result_box .buttons button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.result_box .buttons button:hover {
  background-color: #45a049;
}

.result_box .buttons .quit {
  background-color: #f44336;
}

.result_box .buttons .quit:hover {
  background-color: #d32f2f;
}

.result_box .leaderboard {
  margin-top: 20px;
  text-align: left;
}

.result_box .leaderboard table {
  width: 100%;
  border-collapse: collapse;
}

.result_box .leaderboard th,
.result_box .leaderboard td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.result_box .leaderboard th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.result_box .leaderboard td {
  text-align: center;
}
let currentQuestionIndex = 0; // Индекс текущего вопроса
let userScore = 0; // Количество правильных ответов пользователя
let timer; // Таймер для отсчёта времени
let leaderboard = []; // таблица лидеров

//кнопки DOM
const startButton = document.querySelector(".start_btn button"); // Кнопка "Играть"
const nextButton = document.querySelector(".next_btn"); // Кнопка "Следующий вопрос"
const quizBox = document.querySelector(".quiz_box"); // Контейнер викторины
const resultBox = document.querySelector(".result_box"); // Контейнер с результатами
const timeCount = document.querySelector(".timer_sec"); // Секундный таймер
const questionText = document.querySelector(".que_text"); // Текст вопроса
const optionList = document.querySelector(".option_list"); // Список вариантов ответа
  
//вопросы
const questions = [
  { question: "Укажите столицу Греции?", options: ["Солоники", "Рим", "Афины", "Москва"], answer: "Афины" },
  { question: "Укажите столицу США?", options: ["Нью-Йорк", "Колорадо", "Вашингтон", "Нью-Джерси"], answer: "Вашингтон" },
  { question: "Укажите столицу Италии?", options: ["Неаполь", "Рим", "Ватикан", "Тоскана"], answer: "Рим" },
  { question: "Укажите столицу Египта?", options: ["Каир", "Мемфис", "Анжеро-Судженск", "Александрия"], answer: "Каир" },
  { question: "Укажите столицу Израиля?", options: ["Аман", "Гиза", "Иерусалим", "Вологда"], answer: "Иерусалим" },
];

//старт
startButton.onclick = () => {
  document.querySelector(".start_btn").style.display = "none"; // Скрыть кнопку "Играть"
  quizBox.classList.add("active"); // Показать контейнер викторины
  showQuestion(0); // Показать первый вопрос
  startTimer(15); // Запустить таймер на 15 секунд
};

// current вопрос
function showQuestion(index) {
  // Отображение текста вопроса
  questionText.innerHTML = `${index + 1}. ${questions[index].question}`;
  
  //варики ответа
  optionList.innerHTML = questions[index].options
    .map((option) => `<div class="option">${option}</div>`) // Создаём блоки с классом "option"
    .join(""); // Объединяем их в строку

  // Обнова номера текущего вопроса
  document.querySelector(".total_que").innerHTML = `${index + 1} из ${questions.length} Вопросов`;

  //обработчик клика для каждого варианта
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

//подсветка правильного вопроса
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

//загрузка таблицы при перезагрузке сайта
window.onload = loadLeaderboard;

function updateLeaderboard(name, score) {
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  renderLeaderboard();
  saveLeaderboard(); // Сохраняем таблицу
}

//видимость таблицы лидеров
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

