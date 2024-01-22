import Options from "./Options";
import { useState } from "react";
import { useMenuContext } from "../context/UseMenuContext";
import { initEmptyBoard } from "../gameLogic";
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

    const [board, setBoard] = useState(initEmptyBoard(boardSize));

    return (
        <>
            <p>{boardSize}</p>
            <p>
                {Object.entries(shipCount).map(([size, count]) => (
                    <p key={size}>
                        Size: {size}, Count: {count}
                    </p>
                ))}
            </p>
            {board.map((column, columnIndex) => (
                <div key={columnIndex} className="board-column">
                    {column.map((cell, cellIndex) => (
                        <MenuCell key={cellIndex} state={cell.state} />
                    ))}
                </div>
            ))}
        </>
    );
};

const MenuCell: React.FC<{ state: MenuCellState }> = ({ state }) => {
    return <div className={`cell cell-${state}`}></div>;
};
