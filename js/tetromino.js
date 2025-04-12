
class Position {
  constructor(row, column) {
    this.row = row;
    this.column = column;

  }
}
class Tetromino {
  constructor(canvas, cellSize, shapes = [], initPosition = new Position(), id = 1) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.cellSize = cellSize;
    this.shapes = shapes;
    this.rotation = 0;
    this.initPosition = initPosition;
    this.position = new Position(this.initPosition.row, this.initPosition.column);
    this.id = id;
  }
  drawSquare(x, y, size, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, size, size);
  }
  drawTriangle(x1, y1, x2, y2, x3, y3, color) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x3, y3);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
  getColorPalette(id) {
    const palette = {
      1: {
        rightTriangle: "#FE8601",
        leftTriangle: "#FFFFFF",
        square: "#FFDB01"
      },
      2: {
        rightTriangle: "#FE5E02",
        leftTriangle: "#FFFFFF",
        square: "#FE8602"
      },
      3: {
        rightTriangle: "#B5193B",
        leftTriangle: "#FFFFFF",
        square: "#EE1B2E"
      },
      4: {
        rightTriangle: "#22974C",
        leftTriangle: "#FFFFFF",
        square: "#24DC4F"
      },
      5: {
        rightTriangle: "#49BDFF",
        leftTriangle: "#FFFFFF",
        square: "#2D97F7"
      },
      6: {
        rightTriangle: "#0000C9",
        leftTriangle: "#FFFFFF",
        square: "#0101F0"
      },
      7: {
        rightTriangle: "#8500D3",
        leftTriangle: "#FFFFFF",
        square: "#A000F1"
      }
    }
    return palette[id] || palette[1]
  }
  drawBlock(x, y, id) {
    const margin = this.cellSize / 8;
    const palette = this.getColorPalette(id);

    this.drawTriangle(
      x, y,
      x + this.cellSize, y,
      x, y + this.cellSize,
      palette.leftTriangle
    );

    this.drawTriangle(
      x + this.cellSize, y,
      x + this.cellSize, y + this.cellSize,
      x, y + this.cellSize,
      palette.rightTriangle
    );

    this.drawSquare(
      x + margin,
      y + margin,
      this.cellSize - (margin * 2),
      palette.square
    );
  }
  currentShape() {
    return this.shapes[this.rotation];
  }
  draw(grid) {
    const shape = this.currentShape();
    for (let i = 0; i < shape.length; i++) {
      const position = grid.getCoordinates(
        this.position.column + shape[i].column,
        this.position.row + shape[i].row
      );
      this.drawBlock(position.x, position.y, this.id);
    }
  }
  currentPositions() {
    const positions = [];
    const shape = this.currentShape();
    for (let i = 0; i < shape.length; i++) {
      positions.push(new Position(
        this.position.row + shape[i].row,
        this.position.column + shape[i].column,
      ));
    }
    return positions;
  }
  move(row, column) {
    this.position.row += row;
    this.position.column += column;
  }
  reset() {
    this.rotation = 0;
    this.position = new Position(this.initPosition.row, this.initPosition.column);
  }
}

