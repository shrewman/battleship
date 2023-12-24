import Cell from "../types/Cell";
import Ship from "../types/Ship";

type Orientation = "horizontal" | "vertical";
interface Position {
    x: number;
    y: number;
}

const getRandomOrientation = (): Orientation => {
    return Math.random() < 0.5 ? "horizontal" : "vertical";
};

const placeShip = (
    board: Cell[][],
    position: Position,
    shipSize: number,
    direction: Orientation
): void => {
    const { x, y } = position;

    if (!isValidPlacement(board, position, shipSize, direction)) {
        throw new Error("Invalid ship placement");
    }

    const setNeighbourForCell = (x: number, y: number): void => {
        if (board[x] && board[x][y] && board[x][y].status === "free") {
            board[x][y].status = "neighbour";
        }
    };

    if (direction === "horizontal") {
        setNeighbourForCell(x - 1, y);
        setNeighbourForCell(x - 1, y + 1);
        setNeighbourForCell(x - 1, y - 1);
        for (let i = x; i < x + shipSize; i++) {
            board[i][y].status = "occupied";
            setNeighbourForCell(i, y + 1);
            setNeighbourForCell(i, y - 1);
        }
        setNeighbourForCell(x + shipSize, y);
        setNeighbourForCell(x + shipSize, y + 1);
        setNeighbourForCell(x + shipSize, y - 1);
    } else {
        setNeighbourForCell(x, y - 1);
        setNeighbourForCell(x + 1, y - 1);
        setNeighbourForCell(x - 1, y - 1);
        for (let i = y; i < y + shipSize; i++) {
            board[x][i].status = "occupied";
            setNeighbourForCell(x + 1, i);
            setNeighbourForCell(x - 1, i);
        }
        setNeighbourForCell(x, y + shipSize);
        setNeighbourForCell(x + 1, y + shipSize);
        setNeighbourForCell(x - 1, y + shipSize);
    }
};

const isValidPlacement = (
    board: Cell[][],
    position: Position,
    shipSize: number,
    direction: Orientation
): boolean => {
    const { x, y } = position;
    const boardSize = board.length;
    if (direction === "horizontal") {
        for (let i = x; i < x + shipSize; i++) {
            if (
                ["occupied", "neighbour"].includes(board[i][y].status) ||
                i > boardSize
            )
                return false;
        }
    } else {
        for (let i = y; i < y + shipSize; i++) {
            if (
                ["occupied", "neighbour"].includes(board[x][i].status) ||
                i > boardSize
            )
                return false;
        }
    }

    return true;
};

const placeShipRandomly = (board: Cell[][], shipSize: number): void => {
    const boardSize = board.length * board.length;
    const direction = getRandomOrientation();

    let x, y;
    if (direction === "horizontal") {
        x = Math.floor(Math.random() * boardSize);
        y = Math.floor(Math.random() * (boardSize - shipSize + 1));
    } else {
        x = Math.floor(Math.random() * (boardSize - shipSize + 1));
        y = Math.floor(Math.random() * boardSize);
    }

    placeShip(board, { x, y }, shipSize, direction);
};

const initializeGameBoard = (boardSize: number): Cell[][] => {
    const board: Cell[][] = [];

    for (let i = 0; i < boardSize; i++) {
        const row: Cell[] = [];
        for (let j = 0; j < boardSize; j++) {
            row.push({ x: i, y: j, status: "free", shotFired: false });
        }
        board.push(row);
    }

    return board;
};

const getEffectivelyFilledBoard = (
    boardSize: number,
    ships: Ship[]
): Cell[][] => {
    const board = initializeGameBoard(boardSize);
    const pos: Position = { x: 0, y: 0 };

    for (const ship of ships) {
        for (let i = 0; i < ship.count; i++) {
            if (board.length - pos.y >= ship.size) {
                placeShip(board, pos, ship.size, "vertical");
            } else {
                pos.y = 0;
                pos.x += 2;
                placeShip(board, pos, ship.size, "vertical");
            }
            pos.y += ship.size + 1;
        }
    }

    return board;
};

const getRandomlyFilledBoard = (boardSize: number, ships: Ship[]): Cell[][] => {
    const board = initializeGameBoard(boardSize);

    for (const ship of ships) {
        for (let i = 0; i < ship.count; i++) {
            try {
                placeShipRandomly(board, ship.size);
            } catch (e) {
                i--;
            }
        }
    }

    return board;
};

export { getRandomlyFilledBoard, getEffectivelyFilledBoard };
