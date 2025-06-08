let board;
let currentPlayer;
const cells = [];

function startGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";
  document.getElementById("status").textContent = "";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    boardDiv.appendChild(cell);
    cells[i] = cell;
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] || checkWinner()) return;
  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  if (checkWinner()) {
    document.getElementById("status").textContent = `${currentPlayer} venceu!`;
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (currentPlayer === "O") {
    setTimeout(botMove, 300);
  }
}

function botMove() {
  const emptyIndices = board.map((val, i) => val ? null : i).filter(i => i !== null);
  if (emptyIndices.length === 0) return;
  const move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  board[move] = currentPlayer;
  cells[move].textContent = currentPlayer;
  if (checkWinner()) {
    document.getElementById("status").textContent = `${currentPlayer} venceu!`;
    return;
  }
  currentPlayer = "X";
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

startGame();
