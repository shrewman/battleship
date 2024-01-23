export type Orientation = "horizontal" | "vertical";

export type Position = {
    x: number;
    y: number;
};

export type Ship = {
    position: Position;
    size: number;
    orientation: Orientation;
};

export type ShipCount = {
    size: number;
    count: number;
};

export type Player = "P1" | "P2";

export type MenuCellState = "free" | "ship";

export type MenuCellType = {
    position: Position;
    state: MenuCellState;
};

export type MenuBoardType = MenuCellType[];


export type GameCellState = "free" | "ship" | "miss" | "hit" | "destroyed" | "unknown";

export type GameCellType = {
    position: Position;
    belongsTo: Player;
    state: MenuCellState;
};

type GameBoardType = GameCellType[];
