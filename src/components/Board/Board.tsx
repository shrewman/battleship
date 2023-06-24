import React, { useState } from 'react';
import Ship from '../../types/Ship';
import './Board.css'
import { getRandomlyFilledBoard, getEffectivelyFilledBoard } from '../../modules/GameLogic';
import CellContainer from '../CellContainer/CellContainer';

interface BoardProps {
    boardSize: number;
    ships: Ship[];
    setShips: React.Dispatch<React.SetStateAction<Ship[]>>;
}

const Board: React.FC<BoardProps> = ({ boardSize, ships, setShips }) => {

    // const board = getEffectivelyFilledBoard(boardSize, ships);
    const board = getRandomlyFilledBoard(boardSize, ships);

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