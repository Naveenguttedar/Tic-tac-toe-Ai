import { checkWinner, addResulteSyles } from "./algo.js";
let gameISOver = false;
class Move {
  constructor() {
    let row, col;
  }
}

let player = "O",
  opponent = "X";

function isMovesLeft(board) {
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) if (board[i][j] == "_") return true;
  gameISOver = true;
  return false;
}

function evaluate(b) {
  // Checking for Rows for X or O victory.
  for (let row = 0; row < 3; row++) {
    if (b[row][0] == b[row][1] && b[row][1] == b[row][2]) {
      gameISOver = true;
      if (b[row][0] == player) {
        return +10;
      } else if (b[row][0] == opponent) return -10;
    }
  }

  // Checking for Columns for X or O victory.
  for (let col = 0; col < 3; col++) {
    if (b[0][col] == b[1][col] && b[1][col] == b[2][col]) {
      gameISOver = true;
      if (b[0][col] == player) {
        return +10;
      } else if (b[0][col] == opponent) return -10;
    }
  }

  // Checking for Diagonals for X or O victory.
  if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
    gameISOver = true;
    if (b[0][0] == player) {
      return +10;
    } else if (b[0][0] == opponent) return -10;
  }

  if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
    gameISOver = true;
    if (b[0][2] == player) {
      return +10;
    } else if (b[0][2] == opponent) return -10;
  }

  // Else if none of them have
  // won then return 0
  return 0;
}

function minimax(board, depth, isMax) {
  // console.log(board);
  let score = evaluate(board);

  if (score == 10) return score;

  if (score == -10) return score;

  if (isMovesLeft(board) == false) return 0;

  // If this maximizer's move
  if (isMax) {
    let best = -1000;

    // Traverse all cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j] == "_") {
          // Make the move
          board[i][j] = player;
          best = Math.max(best, minimax(board, depth + 1, !isMax));

          // Undo the move
          board[i][j] = "_";
        }
      }
    }
    return best;
  }

  // If this minimizer's move
  else {
    let best = 1000;

    // Traverse all cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j] == "_") {
          // Make the move
          board[i][j] = opponent;
          best = Math.min(best, minimax(board, depth + 1, !isMax));
          board[i][j] = "_";
        }
      }
    }
    return best;
  }
}
function findBestMove(board) {
  // console.log(board);
  let bestVal = -1000;
  let bestMove = new Move();
  bestMove.row = -1;
  bestMove.col = -1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Check if cell is empty
      if (board[i][j] == "_") {
        // Make the move
        board[i][j] = player;
        let moveVal = minimax(board, 0, false);
        // Undo the move
        board[i][j] = "_";
        // console.log(moveVal);
        if (moveVal > bestVal) {
          bestMove.row = i;
          bestMove.col = j;
          bestVal = moveVal;
        }
      }
    }
  }

  return bestMove;
}

// // Driver code
let getAiMove = (board) => {
  let aiBoardIndex = findBestMove(board);
  let id = aiBoardIndex.row * 3 + aiBoardIndex.col;
  return id;
};
export { getAiMove, checkWinner };
