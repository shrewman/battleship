import React from 'react';
import Cell from '../Cell/Cell';
import Ship from '../../types/Ship';
import './Board.css'

interface BoardProps {
    boardSize: number;
    ships: Ship[];
    setShips: React.Dispatch<React.SetStateAction<Ship[]>>;
}

const Board: React.FC<BoardProps> = ({ boardSize, ships, setShips }) => {
    const board: JSX.Element[] = [];

    for (let i = 0; i < boardSize; i++) {
        const row: JSX.Element[] = [];
        for (let j = 0; j < boardSize; j++) {
            row.push(<Cell key={`${i}-${j}`} status='free' shotFired={false} />);
        }
        board.push(<div key={i} className='board-row'>{row}</div>);
    }

    return (
        <div className="board">{board}</div>
    );
}

export default Board;