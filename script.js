import { checkWinner } from "./algo.js";
import { getAiMove } from "./minmax.js";
let board = [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
];
const xoElements = document.getElementsByClassName("cell");
const gameRestartBtn = document.getElementById("gameRestart");
const gamePlayerStates = document.getElementsByClassName("game--status");
let gameISOver = false;
let value = "O"; // initial value for starting game
//toggle X/O function
function toggleXO(innerValue) {
  value = innerValue == "X" ? "O" : "X";
  return value;
}
//setting the values and adding the styles
function setValue(cell, cellValue) {
  board[Math.trunc(cell.id / board.length)][cell.id % board.length] = cellValue;
  if (cellValue == "X") cell.style.color = "rgb(84, 84, 84)";
  else cell.style.color = "rgb(242, 235, 211)";
  cell.textContent = cellValue;
}
for (let ele of xoElements) {
  ele.addEventListener("click", (e) => gameSetup(e));
}
function gameSetup(e) {
  if (!gameISOver) {
    let innerValue =
      board[Math.trunc(e.target.id / board.length)][e.target.id % board.length];
    if (innerValue !== "_") return;
    value = toggleXO(value);
    setValue(e.target, value);
    // console.log(board);
    let aiMove = getAiMove(board);
    // console.log(aiMove);
    let aiCell = document.getElementById(String(aiMove));
    value = toggleXO(value);
    setValue(aiCell, value);
    let winner = checkWinner(board);
    console.log(winner);
    gameISOver = winner == -10 || winner == 10 ? true : false;
    winner = winner == -10 ? "O" : "X";
    if (gameISOver) {
      gamePlayerStates.textContent = "player " + winner;
      gameRestartBtn.style.display = "block";
    }
  }
}
gameRestartBtn.addEventListener("click", () => location.reload());
