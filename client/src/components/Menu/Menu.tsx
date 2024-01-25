import Options from "../Options";
import { useState } from "react";
import { useMenuContext } from "../../context/UseMenuContext";
import { generateRandomBoard } from "../../utils/gameLogic";
import { socket } from "../../socket";
import WaitingOpponent from "./WaitingOpponent";
import MenuBoard from "./MenuBoard";
import ModalRoom from "./ModalRoom";
import { useRoomContext } from "../../context/UseRoomContext";

const Menu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRoomCreated, setIsRoomCreated] = useState(false);
    const { room, setRoom } = useRoomContext();
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
        socket.emit("join_room", room, board, shipCount);
        closeModal();
    };

    const exitRoom = () => {
        setIsRoomCreated(false);
        setRoom(null);
    };

    return (
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
    );
};

export default Menu;
