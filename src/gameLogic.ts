import { Ship, Board, Position } from "./types";

export const initEmptyBoard = (boardSize: number) => {
    const board: Board = [];
    for (let i = 0; i < boardSize; i++) {
        board.push([]);
        for (let j = 0; j < boardSize; j++) {
            board[i].push({ position: { x: i, y: j }, state: "free" });
        }
    }
    return board;
};

const isShipNearby = (board: Board, pos: Position) => {
    const { x, y } = pos;

    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            // Check if the current position is within the board boundaries
            if (i >= 0 && i < board.length && j >= 0 && j < board[i].length) {
                if (board[i][j].state === "ship") {
                    return true;
                }
            }
        }
    }
    return false;
};

const isValidShipPlacement = (board: Board, ship: Ship) => {
    const { orientation, size, position } = ship;
    const { x, y } = position;

    if (orientation === "horizontal") {
        for (let i = x; i < x + size; i++) {
            if (isShipNearby(board, { x: i, y })) {
                return false;
            }
        }
    }

    if (orientation === "vertical") {
        for (let i = y; i < y + size; i++) {
            if (isShipNearby(board, { x, y: i })) {
                return false;
            }
        }
    }

    return true;
};

type ShipPositions = Record<number, { x: number; y: number }[]>;

const placeShip = (board: Board, ship: Ship) => {
    const { orientation, size, position } = ship;
    const { x, y } = position;

    if(orientation === 'horizontal') {
        for(let i = x; i < x + size; i++) {
            board[i][y].state = "ship";
        }
    } else {
        for(let i = y; i < y + size; i++) {
            board[x][i].state = "ship";
        }
    }
};

export const getRandomlyFilledBoard = (boardSize: number, ships: Ship[]) => {
    const board = initEmptyBoard(boardSize)
    const invalidPlacements: ShipPositions = {
        5: [],
        4: [],
        3: [],
        2: [],
        1: [],
    };

    const random = (x = 0, y = board.length) =>
        Math.floor(Math.random() * (y - x + 1)) + x;

    const isPositionInShip = (size: number, pos: Position) => {
        const positions = invalidPlacements[size];
        return positions.some((p) => p.x === pos.x && p.y === pos.y);
    };

    for (let i = 0; i < ships.length; i++) {
        const ship = ships[i];
        const randomPos = { x: random(), y: random() };
        if (isPositionInShip(ship.size, randomPos)) {
            i--;
            continue;
        }
        if (isValidShipPlacement(board, ship)) {
            placeShip(board, ship);
        } else {
            invalidPlacements[ship.size].push(randomPos);
        }
    }
};
