export type Position = {
    x: number;
    y: number;
};

export type Ship = {
    position: Position;
    size: number;
    orientation: "horizontal" | "vertical";
};

export type MenuCell = {
    position: Position;
    state: "free" | "ship";
};

type ShipCount = {
    [key in 1 | 2 | 3 | 4 | 5]: number;
}
