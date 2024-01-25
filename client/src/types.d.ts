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

export type PlayerNum = 1 | 2;

export type Player = {
    number: PlayerNum;
    label: "You" | "Opponent";
};

export type MenuCellState = "free" | "ship";

export type MenuCellType = {
    position: Position;
    state: MenuCellState;
};

export type MenuBoardType = MenuCellType[];

export type GameCellState =
    | "free"
    | "ship"
    | "miss"
    | "hit"
    | "destroyed"
    | "unknown";

export type GameCellType = {
    position: Position;
    belongsTo: PlayerNum;
    state: GameCellState;
};

type GameBoardType = GameCellType[];
