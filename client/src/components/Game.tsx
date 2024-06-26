import { useEffect, useState } from "react";
import {
    MenuBoardType,
    GameBoardType,
    GameCellType,
    PlayerNum,
    Position,
} from "../types";
import convertToGameBoard from "../utils/convertToGameBoard";
import { useMenuContext } from "../context/UseMenuContext";
import { socket } from "../socket";
import { useRoomContext } from "../context/UseRoomContext";
import _ from "lodash";

interface GameProps {
    menuBoard: MenuBoardType;
}

const Game: React.FC<GameProps> = ({ menuBoard }) => {
    const [score, setScore] = useState(0);
    const { turn, setTurn } = useMenuContext();
    const [board, setBoard] = useState<GameBoardType>(
        convertToGameBoard(menuBoard)
    );

    const { opponentBoard, setOpponentBoard, player } = useMenuContext();

    useEffect(() => {
        socket.on("fire_result", (cell: GameCellType, turn: PlayerNum) => {
            const update = (prev: GameBoardType) => {
                return prev.map((item) => {
                    if (_.isEqual(cell.position, item.position)) {
                        return { ...item, state: cell.state };
                    }
                    return item;
                });
            };

            if (cell.belongsTo === player.number) {
                setBoard((prevBoard) => update(prevBoard));
            } else {
                setOpponentBoard((prevBoard) => update(prevBoard));
            }
            setTurn(turn);
        });
        socket.on("update_score", (score) => {
            setScore(score);
        });
        socket.on("game_result", (results) => {
            const { won, misses, hits, score } = results;
            alert((won ? "You won!" : "You lost.") + `\nMisses: ${misses}\nHits: ${hits}\nScore: ${score}` );
        });
    }, []);

    return (
        <div className="flex justify-center items-center gap-10 bg-slate-700 px-10 py-5 rounded-xl">
            <div>
                <div>You: P{player.number}</div>
                <GameBoard board={board} belongsTo={player.number} />
            </div>
            <div className="grid gap-10">
                <div>Turn: P{turn}</div>
                <div>Score: {score}</div>
            </div>
            {opponentBoard ? (
                <div>
                    <div>Opponent: P{player.number === 1 ? 2 : 1}</div>
                    <GameBoard
                        board={opponentBoard}
                        belongsTo={player.number === 1 ? 2 : 1}
                    />
                </div>
            ) : (
                "Error getting a board"
            )}
        </div>
    );
};

type GameBoardProps = {
    board: GameBoardType;
    belongsTo: PlayerNum;
};
const GameBoard: React.FC<GameBoardProps> = ({ board, belongsTo }) => {
    const clickSound = new Audio("./src/assets/explosion.mp3");
    const boardSize = Math.sqrt(board.length);
    const { turn, player } = useMenuContext();
    const { room } = useRoomContext();

    const fire = (position: Position) => {
        if (turn === player.number && belongsTo !== player.number) {
            clickSound.play();
            socket.emit("fire", room, position);
        }
    };

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
                    <GameCell key={cellIndex} cell={cell} fire={fire} />
                ))}
            </div>
        </>
    );
};

type GameCellProps = {
    cell: GameCellType;
    fire: (position: Position) => void;
};

const GameCell: React.FC<GameCellProps> = ({ cell, fire }) => {
    const { position } = cell;

    const handleFire = () => {
        if (cell.state !== "hit" && cell.state !== "miss") fire(position);
    };

    return (
        <div
            onClick={handleFire}
            className={`cell cell-${cell.state} cell-${cell.belongsTo}`}
        ></div>
    );
};

export default Game;
