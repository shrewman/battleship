import Options from "../Options";
import { useEffect, useState } from "react";
import { useMenuContext } from "../../context/UseMenuContext";
import { generateRandomBoard } from "../../utils/gameLogic";
import { socket } from "../../socket";
import ModalContext from "../../context/ModalContext";
import WaitingOpponent from "./WaitingOpponent";
import MenuBoard from "./MenuBoard";
import ModalRoom from "./ModalRoom";

const Menu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomCode, setRoomCode] = useState<number | null>(null);
    const [isRoomCreated, setIsRoomCreated] = useState(false);
    const { boardSize, shipCount, board, setBoard } = useMenuContext();

    const shuffleBoard = () => {
        setBoard(generateRandomBoard(boardSize, shipCount));
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleStartGame = () => {
        setIsModalOpen(true);
    };

    const handleCreateRoom = () => {
        socket.connect();
        socket.emit("create_room", board, shipCount);
        setIsRoomCreated(true);
        closeModal();
    };

    const handleJoinRoom = () => {
        socket.connect();
        socket.emit("join_room", roomCode, board, shipCount);
        closeModal();
    };

    const exitRoom = () => {
        setIsRoomCreated(false);
        setRoomCode(null);
    };

    useEffect(() => {
        socket.on("error", (error) => {
            console.error("Socket.IO Error:", error.message);
        });
    }, []);

    return (
        <ModalContext.Provider value={{ roomCode, setRoomCode }}>
            <div className="menu">
                {isRoomCreated ? (
                    <WaitingOpponent exitRoom={exitRoom} />
                ) : (
                    <>
                        <MenuBoard />
                        <div className="options">
                            <Options />
                            <div className="menu-buttons">
                                <button onClick={shuffleBoard}>⟳</button>
                                <button onClick={handleStartGame}>
                                    В бій!
                                </button>
                            </div>
                        </div>
                    </>
                )}
                {isModalOpen && (
                    <ModalRoom
                        onClose={closeModal}
                        handleCreateRoom={handleCreateRoom}
                        handleJoinRoom={handleJoinRoom}
                    />
                )}
            </div>
        </ModalContext.Provider>
    );
};

export default Menu;
