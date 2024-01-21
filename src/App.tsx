import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Game from "./components/Game";

function App() {
    const [gameState, setGameState] = useState({
        isStarted: false,
    });

    return (
        <>
            <h1>Морський бій</h1>
            {!gameState.isStarted && <Menu />}
            {gameState.isStarted && <Game />}
        </>
    );
}

export default App;
