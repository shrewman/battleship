import React from "react";
import Board from "../Board/Board";
import './Game.css'
import Ship from '../../types/Ship';
import Cell from "../../types/Cell";
import { getRandomlyFilledBoard } from "../../modules/GameLogic";

interface GameProps {
    board: Cell[][];
    boardSize: number;
    ships: Ship[];
}

const Game: React.FC<GameProps> = ({ board, boardSize, ships }) => {
    return (
        <div className="game-container">
            <div>Количество кораблей: {ships.map(ship => ship.size + ':' + ship.count + '\n')}</div>
            <div className="board-container">
                <Board board={board} />
                <Board board={getRandomlyFilledBoard(boardSize, ships)} />
            </div>
            <div>Количество кораблей: {ships.map(ship => ship.size + ':' + ship.count + '\n')}</div>
        </div>
    );
}

export default Game;