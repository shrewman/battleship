import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Game from "./components/Game";
import { MenuContext } from "./context/MenuContext";
import { ShipCount } from "./types";

function App() {
    const [isStarted, setIsStarted] = useState(false);

    const [boardSize, setBoardSize] = useState(10);
    const [shipCount, setShipCount] = useState<ShipCount>([
        { size: 5, count: 0 },
        { size: 4, count: 0 },
        { size: 3, count: 0 },
        { size: 2, count: 0 },
        { size: 1, count: 0 },
    ]);

    const startGame = () => {
        setIsStarted(true);
    };

    return (
        <>
            <h1>Морський бій</h1>
            <MenuContext.Provider
                value={{ boardSize, setBoardSize, shipCount, setShipCount }}
            >
                {!isStarted && <Menu />}
                {isStarted && <Game />}
            </MenuContext.Provider>
            <div>
                <button onClick={startGame}>Start</button>
            </div>
        </>
    );
}

export default App;
