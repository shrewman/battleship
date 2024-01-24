import { useState } from "react";
import {
    MenuBoardType,
    GameBoardType,
    GameCellState,
    Player,
    GameCellType,
} from "../types";
import convertToGameBoard from "../utils/convertToGameBoard";
import { useMenuContext } from "../context/UseMenuContext";

interface GameProps {
    menuBoard: MenuBoardType;
}

const Game: React.FC<GameProps> = ({ menuBoard }) => {
    const { turn, setTurn } = useMenuContext();
    const [board, setBoard] = useState<GameBoardType>(
        convertToGameBoard(menuBoard)
    );

    const { opponentBoard } = useMenuContext();

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
                    <GameCell key={cellIndex} cell={cell} />
                ))}
            </div>
        </>
    );
};

type GameCellProps = {
    cell: GameCellType;
};

const GameCell: React.FC<GameCellProps> = ({ cell }) => {
    return (
        <div className={`cell cell-${cell.state} cell-${cell.belongsTo}`}></div>
    );
};

export default Game;
