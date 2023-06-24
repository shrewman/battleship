import React from 'react';
import Cell from '../Cell/Cell';
import Ship from '../../types/Ship';
import './Board.css'
import getRandomlyFilledBoard from '../../modules/GameLogic';

interface BoardProps {
    boardSize: number;
    ships: Ship[];
    setShips: React.Dispatch<React.SetStateAction<Ship[]>>;
}

const Board: React.FC<BoardProps> = ({ boardSize, ships, setShips }) => {

    const randBoard = getRandomlyFilledBoard(boardSize, ships);

    const boardContainer: JSX.Element[] = randBoard.map((row, i) => (
        <div key={i} className="board-row">
            {row.map((cell, j) => (
                <Cell key={`${i}-${j}`} status={cell.status} shotFired={cell.shotFired} />
            ))}
        </div>
    ));

    return (
        <div className="board">{boardContainer}</div>
    );
}

export default Board;