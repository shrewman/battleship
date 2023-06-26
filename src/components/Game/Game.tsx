import React, { SetStateAction, useContext, useState } from "react";
import Board from "../Board/Board";
import './Game.css'
import Ship from '../../types/Ship';
import Cell from "../../types/Cell";
import { getRandomlyFilledBoard } from "../../modules/GameLogic";
import { TurnContext } from "../../context/TurnContext";

interface GameProps {
    board: Cell[][];
    setBoard: React.Dispatch<SetStateAction<Cell[][]>>;
    boardSize: number;
    ships: Ship[];
}

const Game: React.FC<GameProps> = ({ board, setBoard, boardSize, ships }) => {
    const { turn, passTurn }= useContext(TurnContext);

    return (
        <>
            <div>{turn === 'P1' ? 'Your turn' : "Opponent's turn"}</div>
            <div className="game-container">
                <div>Количество кораблей: {ships.map(ship => ship.size + ':' + ship.count + '\n')}</div>
                <div className="board-container">
                    <Board board={board} setBoard={setBoard} belongsTo="P1" />
                    <Board board={getRandomlyFilledBoard(boardSize, ships)} setBoard={setBoard} belongsTo="P2" />
                </div>
                <div>Количество кораблей: {ships.map(ship => ship.size + ':' + ship.count + '\n')}</div>
            </div>
        </>
    );
}

export default Game;