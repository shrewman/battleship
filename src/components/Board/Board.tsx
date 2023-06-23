import React from 'react';
import Cell from '../Cell/Cell';
import './Board.css'

interface BoardProps {
    boardSize: number;
}

const Board: React.FC<BoardProps> = ({ boardSize }) => {
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