interface Cell {
    x: number;
    y: number;
    status: 'free' | 'occupied' | 'neighbour' | 'destroyed';
    shotFired: boolean;
}

export default Cell;