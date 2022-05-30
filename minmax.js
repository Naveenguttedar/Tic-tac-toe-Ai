import { checkWinner, Value } from "./algo.js";
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
  return false;
}

function evaluate(b) {
  // Checking for Rows for X or O victory.
  for (let row = 0; row < 3; row++) {
    if (b[row][0] == b[row][1] && b[row][1] == b[row][2]) {
      if (b[row][0] == player) {
        return Value.get("playerScore");
      } else if (b[row][0] == opponent) return Value.get("opponentScore");
    }
  }

  // Checking for Columns for X or O victory.
  for (let col = 0; col < 3; col++) {
    if (b[0][col] == b[1][col] && b[1][col] == b[2][col]) {
      if (b[0][col] == player) {
        return Value.get("playerScore");
      } else if (b[0][col] == opponent) return Value.get("opponentScore");
    }
  }

  // Checking for Diagonals for X or O victory.
  if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
    if (b[0][0] == player) {
      return Value.get("playerScore");
    } else if (b[0][0] == opponent) return Value.get("opponentScore");
  }

  if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
    if (b[0][2] == player) {
      return Value.get("playerScore");
    } else if (b[0][2] == opponent) return Value.get("opponentScore");
  }
  return 0;
}
let count = 0;
function minimax(board, depth, isMax) {
  count++;
  let score = evaluate(board);
  if (score == Value.get("playerScore")) return score;
  if (score == Value.get("opponentScore")) return score;
  if (isMovesLeft(board) == false) return 0;
  if (isMax) {
    let best = -100;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "_") {
          board[i][j] = player;
          best = Math.max(best, minimax(board, depth + 1, !isMax));
          board[i][j] = "_";
        }
      }
    }
    return best;
  } else {
    let best = 100;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "_") {
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
  let bestVal = -100;
  let bestMove = new Move();
  bestMove.row = -1;
  bestMove.col = -1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "_") {
        board[i][j] = player;
        let moveVal = minimax(board, 0, false);
        board[i][j] = "_";
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
  console.log(count);
  return id;
};
export { getAiMove, checkWinner };
