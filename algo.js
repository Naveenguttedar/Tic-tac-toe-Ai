let board = [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
];
let Value = new Map([
  ["playerScore", 100],
  ["opponentScore", -100],
  ["maxValue", 1000],
  [("minValue", -1000)],
]);
let gameISOver = false;
function isMovesLeft(board) {
  console.log(gameISOver);
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) if (board[i][j] == "_") return true;
  return false;
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
  for (
    let i = 0;
    i < board.length && !isDaigonalRightl && !isDaigonalLeft;
    i++
  ) {
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
  if (isMovesLeft(board) == false) {
    gameISOver = true;
    return;
  }
  // check horizontal
  for (let i = 0; i < board.length; i++) {
    if (isEqual3(board[i][0], board[i][1], board[i][2])) {
      addResulteSyles(i, 0, true, false, false);
      score =
        board[i][0] == "X"
          ? Value.get("playerScore")
          : Value.get("opponentScore");
      gameISOver = true;
      return score;
    }
    for (let i = 0; i < board.length; i++) {
      if (isEqual3(board[0][i], board[1][i], board[2][i])) {
        addResulteSyles(0, i, false, false, false);
        score =
          board[0][i] == "X"
            ? Value.get("playerScore")
            : Value.get("opponentScore");
        gameISOver = true;
        return score;
      }
    }
    if (isEqual3(board[0][0], board[1][1], board[2][2])) {
      addResulteSyles(0, 0, false, true, false);
      score =
        board[0][0] == "X"
          ? Value.get("playerScore")
          : Value.get("opponentScore");
      gameISOver = true;
      return score;
    }
    if (isEqual3(board[0][2], board[1][1], board[2][0])) {
      addResulteSyles(0, 0, false, false, true);
      score =
        board[0][2] == "X"
          ? Value.get("playerScore")
          : Value.get("opponentScore");
      gameISOver = true;
      return score;
    }
  }
}

export { gameISOver, checkWinner, Value };
