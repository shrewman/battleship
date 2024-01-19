import React, { useEffect, useState } from "react";
import Ship from "../../types/Ship";
import ShipCountSelector from "./ShipCountSelector";
import { getRandomlyFilledBoard } from "../../modules/GameLogic";
import Cell from "../../types/Cell";
import MenuBoard from "./MenuBoard";

interface MenuProps {
    handleStartGame: (
        board: Cell[][],
        boardSize: number,
        ships: Ship[]
    ) => void;
}

const Menu: React.FC<MenuProps> = ({ handleStartGame: startGame }) => {
    const [ships, setShips] = useState<Ship[]>([
        { size: 5, count: 0 },
        { size: 4, count: 0 },
        { size: 3, count: 0 },
        { size: 2, count: 0 },
        { size: 1, count: 0 },
    ]);
    const [boardSize, setBoardSize] = useState<number>(10);
    const [board, setBoard] = useState<Cell[][]>([]);

    useEffect(() => {
        setBoard(getRandomlyFilledBoard(boardSize, ships));
    }, [boardSize, ships]);

    const handleBoardRefresh = () => {
        setBoard(getRandomlyFilledBoard(boardSize, ships));
    };

    const handleShipCountChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        index: number
    ) => {
        const updatedShips = [...ships];
        updatedShips[index].count = parseInt(e.target.value);
        setShips(updatedShips);
    };

    const handleBoardSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBoardSize(parseInt(e.target.value));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startGame(board, boardSize, ships);
    };

    return (
        <div className="menu-container">
            <MenuBoard board={board} />
            <form className="ships-form" onSubmit={handleSubmit}>
                <div className="ship-count-selector">
                    <label>
                        Розмір поля:
                        <select
                            value={boardSize}
                            onChange={(e) => {
                                handleBoardSizeChange(e);
                            }}
                        >
                            <option value={7}>8x8</option>
                            <option value={10}>10x10</option>
                            <option value={12}>12x12</option>
                        </select>
                    </label>
                </div>
                <ShipCountSelector
                    label="5-палубні кораблі: "
                    value={ships[0].count}
                    optionValues={[0, 1]}
                    onChange={(e) => handleShipCountChange(e, 0)}
                />
                <ShipCountSelector
                    label="4-палубні кораблі: "
                    value={ships[1].count}
                    optionValues={[0, 1, 2]}
                    onChange={(e) => handleShipCountChange(e, 1)}
                />
                <ShipCountSelector
                    label="3-палубні кораблі: "
                    value={ships[2].count}
                    optionValues={[0, 1, 2]}
                    onChange={(e) => handleShipCountChange(e, 2)}
                />
                <ShipCountSelector
                    label="2-палубні кораблі: "
                    value={ships[3].count}
                    optionValues={[0, 1, 2, 3]}
                    onChange={(e) => handleShipCountChange(e, 3)}
                />
                <ShipCountSelector
                    label="1-палубні кораблі: "
                    value={ships[4].count}
                    optionValues={[0, 1, 2, 3, 4]}
                    onChange={(e) => handleShipCountChange(e, 4)}
                />

                <button type="button" onClick={handleBoardRefresh}>
                    ⟳
                </button>
                <button type="submit">Почати гру</button>
            </form>
        </div>
    );
};

export default Menu;
