// ======================================
// ECOTREND - JAVASCRIPT
// Sustainable Fashion Website
// ======================================

// MOBILE NAVIGATION
function toggleMenu() {
  document.getElementById("navlinks").classList.toggle("open");
}

document.querySelectorAll(".navlinks a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navlinks").classList.remove("open");
  });
});

// ======================================
// ECO SCORE CALCULATOR
// ======================================

function calculateEco() {
  const material = Number(document.getElementById("material").value);
  const durability = Number(document.getElementById("durability").value);
  const wear = Number(document.getElementById("wear").value);

  const score = Math.round(((material + durability + wear) / 15) * 100);

  let message;

  if (score >= 80) {
    message = "Great choice! This looks like a more mindful clothing choice.";
  } else if (score >= 50) {
    message = "Good start! Consider durability and how often you will wear it.";
  } else {
    message = "Think before buying. Reusing or borrowing may be a better option.";
  }

  const result = document.getElementById("ecoResult");

  result.innerHTML = `
    <h3>Your Eco Score: ${score}/100 🌿</h3>
    <p>${message}</p>
    <p>Remember: this is an educational score, not a certified product rating.</p>
  `;

  result.classList.add("show");
}

// ======================================
// REWEAR STUDIO - WARDROBE
// ======================================

let selectedItems = [];

function selectItem(button, item) {
  if (selectedItems.includes(item)) {
    selectedItems = selectedItems.filter(i => i !== item);
    button.classList.remove("selected");
  } else {
    selectedItems.push(item);
    button.classList.add("selected");
  }
}

function suggestOutfit() {
  const result = document.getElementById("outfitResult");

  if (selectedItems.length < 2) {
    result.innerHTML = "Please select at least two clothing items.";
    result.classList.add("show");
    return;
  }

  const outfitIdeas = [
    "Try pairing your basics with sneakers for a relaxed everyday look.",
    "Combine neutral pieces for a timeless outfit.",
    "Layer your clothes to create a fresh look without buying anything new.",
    "Add a scarf or accessory to change the look of your outfit.",
    "Mix denim with basic pieces for a casual style."
  ];

  const randomIdea = outfitIdeas[
    Math.floor(Math.random() * outfitIdeas.length)
  ];

  result.innerHTML = `
    <h3>Your Selected Wardrobe 👗</h3>
    <p>${selectedItems.join(" + ")}</p>
    <h4>Styling Idea</h4>
    <p>${randomIdea}</p>
    <p>Rewearing clothes is a simple step towards sustainable fashion 🌱</p>
  `;

  result.classList.add("show");
}

// ======================================
// ECO FASHION QUIZ
// ======================================

const questions = [
  {
    question: "What is a sustainable way to shop for clothes?",
    options: [
      "Buy clothes every week",
      "Choose quality and wear clothes longer",
      "Throw away old clothes"
    ],
    answer: 1,
    explanation: "Choosing durable clothing and wearing it longer can reduce waste."
  },
  {
    question: "What is circular fashion?",
    options: [
      "Reuse, repair and recycle clothing",
      "Buy and throw clothes quickly",
      "Follow every new trend"
    ],
    answer: 0,
    explanation: "Circular fashion focuses on keeping clothes and materials in use."
  },
  {
    question: "What can you do with old clothes?",
    options: [
      "Throw everything away",
      "Burn them",
      "Donate, repair or reuse them"
    ],
    answer: 2,
    explanation: "Donating, repairing and reusing clothes can help reduce textile waste."
  },
  {
    question: "What should you consider before buying an outfit?",
    options: [
      "Only the trend",
      "Quality, comfort and how often you will wear it",
      "Only the packaging"
    ],
    answer: 1,
    explanation: "Thoughtful purchases can help avoid unnecessary clothing waste."
  }
];

let currentQuestion = 0;
let quizScore = 0;
let alreadyAnswered = false;

function loadQuestion() {
  alreadyAnswered = false;

  const question = questions[currentQuestion];

  document.getElementById("question").textContent =
    `Question ${currentQuestion + 1}: ${question.question}`;

  document.getElementById("quizResult").classList.remove("show");
  document.getElementById("nextBtn").style.display = "none";

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.textContent = option;

    button.addEventListener("click", () => {
      checkAnswer(index);
    });

    optionsContainer.appendChild(button);
  });
}

function checkAnswer(index) {
  if (alreadyAnswered) return;

  alreadyAnswered = true;

  const question = questions[currentQuestion];

  if (index === question.answer) {
    quizScore++;
  }

  const result = document.getElementById("quizResult");

  result.innerHTML = `
    <h3>${index === question.answer ? "Correct! 🌿" : "Not quite!"}</h3>
    <p>${question.explanation}</p>
  `;

  result.classList.add("show");

  document.querySelectorAll("#options button").forEach(button => {
    button.disabled = true;
  });

  const nextButton = document.getElementById("nextBtn");

  nextButton.style.display = "inline-block";
  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "See My Result"
      : "Next Question →";
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    showQuizResult();
  } else {
    loadQuestion();
  }
}

function showQuizResult() {
  document.getElementById("question").textContent =
    "Quiz Completed! 🌱";

  document.getElementById("options").innerHTML = "";

  const result = document.getElementById("quizResult");

  result.innerHTML = `
    <h3>Your Score: ${quizScore}/${questions.length}</h3>
    <p>
      ${
        quizScore === questions.length
          ? "Amazing! You know a lot about sustainable fashion!"
          : "Great job! Keep learning about conscious fashion choices."
      }
    </p>
    <button class="small-btn" onclick="restartQuiz()">Try Again</button>
  `;

  result.classList.add("show");

  document.getElementById("nextBtn").style.display = "none";
}

function restartQuiz() {
  currentQuestion = 0;
  quizScore = 0;
  loadQuestion();
}

// ======================================
// START QUIZ
// ======================================

loadQuestion();
