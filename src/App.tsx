import { useState, useEffect } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Game from "./components/Game";

function App() {
    const [isStarted, setIsStarted] = useState(false);
    const [boardSize, setBoardSize] = useState(10);

    const [gameState, setGameState] = useState({
        isStarted,
        boardSize,
    });

    useEffect(() => {
        setGameState({
            isStarted,
            boardSize,
        });
    }, [isStarted, boardSize]);

    const startGame = () => {
        setIsStarted(true);
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
