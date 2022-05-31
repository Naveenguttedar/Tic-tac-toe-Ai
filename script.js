import { checkWinner, gameISOver, board } from "./game.js";
import { getAiMove } from "./minmax.js";
const game = document.getElementsByClassName("game");
const Ai = document.getElementById("Ai").checked;
const xoElements = document.getElementsByClassName("cell");
const gameRestartBtn = document.getElementById("gameRestart");
let value = "O"; // initial value for starting game
//toggle X/O function
function toggleXO(innerValue) {
  value = innerValue == "X" ? "O" : "X";
  return value;
}
//setting the values and adding the styles
function setValue(cell, cellValue) {
  if (cell == null) return;
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
    if (Ai) {
      let aiMove = getAiMove(board);
      let aiCell = document.getElementById(String(aiMove));
      value = toggleXO(value);
      setValue(aiCell, value);
    }
    let winner = checkWinner(board);
    if (gameISOver || winner == Math.abs(10)) {
      console.log(gameISOver, winner);
      showResults(winner, gameISOver);
    }
  }
}
function showResults(winner, gameISOver) {
  console.log(winner);
  game[0].classList.add("show__results");
  let winnerElement = document.getElementById("winnerElement");
  if (gameISOver && winner == 0) {
    winnerElement.style.display = "none";
    let log = document.getElementById("message");
    log.style.fontSize = "40px";
    log.innerText = "Draw!";
    return;
  }
  if (winner == 10) {
    winnerElement.style.color = "rgb(84, 84, 84)";
    winnerElement.innerText = "X";
  } else winnerElement.style.color = "rgb(242, 235, 211)";
}
gameRestartBtn.addEventListener("click", () => location.reload());
