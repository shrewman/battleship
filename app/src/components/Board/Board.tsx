import React, { useContext, useMemo, useState } from 'react';
import './Board.css'
import CellElement from '../CellElement/CellElement';
import Cell from '../../types/Cell';
import { TurnContext } from '../../context/TurnContext';

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
            if (boardState[x][y].shotFired) return;

            const updatedBoard = [...boardState];
            updatedBoard[x][y].shotFired = true;
            setBoardState(updatedBoard);
            passTurn();
        };

        return boardState.map((row, i) => (
            <div key={i} className="board-row">
                {row.map((cell, j) => (
                    <CellElement
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
    }, [turn, boardState, passTurn, belongsTo]);

    return (
        <div className="board">
            {boardContainer}
        </div>
    );
}

export default Board;