import { SetStateAction, Dispatch, useEffect, useState, useRef } from "react";
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
    }, []);

    return (
        <div className="game">
            <div>You: P{player.number}</div>
            <div>Turn: P{turn}</div>
            <div className="game-boards">
                <GameBoard
                    board={board}
                    setBoard={setBoard}
                    belongsTo={player.number}
                />
                {opponentBoard && setOpponentBoard ? (
                    <GameBoard
                        board={opponentBoard}
                        setBoard={setOpponentBoard}
                        belongsTo={player.number === 1 ? 2 : 1}
                    />
                ) : (
                    "Error getting a board"
                )}
            </div>
        </div>
    );
};

type GameBoardProps = {
    board: GameBoardType;
    setBoard: Dispatch<SetStateAction<GameBoardType>>;
    belongsTo: PlayerNum;
};
const GameBoard: React.FC<GameBoardProps> = ({
    board,
    setBoard,
    belongsTo,
}) => {
    const boardSize = Math.sqrt(board.length);
    const { turn, player } = useMenuContext();
    const { room } = useRoomContext();

    const fire = (position: Position) => {
        if (turn === player.number && belongsTo !== player.number) {
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
        fire(position);
    };

    return (
        <div
            onClick={handleFire}
            className={`cell cell-${cell.state} cell-${cell.belongsTo}`}
        ></div>
    );
};

export default Game;
