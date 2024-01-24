import Options from "./Options";
import { useMemo, useEffect, useState } from "react";
import { useMenuContext } from "../context/UseMenuContext";
import { MenuCellState } from "../types";
import { generateRandomBoard } from "../utils/gameLogic";
import { socket } from "../socket";

const Menu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { boardSize, shipCount, board, setBoard, setIsGameStarted } =
        useMenuContext();

    function connect() {
        socket.connect();
    }

    const shuffleBoard = () => {
        setBoard(generateRandomBoard(boardSize, shipCount));
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleStartGame = () => {
        connect();
        socket.emit("join_game", board, shipCount);
        setIsModalOpen(true);
    };

    return (
        <div className="menu">
            <MenuBoard />
            <div className="options">
                <Options />
                <div className="menu-buttons">
                    <button onClick={shuffleBoard}>⟳</button>
                    <button onClick={handleStartGame}>В бій!</button>
                </div>
            </div>
            {isModalOpen && <Modal onClose={closeModal} />}
        </div>
    );
};

type ModalProps = {
    onClose: () => void;
};
const Modal: React.FC<ModalProps> = ({ onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <div className="flex">
                    <button>Start</button>
                    <p className="underline">Join the room</p>
                    <input
                        id="input-room"
                        type="text"
                        placeholder="Room code"
                    />
                </div>
            </div>
        </div>
    );
};

export default Menu;

const MenuBoard = () => {
    const { boardSize, board, setBoard, shipCount } = useMenuContext();

    const boardContainer = useMemo(() => {
        return board.map((cell, cellIndex) => (
            <MenuCell key={cellIndex} state={cell.state} />
        ));
    }, [board]);

    useEffect(() => {
        setBoard(generateRandomBoard(boardSize, shipCount));
    }, [boardSize]);

    return (
        <>
            <div
                className="board"
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
                    gridTemplateRows: `repeat(${boardSize}, 1fr)`,
                }}
            >
                {boardContainer}
            </div>
        </>
    );
};

const MenuCell: React.FC<{ state: MenuCellState }> = ({ state }) => {
    return <div className={`cell cell-${state}`}></div>;
};
