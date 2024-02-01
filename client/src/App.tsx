import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Game from "./components/Game";
import MenuContext from "./context/MenuContext";
import { MenuBoardType, ShipCount } from "./types";
import { generateRandomBoard } from "./utils/gameLogic";

function App() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [boardSize, setBoardSize] = useState(10);
    const [shipCount, setShipCount] = useState<ShipCount[]>([
        { size: 5, count: 0 },
        { size: 4, count: 1 },
        { size: 3, count: 2 },
        { size: 2, count: 3 },
        { size: 1, count: 4 },
    ]);

    const [board, setBoard] = useState<MenuBoardType>(
        generateRandomBoard(boardSize, shipCount)
    );

    return (
        <>
            <h1>Морський бій</h1>
            <MenuContext.Provider
                value={{
                    boardSize,
                    setBoardSize,
                    shipCount,
                    setShipCount,
                    board,
                    setBoard,
                    isGameStarted,
                    setIsGameStarted,
                }}
            >
                {!isGameStarted && <Menu />}
            </MenuContext.Provider>
            {isGameStarted && <Game menuBoard={board} shipCount={shipCount} />}
        </>
    );
}

export default App;
