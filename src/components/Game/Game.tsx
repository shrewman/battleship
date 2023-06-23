import React from "react";
import Board from "../Board/Board";
import './Game.css'

interface GameProps {
    boardSize: number;
    shipCount: number;
}

const Game: React.FC<GameProps> = ({ boardSize, shipCount }) => {
    return (
        <div className="game-container">
            <div>Количество кораблей: {shipCount}</div>
            <div className="board-container">
                <Board boardSize={boardSize} />
                <Board boardSize={boardSize} />
            </div>
            <div>Количество кораблей: {shipCount}</div>
        </div>
    );
}

export default Game;