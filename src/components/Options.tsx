import React from "react";
import ShipCountSelector from "./ShipCountSelector";
import { ShipCount } from "../types";
import { useMenuContext } from "../context/UseMenuContext";

const Options = () => {
    const { boardSize, setBoardSize, shipCount, setShipCount } =
        useMenuContext();

    const handleBoardSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBoardSize(parseInt(e.target.value));
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
    };

    return (
        <>
            <div className="ship-count-selector">
                <label>
                    Розмір поля:
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
                </label>
            </div>
            {boardSize >= 10 && (
                <ShipCountSelector
                    label="5-палубні кораблі: "
                    value={shipCount.find((shipCount) => shipCount.size === 5)?.count || 0}
                    optionValues={[0, 1]}
                    onChange={(e) => handleShipCountChange(e, 5)}
                />
            )}
            <ShipCountSelector
                label="4-палубні кораблі: "
                value={shipCount.find((shipCount) => shipCount.size === 4)?.count || 0}
                optionValues={[0, 1, 2]}
                onChange={(e) => handleShipCountChange(e, 4)}
            />
            <ShipCountSelector
                label="3-палубні кораблі: "
                value={shipCount.find((shipCount) => shipCount.size === 3)?.count || 0}
                optionValues={[0, 1, 2]}
                onChange={(e) => handleShipCountChange(e, 3)}
            />
            <ShipCountSelector
                label="2-палубні кораблі: "
                value={shipCount.find((shipCount) => shipCount.size === 2)?.count || 0}
                optionValues={[0, 1, 2, 3]}
                onChange={(e) => handleShipCountChange(e, 2)}
            />
            <ShipCountSelector
                label="1-палубні кораблі: "
                value={shipCount.find((shipCount) => shipCount.size === 1)?.count || 0}
                optionValues={[0, 1, 2, 3, 4]}
                onChange={(e) => handleShipCountChange(e, 1)}
            />
        </>
    );
};

export default Options;
