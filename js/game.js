document.addEventListener("DOMContentLoaded", function () {
  particlesJS.load('particles-js', 'js/particles.json', function () {
    console.log('callback - particles.js config loaded');
  });
});
import { Tetris } from './tetris.js'

const canvasTetris = document.getElementById("canvas-tetris");
const canvasNext = document.getElementById("canvas-next");
const canvasHold = document.getElementById("canvas-hold");
const score = document.getElementById("Score");
const menu = document.getElementById("menu");
const btnMenu = document.getElementById("btn-start");
const rows = 20;
const cols = 10;
const cellSize = 26;
const space = 2;

const game = new Tetris(canvasTetris, rows, cols, cellSize, space, canvasNext, canvasHold);

  btnMenu.addEventListener("click", () => {
    setTimeout(() => {
      
      menu.style.display = "none";
      game.reset();
    },200);
  });
function update() {
  if (game.gameOver) {
    menu.style.display = "flex";
  } else {
    game.update();
    score.innerHTML = game.score;
  }
  requestAnimationFrame(update);
}

update();
