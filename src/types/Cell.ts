interface Cell {
    x: number;
    y: number;
    status: 'free' | 'occupied' | 'neighbour' | 'destroyed' | 'fired';
    shotFired: boolean;
}

export default Cell;