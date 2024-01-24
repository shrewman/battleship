import { useState } from "react";
import {
    MenuBoardType,
    GameBoardType,
    GameCellState,
    Player,
} from "../types";
import convertToGameBoard from "../utils/convertToGameBoard";
import { useMenuContext } from "../context/UseMenuContext";

interface GameProps {
    menuBoard: MenuBoardType;
}

const Game: React.FC<GameProps> = ({ menuBoard }) => {
    const [board, setBoard] = useState<GameBoardType>(
        convertToGameBoard(menuBoard)
    );

    const { opponentBoard } = useMenuContext();
    const [turn, setTurn] = useState<Player>(Math.random() < 0.5 ? "P1" : "P2");

    return (
        <div className="game">
            <div>{turn}</div>
            <div className="game-boards">
                <GameBoard board={board} />
                {opponentBoard ? (
                    <GameBoard board={opponentBoard} />
                ) : (
                    "Error getting a board"
                )}
            </div>
        </div>
    );
};

type GameBoardProps = {
    board: GameBoardType;
};
const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
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
