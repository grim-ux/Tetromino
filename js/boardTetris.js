import {Grid} from './grid.js'

export class BoardTetris extends Grid {
  constructor(canvas, rows, cols, cellsize, space){
    super(canvas, rows, cols, cellsize, space);
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const position = this.getCoordinates(c, r);
        if (this.matriz[r][c] !== 0) {
          this.block.drawBlock(position.x, position.y, this.matriz[r][c]);
        } else {
          this.drawSquere(position.x, position.y, this.cellSize, '#14141d', '#303045', 10);
        }
      }
    }
    this.printMatriz();
  }
  isInside(row, col){
    return row>=0 && row<this.rows && col>=0 && col<this.cols;
  }
  isEmpty(row, col){
    return this.isInside(row, col) && this.matriz[row][col] === 0;
  }
  isValidPosition(row, col) {
    return this.isInside(row, col) && this.isEmpty(row, col);
  }
  isRowFull(row){
    return this.matriz[row].every(element => element !== 0);
  }
  isRowEmpty(row){
    return this.matriz[row].every(element => element === 0);
  }
  clearRow(row){
    this.matriz[row].fill(0);
  }
  moveRowDown(row, numRows){
    this.matriz[row + numRows] = this.matriz[row].slice();
    this.clearRow(row);
  }
  clearFullRows(){
    let cont = 0;

    for(let row = this.rows -1; row>=0; row--){
      if(this.isRowFull(row)){
        this.clearRow(row);
        cont++;
      } else if(cont > 0){
        this.moveRowDown(row,cont);
      }
    }
    return cont;
  }
  gameOver(){
    return !(this.isRowEmpty(0));
  }
}
export class BoardNext extends Grid {
  constructor(canvas, rows, cols, cellSize, space, listTetrominos) {
    super(canvas, rows, cols, cellSize, space);
    this.listTetrominos = listTetrominos;
    this.updateMatriz();
  }
  updateMatriz(){
    this.restartMatriz();

    let cont = 0;
    for (let i = 0; i < this.listTetrominos.length; i++) {
      const shape = this.listTetrominos[i].currentShape();
      for(let j = 0; j<shape.length; j++){
        this.matriz[shape[j].row + cont][shape[j].column] = this.listTetrominos[i].id;
      }
      cont+=3;
    }
  }
}
export class BoardHold extends Grid {
  constructor(canvas, rows, cols, cellSize, space) {
    super(canvas, rows, cols, cellSize, space);
    this.tetromino = null;
    this.updateMatriz();
  }
  updateMatriz(){
    if(this.tetromino==null) return;
    this.tetromino.reset();
    this.restartMatriz();
    const shape = this.tetromino.currentShape();
    for(let i = 0; i < shape.length; i++){
      this.matriz[shape[i].row][shape[i].column] = this.tetromino.id;
    }
  }
}


