import Ship from "./Ship";
import Cell from "./Cell";

interface Game {
    boardSize: number;
    ships: Ship[];
    board: Cell[][];
}

export default Game;