class move {
  constructor() {
    let row, col;
  }
}
let board = [
  ["x", "o", "x"],
  [" ", "o", "x"],
  [" ", " ", " "],
];
let player = "X",
  opponent = "O";
let Value = new Map([
  ["player", 10],
  ["opponent", -10],
  ["maxValue", 1000],
  [("minValue", -1000)],
]);
function opponentMove() {
  let bestMove = new move();
  bestMove.row = -1;
  bestMove.col = -1;
  let bestScore = Value.get("minValue");
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === " ") {
        board[i][j] = opponent;
        let moveValue = minmax(board, true);
        board[i][j] = " ";
        console.log(moveValue);
        if (bestScore < moveValue) {
          bestMove.row = i;
          bestMove.col = j;
        }
      }
    }
    return bestMove;
  }
}
function isMovesLeft(board) {
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) if (board[i][j] == " ") return true;

  return false;
}
//minmax algorithm -Ai
function minmax(board, isMaximizer) {
  let bestScore = 0;
  let score = checkWinner();
  if (score == Value.get("player")) return Value.get("player");
  if (score == Value.get("opponent")) return Value.get("opponent");
  if (isMovesLeft(board) == false) return 0;
  if (isMaximizer) {
    bestScore = Value.get("minValue");
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] == " ") {
          console.log(board);
          board[i][j] = player;
          bestScore = Math.max(bestScore, minmax(board, false));
          board[i][j] = " ";
        }
      }
    }
    return bestScore;
  } else {
    bestScore = Value.get("maxVlaue");
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] == " ") {
          board[i][j] = opponent;
          bestScore = Math.min(bestScore, minmax(board, true));
          board[i][j] = " ";
        }
      }
    }
    return bestScore;
  }
}
let isEqual3 = (a, b, c) => a === b && b === c && c !== "_";
//Resulte styles
let addResulteSyles = (
  row,
  col,
  isHorizontal,
  isDaigonalLeft,
  isDaigonalRightl
) => {
  for (let i = 0; i < board.length && !isDaigonalRightl; i++) {
    let id = isHorizontal ? row * board.length + i : i * board.length + col;
    let cell = document.getElementById(String(id));
    cell.style.color = "gold";
  }
  if (isDaigonalLeft) {
    for (let i = 0; i <= 9; i++) {
      console.log(i);
      let id = i;
      i += 3;
      let cell = document.getElementById(String(id));
      cell.style.color = "gold";
    }
    return;
  }
  if (isDaigonalRightl) {
    for (let i = 2; i <= 7; ) {
      let id = i;
      console.log(id);
      i += 2;
      let cell = document.getElementById(String(id));
      cell.style.color = "gold";
    }
  }
};

//checking winner
function checkWinner(board) {
  let score = 0;
  // check horizontal
  for (let i = 0; i < board.length; i++)
    if (isEqual3(board[i][0], board[i][1], board[i][2])) {
      addResulteSyles(i, 0, true, false, false);
      score = board[i][0] == "X" ? Value.get("player") : Value.get("opponent");
      return score;
    }
  for (let i = 0; i < board.length; i++) {
    if (isEqual3(board[0][i], board[1][i], board[2][i])) {
      addResulteSyles(0, i, false, false, false);
      score = board[0][i] == "X" ? Value.get("player") : Value.get("opponent");
      return score;
    }
  }
  if (isEqual3(board[0][0], board[1][1], board[2][2])) {
    addResulteSyles(0, 0, false, true, false);
    score = board[0][0] == "X" ? Value.get("player") : Value.get("opponent");
    return score;
  }
  if (isEqual3(board[0][2], board[1][1], board[2][0])) {
    addResulteSyles(0, 0, false, false, true);
    score = board[0][2] == "X" ? Value.get("player") : Value.get("opponent");
    return score;
  }
}
export { board, checkWinner, addResulteSyles };
