import React from "react";
import ShipCountSelector from "./ShipCountSelector";
import { ShipCount } from "../types";
import { useMenuContext } from "../context/UseMenuContext";
import { generateRandomBoard } from "../utils/gameLogic";

type MaxShipsConfigurations = {
    [boardSize: number]: {
        size: number;
        count: number;
    }[];
};

// TOOD: REFACTOR
const Options = () => {
    const {
        boardSize,
        setBoardSize,
        shipCount,
        setShipCount,
        setBoard,
        setIsGameStarted,
    } = useMenuContext();

    const maxShipsConfigurations: MaxShipsConfigurations = {
        8: [
            { size: 5, count: 0 },
            { size: 4, count: 0 },
            { size: 3, count: 1 },
            { size: 2, count: 3 },
            { size: 1, count: 4 },
        ],
        10: [
            { size: 5, count: 0 },
            { size: 4, count: 1 },
            { size: 3, count: 2 },
            { size: 2, count: 3 },
            { size: 1, count: 4 },
        ],
        12: [
            { size: 5, count: 0 },
            { size: 4, count: 1 },
            { size: 3, count: 2 },
            { size: 2, count: 3 },
            { size: 1, count: 4 },
        ],
    };

    const handleBoardSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newBoardSize = parseInt(e.target.value);
        setShipCount(maxShipsConfigurations[newBoardSize]);
        setBoardSize(newBoardSize);
    };

    const handleShipCountChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        size: number
    ) => {
        const count = parseInt(e.target.value);
        const updatedShips: ShipCount[] = shipCount.map((ships) => {
            if (ships.size === size) {
                ships.count = count;
            }
            return ships;
        });
        setShipCount(updatedShips);
        setBoard(generateRandomBoard(boardSize, shipCount));
    };

    const handleClassicGame = () => {
        setBoardSize(10);
        const classicGameVariation: ShipCount[] = [
            { size: 5, count: 0 },
            { size: 4, count: 1 },
            { size: 3, count: 2 },
            { size: 2, count: 3 },
            { size: 1, count: 4 },
        ];
        setShipCount(classicGameVariation);
        setBoard(generateRandomBoard(boardSize, classicGameVariation));
    };

    const handleHasbroGame = () => {
        setBoardSize(10);
        const hasbroGameVariation: ShipCount[] = [
            { size: 5, count: 1 },
            { size: 4, count: 1 },
            { size: 3, count: 2 },
            { size: 2, count: 1 },
            { size: 1, count: 0 },
        ];
        setShipCount(hasbroGameVariation);
        setBoard(generateRandomBoard(boardSize, hasbroGameVariation));
    };

    return (
        <div className="selectors">
            <div className="menu-buttons game-variations">
                <button onClick={handleClassicGame}>Класична</button>
                <button onClick={handleHasbroGame}>Hasbro</button>
            </div>
            <div className="ship-count-selector">
                <label>Розмір поля:</label>
                <select
                    value={boardSize}
                    onChange={(e) => {
                        handleBoardSizeChange(e);
                    }}
                >
                    <option value={8}>8x8</option>
                    <option value={10}>10x10</option>
                    <option value={12}>12x12</option>
                </select>
            </div>
            {boardSize >= 10 && (
                <ShipCountSelector
                    label="5-палубні кораблі: "
                    value={
                        shipCount.find((shipCount) => shipCount.size === 5)
                            ?.count || 0
                    }
                    optionValues={[0, 1]}
                    onChange={(e) => handleShipCountChange(e, 5)}
                />
            )}
            {boardSize >= 10 && (
                <ShipCountSelector
                    label="4-палубні кораблі: "
                    value={
                        shipCount.find((shipCount) => shipCount.size === 4)
                            ?.count || 0
                    }
                    optionValues={[0, 1, 2]}
                    onChange={(e) => handleShipCountChange(e, 4)}
                />
            )}
            <ShipCountSelector
                label="3-палубні кораблі: "
                value={
                    shipCount.find((shipCount) => shipCount.size === 3)
                        ?.count || 0
                }
                optionValues={[0, 1, 2]}
                onChange={(e) => handleShipCountChange(e, 3)}
            />
            <ShipCountSelector
                label="2-палубні кораблі: "
                value={
                    shipCount.find((shipCount) => shipCount.size === 2)
                        ?.count || 0
                }
                optionValues={[0, 1, 2, 3]}
                onChange={(e) => handleShipCountChange(e, 2)}
            />
            <ShipCountSelector
                label="1-палубні кораблі: "
                value={
                    shipCount.find((shipCount) => shipCount.size === 1)
                        ?.count || 0
                }
                optionValues={[0, 1, 2, 3, 4]}
                onChange={(e) => handleShipCountChange(e, 1)}
            />
        </div>
    );
};

export default Options;
