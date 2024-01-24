import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";
import Game from "./components/Game";
import MenuContext from "./context/MenuContext";
import { GameBoardType, MenuBoardType, ShipCount } from "./types";
import { generateRandomBoard } from "./utils/gameLogic";
import { socket } from "./socket";

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

    const [opponentBoard, setOpponentBoard] = useState<GameBoardType | null>(
        null
    );

    useEffect(() => {
        socket.on("start_game", (board) => {
            setIsGameStarted(true);
            setOpponentBoard(board);
        })
    }, [])


    return (
        <>
            <h1 className="font-bold text-2xl mb-5">Морський бій</h1>
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
                    opponentBoard,
                    setOpponentBoard
                }}
            >
                {!isGameStarted && <Menu />}
                {isGameStarted && (
                    <Game menuBoard={board} shipCount={shipCount} />
                )}
            </MenuContext.Provider>
        </>
    );
}

export default App;
