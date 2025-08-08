// js/wordle.js
const words = ["APPLE", "GRAPE", "MANGO", "BERRY", "LEMON"];
const answer = words[Math.floor(Math.random() * words.length)];
let currentGuess = "";
let row = 0;

const board = document.getElementById("wordle-board");
const message = document.getElementById("message");
const keyboard = document.getElementById("keyboard");

// Create 6x5 board
for (let r = 0; r < 6; r++) {
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  for (let c = 0; c < 5; c++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    rowDiv.appendChild(tile);
  }
  board.appendChild(rowDiv);
}

// Build keyboard
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
    updateBoard();
  }
}

function deleteLetter() {
  currentGuess = currentGuess.slice(0, -1);
  updateBoard();
}

function updateBoard() {
  const rowTiles = board.children[row].children;
  for (let i = 0; i < 5; i++) {
    rowTiles[i].textContent = currentGuess[i] || "";
  }
}

function checkGuess() {
  if (currentGuess.length !== 5) {
    message.textContent = "Word must be 5 letters!";
    return;
  }
  const rowTiles = board.children[row].children;
  for (let i = 0; i < 5; i++) {
    if (currentGuess[i] === answer[i]) {
      rowTiles[i].style.background = "green";
    } else if (answer.includes(currentGuess[i])) {
      rowTiles[i].style.background = "gold";
    } else {
      rowTiles[i].style.background = "grey";
    }
  }
  if (currentGuess === answer) {
    message.textContent = "🎉 You Win!";
  } else if (row === 5) {
    message.textContent = `Game Over! Word was ${answer}`;
  } else {
    row++;
    currentGuess = "";
  }
}
