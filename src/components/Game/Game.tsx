import React from "react";
import Board from "../Board/Board";
import './Game.css'
import Ship from '../../types/Ship';

interface GameProps {
    boardSize: number;
    ships: Ship[];
}

const Game: React.FC<GameProps> = ({ boardSize, ships}) => {
    return (
        <div className="game-container">
            <div>Количество кораблей: {ships.map(ship => ship.size + ':' + ship.count + '\n')}</div>
            <div className="board-container">
                <Board boardSize={boardSize} />
                <Board boardSize={boardSize} />
            </div>
            <div>Количество кораблей: {ships.map(ship => ship.size + ':' + ship.count + '\n')}</div>
        </div>
    );
}

export default Game;