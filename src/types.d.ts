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