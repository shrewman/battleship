import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Game from "./components/Game";

function App() {
    const [gameState, setGameState] = useState({
        isStarted: false,
    });

    const startGame = () => {
        setGameState({ ...gameState, isStarted: true });
    };

    return (
        <>
            <h1>Морський бій</h1>
            {!gameState.isStarted && <Menu />}
            {gameState.isStarted && <Game />}
            <div>
                <button onClick={startGame}>Start</button>
            </div>
        </>
    );
}

export default App;
