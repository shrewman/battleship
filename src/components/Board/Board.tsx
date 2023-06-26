import React, { useMemo, useState } from 'react';
import './Board.css'
import CellContainer from '../CellElement/CellElement';
import Cell from '../../types/Cell';

interface BoardProps {
    board: Cell[][];
    belongsTo: 'P1' | 'P2';
}

const Board: React.FC<BoardProps> = ({ board, belongsTo }) => {

    const [boardState, setBoardState] = useState<Cell[][]>(board);

    const boardContainer = useMemo(() => {
        const handleCellFire = (x: number, y: number): void => {
            if (!board[x][y].shotFired) {
                const updatedBoard = [...board];
                updatedBoard[x][y].shotFired = true;
                setBoardState(updatedBoard);
                // const updatedBoard = [...boardState];
                // updatedBoard[x][y].shotFired = true;
                // setBoardState(updatedBoard);
            }
        };

        return board.map((row, i) => (
            <div key={i} className="board-row">
                {row.map((cell, j) => (
                    <CellContainer
                        key={`${i}-${j}`}
                        position={{ x: i, y: j }}
                        status={cell.status}
                        belongsTo={belongsTo}
                        shotFired={cell.shotFired}
                        onFire={handleCellFire}
                    />
                ))}
            </div>
        ));
    }, [board, boardState, belongsTo]);

    return (
        <div className="board">
            {boardContainer}
        </div>
    );
}

export default Board;