let quizData = [
  {
    question:
      "In 2023, which global sporting event captured the world's attention and broke records for viewership?",
    options: [
      "FIFA World Cup",
      "Summer Olympics",
      "Super Bowl",
      "Cricket World Cup",
    ],
    answer: "Summer Olympics",
  },
  {
    question:
      "In the realm of sports, which team won the 2023 FIFA World Cup, securing their place in history as the champions of international football?",
    options: ["Brazil", "Germany", "Argentina", "France"],
    answer: "Brazil",
  },
  {
    question:
      "Which famous scientist made headlines in 2023 by successfully launching a space mission to explore the mysteries of a distant galaxy?",
    options: [
      "Neil deGrasse Tyson",
      "Stephen Hawking",
      "Elon Musk",
      "Jane Goodall",
    ],
    answer: "Elon Musk",
  },
  {
    question:
      "In 2023, which Indian city hosted a grand cultural festival that attracted artists, performers, and visitors from around the world?",
    options: ["Mumbai", "Delhi", "Jaipur", "Kolkata"],
    answer: "Jaipur",
  },
  {
    question:
      "Which Indian athlete made headlines in 2023 by winning a gold medal at the World Athletics Championship in a record-breaking performance?",
    options: [
      "P. V. Sindhu (Badminton)",
      "Hima Das (Athletics)",
      "Saina Nehwal (Badminton)",
      "Manika Batra (Table Tennis)",
    ],
    answer: "Hima Das (Athletics)",
  },
  {
    question:
      "A new initiative launched in India in 2023 aimed to address environmental challenges by promoting sustainable practices. What was it called?",
    options: [
      "Green India Mission",
      "EcoFriendly Bharat",
      "Clean Nation Project",
      "Sustainable India Campaign",
    ],
    answer: "Green India Mission",
  },
  {
    question:
      "An international collaboration in space exploration achieved a major milestone in 2023, with the successful landing of a probe on a distant planet. Which planet was it?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question:
      "An innovative transportation project in 2023 introduced a high-speed train connecting major cities across continents. What was the project called?",
    options: [
      "HyperRail",
      "TransGlobal Express",
      "MagLev Connect",
      "Hyperloop One",
    ],
    answer: "TransGlobal Express",
  },
  {
    question:
      "In 2023, a global initiative was launched to address the digital divide and provide internet access to underserved communities worldwide. What was the initiative called?",
    options: [
      "ConnectWorld",
      "DigitalEquity",
      "InternetForAll",
      "BroadbandInclusion",
    ],
    answer: "InternetForAll",
  },
  {
    question:
      "In the world of finance and technology, a revolutionary digital currency gained widespread acceptance in 2023. What was the name of this cryptocurrency?",
    options: ["Etherium", "Libra", "Stellar", "QuantumCoin"],
    answer: "Libra",
  },
];

let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 59;
let timer;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const submitButton = document.getElementById("submit-btn");
const timerDisplay = document.getElementById("timer");

nextButton.addEventListener("click", loadNextQuestion);
submitButton.addEventListener("click", showQuizResults);

displayQuestion();
startTimer();

function updateTimer() {
  if (timeLeft >= 0) {
    const seconds = timeLeft;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    timerDisplay.textContent = displaySeconds;
    timeLeft--;
  } else {
    timerDisplay.textContent = "!!!";
    clearInterval(timer);
    showQuizResults();
  }
}

function startTimer() {
  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

function evaluateUserAnswers() {
  let score = 0;
  quizData.forEach((question, index) => {
    if (userAnswers[index] == question.answer) {
      score += 10;
    }
  });
  return score;
}

function showQuizResults() {
  timerDisplay.textContent = "!!!";
  clearInterval(timer);
  const userScore = evaluateUserAnswers();
  if (userScore >= 70) {
    scoreContainer.textContent = `Congratulations! 🎉 You are a complete nerd. Your Score: ${userScore} out of ${
      quizData.length * 10
    }`;
  } else {
    scoreContainer.textContent = `Oops! 😢 You need to stay more updated on the recent events. Your Score: ${userScore} out of ${
      quizData.length * 10
    }`;
  }
  nextButton.style.display = "none";
  submitButton.style.display = "none";
}

function loadNextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    // clearInterval(timer);
    timerDisplay.textContent = "!!!";
    showQuizResults();
  }
}

function selectAnswer(answer) {
  const optionButtons = document.querySelectorAll(".quiz-option");
  optionButtons.forEach((button) => {
    button.classList.remove("selected");
  });
  const selectedOption = optionsContainer.querySelector(
    `.quiz-option[data-option="${answer}"]`
  );
  selectedOption.classList.add("selected");
  userAnswers[currentQuestionIndex] = answer;
}

function displayQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;

  optionsContainer.textContent = "";
  const optionLetters = ["A", "B", "C", "D"];

  currentQuestion.options.forEach((option, index) => {
    const optionContainer = document.createElement("div");
    optionContainer.classList.add("quiz-card");

    const optionlabel = document.createElement("span");
    optionlabel.textContent = optionLetters[index];
    optionlabel.classList.add("option-label");
    optionContainer.appendChild(optionlabel);

    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.classList.add("quiz-option");
    optionButton.setAttribute("data-option", option);
    optionButton.addEventListener("click", () => selectAnswer(option));

    optionContainer.appendChild(optionButton);
    optionsContainer.appendChild(optionContainer);
  });

  if (currentQuestionIndex == quizData.length - 1) {
    nextButton.style.display = "none";
    submitButton.style.display = "block";
  }
}
