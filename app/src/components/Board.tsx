import React, { useContext, useMemo, useState } from 'react';
import CellElement from './CellElement';
import Cell from '../types/Cell';
import { TurnContext } from '../context/TurnContext';

interface BoardProps {
    board: Cell[][];
    belongsTo: 'P1' | 'P2';
}

const Board: React.FC<BoardProps> = ({ board, belongsTo }) => {
    const [boardState, setBoardState] = useState<Cell[][]>([...board]);
    const { turn, passTurn } = useContext(TurnContext);

    const boardContainer = useMemo(() => {
        const handleCellFire = (x: number, y: number): void => {
            if (turn !== 'P1') return;
            if (boardState[x][y].state !== 'unknown') return;

            const updatedBoard = [...boardState];
            setBoardState(updatedBoard);
            passTurn();
        };

        return boardState.map((row, i) => (
            <div key={i} className="board-row">
                {row.map((cell, j) => (
                    <CellElement
                        key={`${i}-${j}`}
                        position={{ x: i, y: j }}
                        state={cell.state}
                        belongsTo={belongsTo}
                        onFire={handleCellFire}
                    />
                ))}
            </div>
        ));
    }, [turn, boardState, passTurn, belongsTo]);

    return (
        <div className="board">
            {boardContainer}
        </div>
    );
}

export default Board;