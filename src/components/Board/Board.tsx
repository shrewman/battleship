import React, { useState } from 'react';
import './Board.css'
import CellContainer from '../CellContainer/CellContainer';
import Cell from '../../types/Cell';

interface BoardProps {
    board: Cell[][];
    isOpponentsBoard: boolean;
}

const Board: React.FC<BoardProps> = ({ board }) => {

    const boardContainer: JSX.Element[] = board.map((row, i) => (
        <div key={i} className="board-row">
            {row.map((cell, j) => (
                <CellContainer key={`${i}-${j}`} status={cell.status} shotFired={cell.shotFired} />
            ))}
        </div>
    ));

    return (
        <div className="board">
            {boardContainer}
        </div>
    );
}

export default Board;