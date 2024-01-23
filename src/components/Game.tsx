import { useState } from "react";
import {
    MenuBoardType,
    GameBoardType,
    GameCellType,
    ShipCount,
    GameCellState,
    Player,
} from "../types";
import GameContext from "../context/GameContext";
import { useGameContext } from "../context/UseGameContext";

interface GameProps {
    menuBoard: MenuBoardType;
    shipCount: ShipCount[];
}

const Game: React.FC<GameProps> = ({ menuBoard, shipCount }) => {
    const convertToGameBoard = (board: MenuBoardType) => {
        return board.map((menuCell) => {
            const { position, state } = menuCell;
            const gameCell: GameCellType = {
                position,
                belongsTo: "P1",
                state,
            };
            return gameCell;
        });
    };

    const [gameShipCount, setGameShipCount] = useState<ShipCount[]>(shipCount);
    const [board, setBoard] = useState<GameBoardType>(
        convertToGameBoard(menuBoard)
    );
    const [turn, setTurn] = useState<Player>(Math.random() < 0.5 ? "P1" : "P2");

    return (
        <GameContext.Provider
            value={{ gameShipCount, setGameShipCount, board, setBoard }}
        >
            <div className="game">
                <div>{turn}</div>
                <div className="game-boards">
                    <GameBoard />
                    <GameBoard />
                </div>
            </div>
        </GameContext.Provider>
    );
};

const GameBoard = () => {
    const { board, setBoard } = useGameContext();
    const boardSize = Math.sqrt(board.length);

    return (
        <>
            <div
                className="board"
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
                    gridTemplateRows: `repeat(${boardSize}, 1fr)`,
                }}
            >
                {board.map((cell, cellIndex) => (
                    <GameCell key={cellIndex} state={cell.state} />
                ))}
            </div>
        </>
    );
};

type GameCellProps = {
    state: GameCellState;
};

const GameCell: React.FC<GameCellProps> = ({ state }) => {

    return <div className={`cell cell-${state}`}></div>;
};

export default Game;
