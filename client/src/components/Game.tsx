import { SetStateAction, Dispatch, useEffect, useState } from "react";
import { MenuBoardType, GameBoardType, GameCellType } from "../types";
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

    const { opponentBoard, setOpponentBoard } = useMenuContext();

    useEffect(() => {
        socket.on("fire_result", (cell: GameCellType) => {
            const update = (prev: GameBoardType) => {
                return prev.map((item) => {
                    if (_.isEqual(cell.position, item.position)) {
                        return { ...item, state: cell.state };
                    }
                    return item;
                });
            };

            if (cell.belongsTo === "P1") {
                setBoard((prevBoard) => update(prevBoard));
            } else {
                setOpponentBoard((prevBoard) => update(prevBoard));
            }
        });
    }, []);

    return (
        <div className="game">
            <div>{turn}</div>
            <div className="game-boards">
                <GameBoard board={board} setBoard={setBoard} />
                {opponentBoard && setOpponentBoard ? (
                    <GameBoard
                        board={opponentBoard}
                        setBoard={setOpponentBoard}
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
};
const GameBoard: React.FC<GameBoardProps> = ({ board, setBoard }) => {
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
    const { turn, setTurn } = useMenuContext();
    const { room } = useRoomContext();
    const passTurn = () => turn === "P1" && setTurn("P2");

    const { belongsTo, position } = cell;

    const fire = () => {
        if (turn === "P1" && belongsTo === "P2") {
            socket.emit("fire", room, position);
            passTurn();
        }
    };

    return (
        <div
            onClick={fire}
            className={`cell cell-${cell.state} cell-${cell.belongsTo}`}
        ></div>
    );
};

export default Game;
