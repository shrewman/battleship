import { MenuBoardType, MenuCellType, Ship } from "../types";
export default function isValidShipPlacement(board: MenuBoardType, ship: Ship) {
    const boardSize = Math.sqrt(board.length);

    const { size, position, orientation } = ship;
    const { x, y } = position;

    if (x < 0 || y < 0) {
        return false;
    }
    if (x + size > boardSize || y + size > boardSize) {
        return false;
    }

    const isInvalidCell = (cell: MenuCellType) => cell && cell.state === "ship";

    if (orientation === "horizontal") {
        for (let i = y - 1; i <= y + ship.size; i++) {
            for (let j = x - 1; j <= x + 1; j++) {
                if(isInvalidCell(board[i * boardSize + j])) return false;
            }
        }
    } else {
        for (let i = y - 1; i <= y + 1; i++) {
            for (let j = x - 1; j <= x + ship.size; j++) {
                if(isInvalidCell(board[i * boardSize + j])) return false;
            }
        }
    }

    return true;
}
