import React, { useMemo } from 'react';
import './MenuBoard.css'
import CellContainer from '../CellElement/CellElement';
import Cell from '../../types/Cell';

interface BoardProps {
    board: Cell[][];
}

const Board: React.FC<BoardProps> = ({ board }) => {
    const boardContainer = useMemo(() => {
        return board.map((row, i) => (
            <div key={i} className="board-row">
                {row.map((cell, j) => (
                    <CellContainer
                        key={`${i}-${j}`}
                        position={{ x: i, y: j }}
                        status={cell.status}
                        belongsTo={'P1'}
                        shotFired={cell.shotFired}
                        onFire={() => { '' }}
                    />
                ))}
            </div>
        ));
    }, [board]);

    return (
        <div className="board">
            {boardContainer}
        </div>
    );
}

export default Board;