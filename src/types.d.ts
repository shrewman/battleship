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

type ShipCount = [
    { size: 5; count: number },
    { size: 4; count: number },
    { size: 3; count: number },
    { size: 2; count: number },
    { size: 1; count: number }
];
