import Cell from "../types/Cell";
import Ship from "../types/Ship";
import Game from "../types/Game";

const getRandomDirection = (): 'horizontal' | 'vertical' => {
  return Math.random() < 0.5 ? 'horizontal' : 'vertical';
};

const placeShip = (board: Cell[][], shipSize: number): void => {
  const boardSize = board.length;
  const direction = getRandomDirection();
  let row, col;

  if (direction === 'horizontal') {
    row = Math.floor(Math.random() * boardSize);
    col = Math.floor(Math.random() * (boardSize - shipSize + 1));
    for (let i = col; i < col + shipSize; i++) {
      board[row][i].status = 'occupied';
    }
  } else {
    row = Math.floor(Math.random() * (boardSize - shipSize + 1));
    col = Math.floor(Math.random() * boardSize);
    for (let i = row; i < row + shipSize; i++) {
      board[i][col].status = 'occupied';
    }
  }
};

const initializeGameBoard = (boardSize: number): Cell[][] => {
  const board: Cell[][] = [];

  for (let i = 0; i < boardSize; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < boardSize; j++) {
      row.push({ row: i, col: j, status: 'free', shotFired: false });
    }
    board.push(row);
  }

  return board;
};

const placeShipsRandomly = (boardSize: number, ships: Ship[]): Cell[][] => {
  const board = initializeGameBoard(boardSize);

  for (const ship of ships) {
    for (let i = 0; i < ship.count; i++) {
      placeShip(board, ship.size);
    }
  }

  return board;
};

const getRandomlyFilledBoard = (boardSize: number, ships: Ship[]): Cell[][] => {
  const board = placeShipsRandomly(boardSize, ships);
  return board;
}

export default getRandomlyFilledBoard;