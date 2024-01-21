import { useState } from "react";
import ShipCountSelector from "./ShipCountSelector";

const Menu = () => {
    const [boardSize, setBoardSize] = useState(10);
    const [shipCount, setShipCount] = useState([
        { size: 5, count: 0 },
        { size: 4, count: 0 },
        { size: 3, count: 0 },
        { size: 2, count: 0 },
        { size: 1, count: 0 },
    ]);

    const handleBoardSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBoardSize(parseInt(e.target.value));
    };

    const handleShipCountChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        index: number
    ) => {
        const updatedShips = [...shipCount];
        updatedShips[index].count = parseInt(e.target.value);
        setShipCount(updatedShips);
    };

    return (
        <>
            <MenuBoard />
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

export default Menu;

const MenuBoard = () => {
    return <>Board</>;
};

const MenuCell = () => {
    return <>Cell</>;
};
