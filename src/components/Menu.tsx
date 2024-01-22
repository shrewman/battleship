import Options from "./Options";
import { useState, useMemo } from "react";
import { useMenuContext } from "../context/UseMenuContext";
import { getRandomlyFilledBoard } from "../gameLogic";
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

    const [board, setBoard] = useState(
        getRandomlyFilledBoard(boardSize, shipCount)
    );

    const boardContainer = useMemo(() => {
        return board.map((column, columnIndex) => (
            <div key={columnIndex} className="board-row">
                {column.map((cell, cellIndex) => (
                    <MenuCell key={cellIndex} state={cell.state} />
                ))}
            </div>
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
            {boardContainer}
        </>
    );
};

const MenuCell: React.FC<{ state: MenuCellState }> = ({ state }) => {
    return <div className={`cell cell-${state}`}></div>;
};
