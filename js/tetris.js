import { BoardTetris, BoardNext, BoardHold } from './boardTetris.js'
import { TetrominosBag } from './tetromino.js'

export class Tetris {
  constructor(canvas, rows, cols, cellSize, space, canvasNext, canvasHold) {
    this.boardTetris = new BoardTetris(canvas, rows, cols, cellSize, space);
    this.tetrominosBag = new TetrominosBag(canvas, cellSize);
    this.currentTetromino = this.tetrominosBag.nextTetromino();
    this.keyboard();
    this.key = { up: false, down: false };

    this.lastTime = 0;
    this.lastTime2 = 0;

    this.next = new BoardNext(canvasNext, 8, 4, cellSize, space, this.tetrominosBag.getThreeNextTretominos());
    this.hold = new BoardHold(canvasHold, 2, 4, cellSize,space);
    this.canHold = true;

    this.score = 0;
    this.gameOver = false;
  }
  update() {
    let currentTime = Date.now();
    let deltaTime = currentTime - this.lastTime;
    let deltaTime2 = currentTime - this.lastTime2;

    if (deltaTime >= 1000) {
      this.autoMoveTetrominoDown();
      this.lastTime = currentTime;
    }
    if (deltaTime2 >= 50) {
      this.boardTetris.draw();
      this.drawTetrominoGhost();
      this.currentTetromino.draw(this.boardTetris);

      this.next.draw2();
      this.hold.draw2();

      if (this.key.down) {
        this.moveTetrominoDown();
      }
      this.lastTime2 = currentTime;
    }
  }
  autoMoveTetrominoDown() {
    this.currentTetromino.move(1, 0);
    if (this.blockedTetromino()) {
      this.currentTetromino.move(-1, 0);
      this.placeTetromino();
    }
  }
  blockedTetromino() {
    const tetrominoPositions = this.currentTetromino.currentPositions();
    for (let i = 0; i < tetrominoPositions.length; i++) {
      const { row, column } = tetrominoPositions[i];
      if (!this.boardTetris.isValidPosition(row, column)) {
        return true
      }
    }
    return false;
  }
  moveTetrominoLeft() {
    this.currentTetromino.move(0, -1);
    if (this.blockedTetromino()) {
      this.currentTetromino.move(0, 1);
    }
  }
  moveTetrominoRight() {
    this.currentTetromino.move(0, 1);
    if (this.blockedTetromino()) {
      this.currentTetromino.move(0, -1);
    }
  }
  moveTetrominoDown() {
    this.currentTetromino.move(1, 0);
    if (this.blockedTetromino()) {
      this.currentTetromino.move(-1, 0);
      this.placeTetromino();
    }
  }
  rotationTetrominoCW() {
    const previousRotation = this.currentTetromino.rotation;
    this.currentTetromino.rotation++;
    if (this.currentTetromino.rotation > this.currentTetromino.shapes.length - 1) {
      this.currentTetromino.rotation = 0;
    }
    if (this.blockedTetromino()) {
      this.currentTetromino.rotation = previousRotation;
    }
  }
  rotationTetrominoCCW() {
    const previousRotation = this.currentTetromino.rotation;
    this.currentTetromino.rotation--;
    if (this.currentTetromino.rotation < 0) {
      this.currentTetromino.rotation = this.currentTetromino.shapes.length - 1;
    }
    if (this.blockedTetromino()) {
      this.currentTetromino.rotation = previousRotation; 
    }
  }
  placeTetromino() {
    const tetrominoPositions = this.currentTetromino.currentPositions();

    for (let i = 0; i < tetrominoPositions.length; i++) {
      this.boardTetris.matriz
      [tetrominoPositions[i].row]
      [tetrominoPositions[i].column] = this.currentTetromino.id;
    }
    this.score += this.boardTetris.clearFullRows()*146;

    if (this.boardTetris.gameOver()) {
      setTimeout(() => {
        this.gameOver = true;
      }, 500);
      return true;
    } else {
      this.currentTetromino = this.tetrominosBag.nextTetromino();
      this.next.listTetrominos = this.tetrominosBag.getThreeNextTretominos();
      this.next.updateMatriz();
      this.canHold = true;
    }
  }
  dropDistance(position) {
    let distance = 0;
    while (
      position.row + distance + 1 < this.boardTetris.rows &&
      this.boardTetris.isEmpty(position.row + distance + 1, position.column)) {
      distance++;
    }
    return distance;
  }
  tetrominoDropDistance() {
    let drop = this.boardTetris.rows;
    const tetrominoPositions = this.currentTetromino.currentPositions();
    for (let i = 0; i < tetrominoPositions.length; i++) {
      drop = Math.min(drop, this.dropDistance(tetrominoPositions[i]))
    }
    return drop;
  }
  drawTetrominoGhost() {

    const dropDistance = this.tetrominoDropDistance();
    const tetrominoPositions = this.currentTetromino.currentPositions();
    for (let i = 0; i < tetrominoPositions.length; i++) {
      const position = this.boardTetris.getCoordinates(
        tetrominoPositions[i].column,
        tetrominoPositions[i].row + dropDistance
      );
      // DRAW BLOCK GHOST
      this.boardTetris.drawSquere(position.x, position.y, this.boardTetris.cellSize, "#14141d", "lightgray", 20);
    }
  }
  dropBlock() {
    this.currentTetromino.move(this.tetrominoDropDistance(), 0);
    this.placeTetromino();
  }
  holdTetromino(){
    if(!this.canHold) return;
    if(this.hold.tetromino === null){
      this.hold.tetromino = this.currentTetromino;
      this.currentTetromino = this.tetrominosBag.nextTetromino();
    } else{
      [this.currentTetromino, this.hold.tetromino] = [this.hold.tetromino, this.currentTetromino]
    }
    this.hold.updateMatriz();
    this.canHold = false;
  }
  reset(){
    this.gameOver = false;
    this.boardTetris.restartMatriz();
    this.score = 0;
  
    this.hold.tetromino = null;
    this.hold.restartMatriz();
  
    this.tetrominosBag.reset();
    this.currentTetromino = this.tetrominosBag.nextTetromino();
  
    this.canHold = true;
  
    this.next.restartMatriz();
    this.next.listTetrominos = this.tetrominosBag.getThreeNextTretominos();
    this.next.updateMatriz();
    this.next.draw2();
    this.hold.draw2();
  
    this.key = { up: false, down: false };
  
    this.boardTetris.draw();
    this.drawTetrominoGhost();
    this.currentTetromino.draw(this.boardTetris);
  }
  
  keyboard() {
    window.addEventListener("keydown", (evt) => {
      if (evt.key === "ArrowLeft") {
        this.moveTetrominoLeft();
      }
      if (evt.key === "ArrowRight") {
        this.moveTetrominoRight();
      }
      if (evt.key === "ArrowUp" && !this.key.up) {
        this.rotationTetrominoCW();
        this.key.up = true;
      }
      if (evt.key === "ArrowDown") {
        this.key.down = true;
      }
      if (evt.code === "Space") {
      evt.preventDefault();
        this.dropBlock();
      }
      if (evt.key === "c" || evt.key === "C") {
        if(!this.gameOver){
          this.holdTetromino();
        }
      }
    });
    window.addEventListener("keyup", (evt) => {
      if (evt.key === "ArrowUp") {
        this.key.up = false;
      }
      if (evt.key === "ArrowDown") {
        this.key.down = false;
      }
    });
  }
}
