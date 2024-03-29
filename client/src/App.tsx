import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";
import Game from "./components/Game";
import MenuContext from "./context/MenuContext";
import {
    GameBoardType,
    MenuBoardType,
    Player,
    PlayerNum,
    ShipCount,
} from "./types";
import {
    generateRandomBoard,
    initEmptyGameBoard,
} from "./utils/gameLogic";
import { socket } from "./socket";
import RoomContext from "./context/RoomContext";
import SocketError from "./components/SocketError";
import ReactAudioPlayer from "react-audio-player";
import musicFile from "../src/assets/music.wav";

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

    const [room, setRoom] = useState<number | null>(null);
    const [opponentBoard, setOpponentBoard] = useState<GameBoardType>([]);
    const [player, setPlayer] = useState<Player>({
        number: 1,
        label: "You",
    });
    const [turn, setTurn] = useState<PlayerNum>(1);
    const [errorMessage, setErrorMessage] = useState("");

    const handleCloseError = () => {
        setErrorMessage("");
    };

    useEffect(() => {
        socket.on(
            "start_game",
            (playerNumber: PlayerNum, firstTurn: PlayerNum) => {
                setIsGameStarted(true);
                setOpponentBoard(initEmptyGameBoard(boardSize, playerNumber));
                setPlayer({ number: playerNumber, label: "You" });
                setTurn(firstTurn);
            }
        );
        socket.on("error", (error: Error) => {
            setErrorMessage(error.message);
        });
    }, []);

    return (
        <>
            <h1 className="font-bold text-2xl mb-5">Морський бій</h1>

            <RoomContext.Provider value={{ room, setRoom }}>
                <MenuContext.Provider
                    value={{
                        boardSize,
                        setBoardSize,
                        shipCount,
                        setShipCount,
                        board,
                        setBoard,
                        opponentBoard,
                        setOpponentBoard,
                        isGameStarted,
                        setIsGameStarted,
                        player,
                        setPlayer,
                        turn,
                        setTurn,
                    }}
                >
                    {!isGameStarted && <Menu />}
                    {isGameStarted && <Game menuBoard={board} />}
                    {errorMessage && (
                        <SocketError
                            errorMessage={errorMessage}
                            onClose={handleCloseError}
                        />
                    )}
                </MenuContext.Provider>
            </RoomContext.Provider>
            <ReactAudioPlayer src={musicFile} autoPlay />
        </>
    );
}

export default App;
