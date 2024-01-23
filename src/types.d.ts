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

export type MenuCellState = "free" | "ship";

export type MenuCell = {
    position: Position;
    state: MenuCellState
};

type ShipCount = {
    size: number;
    count: number;
}

type Board = MenuCell[];