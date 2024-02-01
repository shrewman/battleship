import { Board, Ship, ShipCount } from "../types";
import isValidShipPlacement from "./isValidShipPlacement";

const { random, floor } = Math;

function getRandomNumber(min: number, max: number) {
    return floor(random() * (max - min + 1)) + min;
}

function placeShip(board: Board, ship: Ship) {
    const { x, y } = ship.position;

    for (let i = 0; i < ship.size; i++) {
        const cellIndex = board.findIndex(
            (cell) =>
                cell.position.x ===
                    x + (ship.orientation === "horizontal" ? i : 0) &&
                cell.position.y ===
                    y + (ship.orientation === "vertical" ? i : 0)
        );
        board[cellIndex].state = "ship";
    }
}

function initEmptyBoard(boardSize: number) {
    const board: Board = [];
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            board.push({ position: { x, y }, state: "free" });
        }
    }
    return board;
}

export function generateRandomBoard(
    boardSize: number,
    shipCounts: ShipCount[]
): Board {
    const board: Board = initEmptyBoard(boardSize);

    shipCounts.forEach((shipCount) => {
        for (let i = 0; i < shipCount.count; i++) {
            let ship: Ship;
            do {
                ship = {
                    size: shipCount.size,
                    orientation: random() < 0.5 ? "horizontal" : "vertical",
                    position: { x: 0, y: 0 },
                };
                ship.position.x = getRandomNumber(0, 9);
                ship.position.y = getRandomNumber(0, 9);
            } while (!isValidShipPlacement(board, ship));
            placeShip(board, ship);
        }
    });

    return board;
}
