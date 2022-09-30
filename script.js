//Selecting DOM elements
const startButton = document.querySelector(".start");
const continueButton = document.querySelector(".continue");
const maxNumberInput = document.querySelector(".input-max");
const mainElement = document.querySelector("main");
const restartButton = document.querySelector(".restart");
const rangeContainer = document.querySelector(".range-container");
const ButtonContainer = document.querySelector(".button-container");
const attemptHTML = document.querySelector(".attempt");
const between = document.querySelector(".between");
const highest = document.querySelector(".highest");
const tooltip = document.querySelector(".tooltip");
const checkButton = document.querySelector(".check");
const guessInput = document.querySelector(".guess");
const maxNumberButton = document.querySelector(".max-number");
const tryes = document.querySelector(".tryes");
let attempt = 5;
let secretNumber;
let maxNumber = 20;
let enteredNumbers = [];

//Game Class
class Game {
  constructor(number) {
    this.number = number;
  }

  getSecretNumber() {
    return Math.trunc(Math.random() * this.number) + 1;
  }
}

//UI Class

class UI {
  static displayRangeButton() {
    displayToggle(ButtonContainer, "none");
    displayToggle(rangeContainer, "block");
  }

  static startDefaultGame() {
    displayToggle(ButtonContainer, "none");
  }

  static displayGameBoard() {
    displayToggle(mainElement, "flex");
    displayToggle(restartButton, "flex");
    displayToggle(rangeContainer, "none");
    displayToggle(between, "block");
  }

  static restartGame() {
    displayToggle(mainElement, "none");
    displayToggle(restartButton, "none");
    displayToggle(ButtonContainer, "flex");
  }
}
//Initiate Game instance
const newGame = new Game(maxNumber);

//Event: Start Default Game
startButton.addEventListener("click", () => {
  secretNumber = newGame.getSecretNumber(maxNumber);
  attemptHTML.textContent = attempt;
  highest.textContent = 20;
  UI.startDefaultGame();
  UI.displayGameBoard();
});

//Event: Display Range Select Screen
maxNumberButton.addEventListener("click", UI.displayRangeButton);

//Event: Display Custom Game Board
continueButton.addEventListener("click", () => {
  maxNumber = +maxNumberInput.value;
  newGame.number = maxNumber;

  if (maxNumber < 1 || maxNumber > 200) {
    return (tooltip.style.color = "red");
  }
  attempt = Math.trunc(maxNumber / 4);
  if (attempt < 3) {
    attempt = 3;
  }

  highest.textContent = +maxNumberInput.value;
  secretNumber = newGame.getSecretNumber(maxNumber);
  attemptHTML.textContent = attempt;
  UI.displayGameBoard();
});

//Event: Disable button
guessInput.addEventListener("keyup", () => {
  if (+guessInput.value < 1 || +guessInput.value > maxNumber) {
    checkButton.disabled = true;
  } else {
    checkButton.disabled = false;
  }
});

//Event: Check number
checkButton.addEventListener("click", () => {
  const gameGuess = +guessInput.value;

  if (!gameGuess) {
    displayMessage("Incorrect number!");
  } else if (gameGuess === secretNumber) {
    displayMessage(`You win! X is ${secretNumber}!`);
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector("body").style.backgroundColor = "#47b389";
  } else if (gameGuess !== secretNumber) {
    if (attempt > 1) {
      const guessError =
        gameGuess > secretNumber
          ? "Entered number is greater than X"
          : "Entered number is less than X";
      displayMessage(guessError);
      attempt--;
      attemptHTML.textContent = attempt;
    } else {
      displayMessage(`You lost! X is ${secretNumber}!`);
      document.querySelector(".number").textContent = secretNumber;
      document.querySelector("body").style.backgroundColor = "#ca2121d9";
      attemptHTML.textContent = 0;
    }

    enteredNumbers = [...enteredNumbers, gameGuess];
    tryes.textContent = enteredNumbers.join(" / ");
  }
});

//Event: Restart game
restartButton.addEventListener("click", () => {
  attempt = 5;
  displayToggle(between, "none");
  maxNumberInput.value = "";
  guessInput.value = "";
  tryes.textContent = "";
  enteredNumbers = [];
  attempt.textContent = attempt;
  tooltip.style.color = "#fafafa";
  document.querySelector(".number").textContent = "X";
  document.querySelector("body").style.backgroundColor = "#646464";
  displayMessage("Let's go");

  UI.restartGame();
});

//Additional functions
function displayToggle(elem, action) {
  elem.style.display = action;
}

function displayMessage(text) {
  document.querySelector(".message").textContent = text;
}
