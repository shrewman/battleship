import Options from "./Options";
import { useMemo, useEffect } from "react";
import { useMenuContext } from "../context/UseMenuContext";
import { MenuCellState } from "../types";
import { generateRandomBoard } from "../utils/gameLogic";
import { socket } from "../socket";

const Menu = () => {
    const { boardSize, shipCount, setBoard, setIsGameStarted } =
        useMenuContext();

    function connect() {
        socket.connect();
    }

    const shuffleBoard = () => {
        setBoard(generateRandomBoard(boardSize, shipCount));
    };

    const handleStartGame = () => {
        connect();
        setIsGameStarted(true);
    };

    return (
        <div className="menu">
            <MenuBoard />
            <div className="options">
                <Options />
                <div className="menu-buttons">
                    <button onClick={shuffleBoard}>⟳</button>
                    <button onClick={handleStartGame}>Старт</button>
                </div>
            </div>
        </div>
    );
};

export default Menu;

const MenuBoard = () => {
    const { boardSize, board, setBoard, shipCount } = useMenuContext();

    const boardContainer = useMemo(() => {
        return board.map((cell, cellIndex) => (
            <MenuCell key={cellIndex} state={cell.state} />
        ));
    }, [board]);

    useEffect(() => {
        setBoard(generateRandomBoard(boardSize, shipCount));
    }, [boardSize]);

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
                {boardContainer}
            </div>
        </>
    );
};

const MenuCell: React.FC<{ state: MenuCellState }> = ({ state }) => {
    return <div className={`cell cell-${state}`}></div>;
};
