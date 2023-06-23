interface Cell {
    row: number;
    col: number;
    status: 'free' | 'occupied' | 'destroyed';
}

export default Cell;