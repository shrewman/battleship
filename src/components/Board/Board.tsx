import React, { SetStateAction, useContext, useMemo, useState } from 'react';
import './Board.css'
import CellContainer from '../CellElement/CellElement';
import Cell from '../../types/Cell';
import { TurnContext } from '../../context/TurnContext';

interface BoardProps {
    board: Cell[][];
    setBoard: React.Dispatch<SetStateAction<Cell[][]>>;
    belongsTo: 'P1' | 'P2';
}

const Board: React.FC<BoardProps> = ({ board, setBoard, belongsTo }) => {
    const [boardState, setBoardState] = useState<Cell[][]>(board);
    const { turn, passTurn } = useContext(TurnContext);

    const boardContainer = useMemo(() => {
        const handleCellFire = (x: number, y: number): void => {
            if (turn !== 'P1') return;
            if (board[x][y].shotFired) return;

            const updatedBoard = [...board];
            updatedBoard[x][y].shotFired = true;
            setBoardState(updatedBoard);
            passTurn();
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
    }, [board, turn, passTurn, belongsTo]);

    return (
        <div className="board">
            {boardContainer}
        </div>
    );
}

export default Board;