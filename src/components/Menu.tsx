import Options from "./Options";
import { useState, useMemo } from "react";
import { useMenuContext } from "../context/UseMenuContext";
import { generateRandomBoard } from "../utils/gameLogic";
import { Board } from "../types";
import { MenuCellState } from "../types";

const Menu = () => {
    return (
        <>
            <MenuBoard />
            <Options />
        </>
    );
};

export default Menu;

const MenuBoard = () => {
    const { boardSize, shipCount } = useMenuContext();

    const [board, setBoard] = useState<Board>(
        generateRandomBoard(boardSize, shipCount)
    );

    const boardContainer = useMemo(() => {
        return board.map((cell, cellIndex) => (
            <MenuCell key={cellIndex} state={cell.state} />
        ));
    }, [board]);

    return (
        <>
            <p>{boardSize}</p>
            <p>
                {shipCount.map((ships) => (
                    <p key={ships.size}>
                        Size: {ships.size}, Count: {ships.count}
                    </p>
                ))}
            </p>
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