const TetrominoType = {
  T: {
    id: 1,
    initPosition: new Position(0, 3),
    shapes: [
      [new Position(0, 1), new Position(1, 0), new Position(1, 1), new Position(1, 2)],
      [new Position(0, 1), new Position(1, 1), new Position(1, 2), new Position(2, 1)],
      [new Position(1, 0), new Position(1, 1), new Position(1, 2), new Position(2, 1)],
      [new Position(0, 1), new Position(1, 0), new Position(1, 1), new Position(2, 1)]
    ]
  },
  O: {
    id: 2,
    initPosition: new Position(0, 4),
    shapes: [
      [new Position(0, 0), new Position(0, 1), new Position(1, 0), new Position(1, 1)]
    ]
  },
  I: {
    id: 3,
    initPosition: new Position(-1, 3),
    shapes: [
      [new Position(1, 0), new Position(1, 1), new Position(1, 2), new Position(1, 3)],
      [new Position(0, 2), new Position(1, 2), new Position(2, 2), new Position(3, 2)],
      [new Position(2, 0), new Position(2, 1), new Position(2, 2), new Position(2, 3)],
      [new Position(0, 1), new Position(1, 1), new Position(2, 1), new Position(3, 1)]
    ]
  },
  S: {
    id: 4,
    initPosition: new Position(0, 3),
    shapes: [
      [new Position(0, 1), new Position(0, 2), new Position(1, 0), new Position(1, 1)],
      [new Position(0, 1), new Position(1, 1), new Position(1, 2), new Position(2, 2)],
      [new Position(1, 1), new Position(1, 2), new Position(2, 0), new Position(2, 1)],
      [new Position(0, 0), new Position(1, 0), new Position(1, 1), new Position(2, 1)]
    ]
  },
  Z: {
    id: 5,
    initPosition: new Position(0, 3),
    shapes: [
      [new Position(0, 0), new Position(0, 1), new Position(1, 1), new Position(1, 2)],
      [new Position(0, 2), new Position(1, 1), new Position(1, 2), new Position(2, 1)],
      [new Position(1, 0), new Position(1, 1), new Position(2, 1), new Position(2, 2)],
      [new Position(0, 1), new Position(1, 0), new Position(1, 1), new Position(2, 0)]
    ]
  },
  J: {
    id: 6,
    initPosition: new Position(0, 3),
    shapes: [
      [new Position(0, 0), new Position(1, 0), new Position(1, 1), new Position(1, 2)],
      [new Position(0, 1), new Position(0, 2), new Position(1, 1), new Position(2, 1)],
      [new Position(1, 0), new Position(1, 1), new Position(1, 2), new Position(2, 2)],
      [new Position(0, 1), new Position(1, 1), new Position(2, 0), new Position(2, 1)]
    ]
  },
  L: {
    id: 7,
    initPosition: new Position(0, 3),
    shapes: [
      [new Position(0, 2), new Position(1, 0), new Position(1, 1), new Position(1, 2)],
      [new Position(0, 1), new Position(1, 1), new Position(2, 1), new Position(2, 2)],
      [new Position(1, 0), new Position(1, 1), new Position(1, 2), new Position(2, 0)],
      [new Position(0, 0), new Position(0, 1), new Position(1, 1), new Position(2, 1)]
    ]
  }
};

class TetrominosBag {
  constructor(canvas, cellSize) {
    this.canvas = canvas;
    this.cellSize = cellSize;
    this.bag = [];
    this.threeNextTretominos = [];
    this.init();
  }
  init(){
    for(let i=0; i<3; i++){
      this.threeNextTretominos.push(this.getNextTretromino());
    }
  }
  fillBag() {

    const tetrominosTypes = [
      TetrominoType.T,
      TetrominoType.O,
      TetrominoType.I,
      TetrominoType.S,
      TetrominoType.Z,
      TetrominoType.J,
      TetrominoType.L,
    ]
    this.bag.length = 0;

    tetrominosTypes.forEach((type) => {
      this.bag.push(new Tetromino(
        this.canvas, this.cellSize, type.shapes, type.initPosition, type.id
      ));
    });

    for (let i = this.bag.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]]
    }
  }
  getNextTretromino(){
    if (this.bag.length === 0){
      this.fillBag();
    }
    return this.bag.pop();
  }
  nextTetromino() {
    const next = this.threeNextTretominos.shift();
    this.threeNextTretominos.push(this.getNextTretromino());
    return next;
  }
  getThreeNextTretominos(){
    return this.threeNextTretominos;
  }
  reset(){
    this.bag = [];
    this.threeNextTretominos = [];
    this.init();
  }
}
export { Position, Tetromino, TetrominoType, TetrominosBag }
