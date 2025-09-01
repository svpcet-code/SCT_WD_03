const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("reset");
const pvpButton = document.getElementById("pvp");
const pvcButton = document.getElementById("pvc");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = false;
let vsComputer = false;

function renderBoard() {
    boardElement.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => makeMove(index));
        boardElement.appendChild(cellElement);
    });
}

function makeMove(index) {
    if (!gameActive || board[index]) return;
    board[index] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
        statusElement.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    if (board.every(cell => cell)) {
        statusElement.textContent = "It's a draw!";
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.textContent = `Player ${currentPlayer}'s turn`;

    if (vsComputer && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let availableMoves = board
        .map((cell, index) => (cell ? null : index))
        .filter(val => val !== null);
    let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    makeMove(move);
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combo => {
        const [a, b, c] = combo;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function startGame(mode) {
    board = Array(9).fill(null);
    currentPlayer = "X";
    gameActive = true;
    vsComputer = (mode === "pvc");
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
}

resetButton.addEventListener("click", () => startGame(vsComputer ? "pvc" : "pvp"));
pvpButton.addEventListener("click", () => startGame("pvp"));
pvcButton.addEventListener("click", () => startGame("pvc"));

renderBoard();
