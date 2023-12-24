import React, { useMemo } from 'react';
import './MenuBoard.css'
import CellElement from '../CellElement/CellElement';
import Cell from '../../types/Cell';

interface BoardProps {
    board: Cell[][];
}

const Board: React.FC<BoardProps> = ({ board }) => {
    const boardContainer = useMemo(() => {
        return board.map((row, i) => (
            <div key={i} className="board-row">
                {row.map((cell, j) => (
                    <CellElement
                        key={`${i}-${j}`}
                        position={{ x: i, y: j }}
                        state={cell.state}
                        belongsTo={'P1'}
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