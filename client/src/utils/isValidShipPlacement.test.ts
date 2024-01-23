import { it, expect } from "vitest";
import isValidShipPlacement from "./isValidShipPlacement";
import { Board, Ship } from "../types";

// f - free cell
// p - placing ship
// s - ship
// x - intersection of ships
// ┏━━━━━━━━━━━━━┓
// ┃ p p p f f f ┃
// ┃ f f f f f s ┃
// ┃ f f f s f s ┃
// ┃ f f f s f s ┃
// ┃ s f f f f s ┃
// ┗━━━━━━━━━━━━━┛

it("should return true when ship has horizontal orientation and size smaller than the board size", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "free" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "free" },

        { position: { x: 2, y: 0 }, state: "free" },
        { position: { x: 2, y: 1 }, state: "free" },
        { position: { x: 2, y: 2 }, state: "free" },
    ];

    const ship: Ship = {
        position: { x: 0, y: 0 },
        size: 2,
        orientation: "horizontal",
    };

    // ┏━━━━━━━┓
    // ┃ p p f ┃
    // ┃ f f f ┃
    // ┃ f f f ┃
    // ┗━━━━━━━┛

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(true);
});

it("should return true when a ship has horizontal orientation and size is exactly as big as the board size", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "free" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "free" },

        { position: { x: 2, y: 0 }, state: "free" },
        { position: { x: 2, y: 1 }, state: "free" },
        { position: { x: 2, y: 2 }, state: "free" },
    ];

    const ship: Ship = {
        position: { x: 0, y: 0 },
        size: 3,
        orientation: "horizontal",
    };

    // ┏━━━━━━━┓
    // ┃ p p p ┃
    // ┃ f f f ┃
    // ┃ f f f ┃
    // ┗━━━━━━━┛

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(true);
});

it("should return false when a ship has horizontal orientation and size bigger than the board size", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "free" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "free" },

        { position: { x: 2, y: 0 }, state: "free" },
        { position: { x: 2, y: 1 }, state: "free" },
        { position: { x: 2, y: 2 }, state: "free" },
    ];

    const ship: Ship = {
        position: { x: 0, y: 0 },
        size: 4,
        orientation: "horizontal",
    };

    // ┏━━━━━━━┓
    // ┃ p p p ┃ p
    // ┃ f f f ┃
    // ┃ f f f ┃
    // ┗━━━━━━━┛

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(false);
});

// should return true when given a valid board and a ship with vertical orientation and size smaller than the board size
it("should return true when a ship has vertical orientation and size smaller than the board size", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "free" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "free" },

        { position: { x: 2, y: 0 }, state: "free" },
        { position: { x: 2, y: 1 }, state: "free" },
        { position: { x: 2, y: 2 }, state: "free" },
    ];
    const ship: Ship = {
        position: { x: 0, y: 0 },
        size: 2,
        orientation: "vertical",
    };

    // ┏━━━━━━━┓
    // ┃ p f f ┃
    // ┃ p f f ┃
    // ┃ f f f ┃
    // ┗━━━━━━━┛

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(true);
});

it("should return true when a ship has vertical orientation and size is exactly as big as the board size", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "free" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "free" },

        { position: { x: 2, y: 0 }, state: "free" },
        { position: { x: 2, y: 1 }, state: "free" },
        { position: { x: 2, y: 2 }, state: "free" },
    ];
    const ship: Ship = {
        position: { x: 0, y: 0 },
        size: 3,
        orientation: "vertical",
    };

    // ┏━━━━━━━┓
    // ┃ p f f ┃
    // ┃ p f f ┃
    // ┃ p f f ┃
    // ┗━━━━━━━┛

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(true);
});

it("should return false when a ship has vertical orientation and size bigger than the board size", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "free" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "free" },

        { position: { x: 2, y: 0 }, state: "free" },
        { position: { x: 2, y: 1 }, state: "free" },
        { position: { x: 2, y: 2 }, state: "free" },
    ];
    const ship: Ship = {
        position: { x: 0, y: 0 },
        size: 4,
        orientation: "vertical",
    };

    // ┏━━━━━━━┓
    // ┃ p f f ┃
    // ┃ p f f ┃
    // ┃ p f f ┃
    // ┗━━━━━━━┛
    //   p

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(false);
});

it("should return true when placed ship is not on the way of current horizontal ship", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "ship" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "ship" },

        { position: { x: 2, y: 0 }, state: "free" },
        { position: { x: 2, y: 1 }, state: "free" },
        { position: { x: 2, y: 2 }, state: "ship" },
    ];
    const ship: Ship = {
        position: { x: 0, y: 0 },
        size: 3,
        orientation: "horizontal",
    };

    // ┏━━━━━━━┓
    // ┃ p p p ┃
    // ┃ f f f ┃
    // ┃ s s s ┃
    // ┗━━━━━━━┛

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(true);
});

it("should return true when placed ship is not on the way of current vertical ship", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "free" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "free" },

        { position: { x: 2, y: 0 }, state: "ship" },
        { position: { x: 2, y: 1 }, state: "ship" },
        { position: { x: 2, y: 2 }, state: "ship" },
    ];
    const ship: Ship = {
        position: { x: 0, y: 0 },
        size: 3,
        orientation: "vertical",
    };

    // ┏━━━━━━━┓
    // ┃ p f s ┃
    // ┃ p f s ┃
    // ┃ p f s ┃
    // ┗━━━━━━━┛

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(true);
});

