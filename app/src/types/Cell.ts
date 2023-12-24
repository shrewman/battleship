interface Cell {
    state: 'empty' | 'ship' | 'neighbour' | 'hit' | 'unknown';
}

export default Cell;