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
        index: number
    ) => {
        const updatedShips: ShipCount = [...shipCount];
        updatedShips[index].count = parseInt(e.target.value);
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
            <ShipCountSelector
                label="5-палубні кораблі: "
                value={shipCount[0].count}
                optionValues={[0, 1]}
                onChange={(e) => handleShipCountChange(e, 0)}
            />
            <ShipCountSelector
                label="4-палубні кораблі: "
                value={shipCount[1].count}
                optionValues={[0, 1, 2]}
                onChange={(e) => handleShipCountChange(e, 1)}
            />
            <ShipCountSelector
                label="3-палубні кораблі: "
                value={shipCount[2].count}
                optionValues={[0, 1, 2]}
                onChange={(e) => handleShipCountChange(e, 2)}
            />
            <ShipCountSelector
                label="2-палубні кораблі: "
                value={shipCount[3].count}
                optionValues={[0, 1, 2, 3]}
                onChange={(e) => handleShipCountChange(e, 3)}
            />
            <ShipCountSelector
                label="1-палубні кораблі: "
                value={shipCount[4].count}
                optionValues={[0, 1, 2, 3, 4]}
                onChange={(e) => handleShipCountChange(e, 4)}
            />
        </>
    );
};

export default Options;