import React, { useContext, useState } from "react";
import Board from "../Board/Board";
import './Game.css'
import Ship from '../../types/Ship';
import Cell from "../../types/Cell";
import { getRandomlyFilledBoard } from "../../modules/GameLogic";
import { TurnContext } from "../../context/TurnContext";

interface GameProps {
    board: Cell[][];
    boardSize: number;
    ships: Ship[];
}

const Game: React.FC<GameProps> = ({ board, boardSize, ships }) => {
    const turn = useContext(TurnContext);

    return (
        <>
            <div>{turn === 'P1' ? 'Your turn' : "Opponent's turn"}</div>
            <div className="game-container">
                <div>Количество кораблей: {ships.map(ship => ship.size + ':' + ship.count + '\n')}</div>
                <div className="board-container">
                    <Board board={board} belongsTo="P1" />
                    <Board board={getRandomlyFilledBoard(boardSize, ships)} belongsTo="P2" />
                </div>
                <div>Количество кораблей: {ships.map(ship => ship.size + ':' + ship.count + '\n')}</div>
            </div>
        </>
    );
}

export default Game;