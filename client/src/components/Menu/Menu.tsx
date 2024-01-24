import Options from "../Options";
import { useState } from "react";
import { useMenuContext } from "../../context/UseMenuContext";
import { generateRandomBoard } from "../../utils/gameLogic";
import { socket } from "../../socket";
import ModalContext from "../../context/ModalContext";
import WaitingOpponent from "./WaitingOpponent";
import MenuBoard from "./MenuBoard";
import ModalRoom from "./ModalRoom";

const Menu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomCode, setRoomCode] = useState<number>(111111);
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
        setIsModalOpen(false);
    };

    const exitRoom = () => {
        setIsRoomCreated(false);
    };

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
                    />
                )}
            </div>
        </ModalContext.Provider>
    );
};

export default Menu;