it("should return false when placed ship is on the way of current horizontal ship", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "free" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "free" },

        { position: { x: 2, y: 0 }, state: "ship" },
        { position: { x: 2, y: 1 }, state: "ship" },
        { position: { x: 2, y: 2 }, state: "ship" },
    ];

    // ┏━━━━━━━┓
    // ┃ p p x ┃
    // ┃ f f s ┃
    // ┃ f f s ┃
    // ┗━━━━━━━┛

    const ship: Ship = {
        position: { x: 0, y: 0 },
        size: 3,
        orientation: "horizontal",
    };
    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(false);
});

it("should return false when placed ship is on the way of current vertical ship", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "ship" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "ship" },

        { position: { x: 2, y: 0 }, state: "free" },
        { position: { x: 2, y: 1 }, state: "free" },
        { position: { x: 2, y: 2 }, state: "ship" },
    ];
    const ship: Ship = {
        position: { x: 0, y: 0 },
        size: 3,
        orientation: "vertical",
    };

    // ┏━━━━━━━┓
    // ┃ p f f ┃
    // ┃ p f f ┃
    // ┃ x s s ┃
    // ┗━━━━━━━┛

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(false);
});

it("should return false when placed ship is diagonally adjacent to current horizontal ship", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "free" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "free" },

        { position: { x: 2, y: 0 }, state: "free" },
        { position: { x: 2, y: 1 }, state: "ship" },
        { position: { x: 2, y: 2 }, state: "ship" },
    ];
    const ship: Ship = {
        position: { x: 0, y: 0 },
        size: 2,
        orientation: "horizontal",
    };

    // ┏━━━━━━━┓
    // ┃ p p f ┃
    // ┃ f f s ┃
    // ┃ f f s ┃
    // ┗━━━━━━━┛

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(false);
});

it("should return false when placed ship is diagonally adjacent to current vertical ship", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "free" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "ship" },

        { position: { x: 2, y: 0 }, state: "free" },
        { position: { x: 2, y: 1 }, state: "free" },
        { position: { x: 2, y: 2 }, state: "ship" },
    ];
    const ship: Ship = {
        position: { x: 0, y: 0 },
        size: 2,
        orientation: "vertical",
    };

    // ┏━━━━━━━┓
    // ┃ p f f ┃
    // ┃ p f f ┃
    // ┃ f s s ┃
    // ┗━━━━━━━┛

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(false);
});

it("should return false when placed ship is out of bounds", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "free" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "free" },

        { position: { x: 2, y: 0 }, state: "free" },
        { position: { x: 2, y: 1 }, state: "free" },
        { position: { x: 2, y: 2 }, state: "free" },
    ];
    const ship: Ship = {
        position: { x: 4, y: 0 },
        size: 3,
        orientation: "vertical",
    };

    // ┏━━━━━━━┓
    // ┃ f f f ┃ p
    // ┃ f f f ┃ p
    // ┃ f f f ┃ p
    // ┗━━━━━━━┛

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(false);
});

it("should return false when placed ship is out of bounds", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "free" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "free" },

        { position: { x: 2, y: 0 }, state: "free" },
        { position: { x: 2, y: 1 }, state: "free" },
        { position: { x: 2, y: 2 }, state: "free" },
    ];
    const ship: Ship = {
        position: { x: -1, y: 0 },
        size: 3,
        orientation: "vertical",
    };

    //   ┏━━━━━━━┓
    // p ┃ f f f ┃
    // p ┃ f f f ┃
    // p ┃ f f f ┃
    //   ┗━━━━━━━┛

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(false);
});

it("should return false when placed ship is out of bounds", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "free" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "free" },

        { position: { x: 2, y: 0 }, state: "free" },
        { position: { x: 2, y: 1 }, state: "free" },
        { position: { x: 2, y: 2 }, state: "free" },
    ];
    const ship: Ship = {
        position: { x: 0, y: 3 },
        size: 3,
        orientation: "horizontal",
    };

    // ┏━━━━━━━┓
    // ┃ f f f ┃
    // ┃ f f f ┃
    // ┃ f f f ┃
    // ┗━━━━━━━┛
    //   p p p

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(false);
});

it("should return false when placed ship is out of bounds", () => {
    const board: Board = [
        { position: { x: 0, y: 0 }, state: "free" },
        { position: { x: 0, y: 1 }, state: "free" },
        { position: { x: 0, y: 2 }, state: "free" },

        { position: { x: 1, y: 0 }, state: "free" },
        { position: { x: 1, y: 1 }, state: "free" },
        { position: { x: 1, y: 2 }, state: "free" },

        { position: { x: 2, y: 0 }, state: "free" },
        { position: { x: 2, y: 1 }, state: "free" },
        { position: { x: 2, y: 2 }, state: "free" },
    ];
    const ship: Ship = {
        position: { x: 0, y: -1 },
        size: 3,
        orientation: "horizontal",
    };

    //   p p p
    // ┏━━━━━━━┓
    // ┃ f f f ┃
    // ┃ f f f ┃
    // ┃ f f f ┃
    // ┗━━━━━━━┛

    const result = isValidShipPlacement(board, ship);
    expect(result).toBe(false);
});
