// Simple Quordle clone: 4 boards, 9 guesses each

const wordList = ["APPLE", "GRAPE", "MANGO", "BERRY", "LEMON", "PEACH", "PLUMS", "CHERRY", "PEARS", "BANJO"];

const answers = [];
while (answers.length < 4) {
  let candidate = wordList[Math.floor(Math.random() * wordList.length)];
  if (!answers.includes(candidate)) answers.push(candidate);
}

const maxRows = 9;
let currentGuess = "";
let row = 0;

const boardsContainer = document.getElementById("boards-container");
const message = document.getElementById("message");
const keyboard = document.getElementById("keyboard");

// Create 4 boards
const boards = [];
for (let b = 0; b < 4; b++) {
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("wordle-board");
  boardDiv.dataset.boardIndex = b;
  for (let r = 0; r < maxRows; r++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    for (let c = 0; c < 5; c++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      rowDiv.appendChild(tile);
    }
    boardDiv.appendChild(rowDiv);
  }
  boardsContainer.appendChild(boardDiv);
  boards.push(boardDiv);
}

// Create keyboard
"QWERTYUIOPASDFGHJKLZXCVBNM".split("").forEach(letter => {
  const btn = document.createElement("button");
  btn.textContent = letter;
  btn.addEventListener("click", () => handleKey(letter));
  keyboard.appendChild(btn);
});
const enterBtn = document.createElement("button");
enterBtn.textContent = "Enter";
enterBtn.addEventListener("click", checkGuess);
keyboard.appendChild(enterBtn);

const delBtn = document.createElement("button");
delBtn.textContent = "Del";
delBtn.addEventListener("click", deleteLetter);
keyboard.appendChild(delBtn);

function handleKey(letter) {
  if (currentGuess.length < 5) {
    currentGuess += letter;
    updateBoards();
  }
}

function deleteLetter() {
  currentGuess = currentGuess.slice(0, -1);
  updateBoards();
}

function updateBoards() {
  for (let b = 0; b < 4; b++) {
    const rowTiles = boards[b].children[row].children;
    for (let i = 0; i < 5; i++) {
      rowTiles[i].textContent = currentGuess[i] || "";
    }
  }
}

function checkGuess() {
  if (currentGuess.length !== 5) {
    message.textContent = "Word must be 5 letters!";
    return;
  }
  let allCorrect = true;

  for (let b = 0; b < 4; b++) {
    const answer = answers[b];
    const rowTiles = boards[b].children[row].children;
    let boardCorrect = true;

    for (let i = 0; i < 5; i++) {
      if (currentGuess[i] === answer[i]) {
        rowTiles[i].style.background = "green";
      } else if (answer.includes(currentGuess[i])) {
        rowTiles[i].style.background = "gold";
        boardCorrect = false;
      } else {
        rowTiles[i].style.background = "grey";
        boardCorrect = false;
      }
    }

    if (!boardCorrect) allCorrect = false;
  }

  if (allCorrect) {
    message.textContent = "🎉 You Win All 4 Words!";
    disableKeyboard();
  } else if (row === maxRows - 1) {
    message.textContent = `Game Over! Answers were: ${answers.join(", ")}`;
    disableKeyboard();
  } else {
    row++;
    currentGuess = "";
  }
}

function disableKeyboard() {
  [...keyboard.children].forEach(btn => btn.disabled = true);
}
