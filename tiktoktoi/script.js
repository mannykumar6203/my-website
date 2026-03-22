// -------------------------
// Game Variables
// -------------------------
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;
let score = { X: 0, O: 0, D: 0 };

// All 8 winning combinations
const winLines = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6]  // diagonal
];

// -------------------------
// Check Winner Function
// -------------------------
function checkWinner() {
  for (let [a, b, c] of winLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  if (board.every(v => v !== null)) {
    return { winner: 'Draw' };
  }
  return null;
}

// -------------------------
// Handle Cell Click
// -------------------------
document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    let i = cell.dataset.index;

    // Ignore if cell filled or game over
    if (board[i] || gameOver) return;

    // Place mark
    board[i] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    // Check result
    let result = checkWinner();
    if (result) {
      endGame(result);
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = "Player " + currentPlayer + "'s turn";
  });
});

// -------------------------
// End Game
// -------------------------
function endGame(result) {
  gameOver = true;

  if (result.winner === 'Draw') {
    document.getElementById('status').textContent = "It's a Draw!";
    score.D++;
    document.getElementById('sd').textContent = score.D;
  } else {
    document.getElementById('status').textContent = result.winner + " Wins! 🎉";
    // Highlight winning cells
    result.line.forEach(i => {
      document.querySelectorAll('.cell')[i].classList.add('win');
    });
    score[result.winner]++;
    if (result.winner === 'X') document.getElementById('sx').textContent = score.X;
    else document.getElementById('so').textContent = score.O;
  }
}

// -------------------------
// Reset Game
// -------------------------
function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;

  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });

  document.getElementById('status').textContent = "Player X's turn";
}

// -------------------------
// Reset Score
// -------------------------
function resetScore() {
  score = { X: 0, O: 0, D: 0 };
  document.getElementById('sx').textContent = 0;
  document.getElementById('so').textContent = 0;
  document.getElementById('sd').textContent = 0;
  resetGame();
}
