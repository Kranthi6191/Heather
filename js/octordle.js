// Octordle clone: 8 boards, 13 guesses each

const octoWordList = [
  "APPLE", "GRAPE", "MANGO", "BERRY", "LEMON", "PEACH", "PLUMS", "CHERRY",
  "PEARS", "BANJO", "WATER", "HONEY", "BREAD", "MONEY", "PLANE", "SNAKE"
];

const octoAnswers = [];
while (octoAnswers.length < 8) {
  let candidate = octoWordList[Math.floor(Math.random() * octoWordList.length)];
  if (!octoAnswers.includes(candidate)) octoAnswers.push(candidate);
}

const maxRowsOcto = 13;
let currentGuessOcto = "";
let rowOcto = 0;

const boardsContainerOcto = document.getElementById("boards-container");
const messageOcto = document.getElementById("message");
const keyboardOcto = document.getElementById("keyboard");

// Create 8 boards
const boardsOcto = [];
for (let b = 0; b < 8; b++) {
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("wordle-board");
  boardDiv.dataset.boardIndex = b;
  for (let r = 0; r < maxRowsOcto; r++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    for (let c = 0; c < 5; c++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      rowDiv.appendChild(tile);
    }
    boardDiv.appendChild(rowDiv);
  }
  boardsContainerOcto.appendChild(boardDiv);
  boardsOcto.push(boardDiv);
}

// Create keyboard
"QWERTYUIOPASDFGHJKLZXCVBNM".split("").forEach(letter => {
  const btn = document.createElement("button");
  btn.textContent = letter;
  btn.addEventListener("click", () => handleKeyOcto(letter));
  keyboardOcto.appendChild(btn);
});
const enterBtnOcto = document.createElement("button");
enterBtnOcto.textContent = "Enter";
enterBtnOcto.addEventListener("click", checkGuessOcto);
keyboardOcto.appendChild(enterBtnOcto);

const delBtnOcto = document.createElement("button");
delBtnOcto.textContent = "Del";
delBtnOcto.addEventListener("click", deleteLetterOcto);
keyboardOcto.appendChild(delBtnOcto);

function handleKeyOcto(letter) {
  if (currentGuessOcto.length < 5) {
    currentGuessOcto += letter;
    updateBoardsOcto();
  }
}

function deleteLetterOcto() {
  currentGuessOcto = currentGuessOcto.slice(0, -1);
  updateBoardsOcto();
}

function updateBoardsOcto() {
  for (let b = 0; b < 8; b++) {
    const rowTiles = boardsOcto[b].children[rowOcto].children;
    for (let i = 0; i < 5; i++) {
      rowTiles[i].textContent = currentGuessOcto[i] || "";
    }
  }
}

function checkGuessOcto() {
  if (currentGuessOcto.length !== 5) {
    messageOcto.textContent = "Word must be 5 letters!";
    return;
  }
  let allCorrect = true;

  for (let b = 0; b < 8; b++) {
    const answer = octoAnswers[b];
    const rowTiles = boardsOcto[b].children[rowOcto].children;
    let boardCorrect = true;

    for (let i = 0; i < 5; i++) {
      if (currentGuessOcto[i] === answer[i]) {
        rowTiles[i].style.background = "green";
      } else if (answer.includes(currentGuessOcto[i])) {
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
    messageOcto.textContent = "🎉 You Win All 8 Words!";
    disableKeyboardOcto();
  } else if (rowOcto === maxRowsOcto - 1) {
    messageOcto.textContent = `Game Over! Answers were: ${octoAnswers.join(", ")}`;
    disableKeyboardOcto();
  } else {
    rowOcto++;
    currentGuessOcto = "";
  }
}

function disableKeyboardOcto() {
  [...keyboardOcto.children].forEach(btn => btn.disabled = true);
}
