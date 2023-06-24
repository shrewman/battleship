interface Cell {
    row: number;
    col: number;
    status: 'free' | 'occupied' | 'destroyed';
    shotFired: boolean;
}

export default Cell;