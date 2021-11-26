import Board from "./board.js";
import bresenham from "./algorithms/bresenham-line-drawing.js";
window.log = console.log;
let board = new Board(15, 45);
board.initialize();

function start() {
  let bresenhamLineArray = bresenham(
    board.getNodePoint(board.getStartNode()),
    board.getNodePoint(board.getTargetNode())
  );
  board.drawPath(...bresenhamLineArray);
  window.requestAnimationFrame(start);
}
// start();
window.requestAnimationFrame(start);

// setInterval(start, 100);
