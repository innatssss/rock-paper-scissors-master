
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

// Constants and choices
const CHOICES = [
  { name: "paper", beats: "rock" },
  { name: "scissors", beats: "paper" },
  { name: "rock", beats: "scissors" },
];

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreUserNumber = document.querySelector(".you .score__number");
const scoreComputerNumber = document.querySelector(".computer .score__number");

let scoreUser = 0; // Score for the user
let scoreComputer = 0; // Score for the computer

// Game logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);

    choose(choice);
  });
});

function choose(choice) {
  const aiChoice = aiChoose();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultsDiv, idx) => {
    setTimeout(() => {
      resultsDiv.innerHTML = `
      <div class="choice ${results[idx].name}">
      <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
      </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "You win!";
      resultDivs[0].classList.toggle("winner");
      keepScore("user", 1);
    } else if (aiWins) {
      resultText.innerText = "You lose!";
      resultDivs[1].classList.toggle("winner");
      keepScore("computer", 1);
    } else {
      resultText.innerText = "It's a draw!";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");

    playAgainBtn.classList.remove("hidden");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

// Play again logic
playAgainBtn.addEventListener("click", () => {
  playAgainBtn.classList.add("hidden");

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultsDiv) => {
    resultsDiv.innerHTML = "";
    resultsDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// Keep score
function keepScore(winner, point) {
  if (winner === "user") {
    scoreUser += point;
    scoreUserNumber.innerText = scoreUser;
  } else if (winner === "computer") {
    scoreComputer += point;
    scoreComputerNumber.innerText = scoreComputer;
  }
}

// Show/hide rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
