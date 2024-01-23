import { Board, MenuCell, Ship } from "../types";
export default function isValidShipPlacement(board: Board, ship: Ship) {
    const boardSize = Math.sqrt(board.length);

    const { size, position, orientation } = ship;
    const { x, y } = position;

    if (x < 0 || y < 0) {
        return false;
    }
    if (x + size > boardSize || y + size > boardSize) {
        return false;
    }

    const isInvalidCell = (cell: MenuCell) => cell && cell.state === "ship";

    if (orientation === "horizontal") {
        for (let i = x - 1; i <= x + ship.size; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if(isInvalidCell(board[i * boardSize + j])) return false;
            }
        }
    } else {
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + ship.size; j++) {
                if(isInvalidCell(board[i * boardSize + j])) return false;
            }
        }
    }

    return true;
}
