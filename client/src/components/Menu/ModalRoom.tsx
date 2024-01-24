import { socket } from "../../socket";
import { useModalContext } from "../../context/UseModalContext";
import { useMenuContext } from "../../context/UseMenuContext";

type ModalRoomProps = {
    onClose: () => void;
    handleCreateRoom: () => void;
};
const ModalRoom: React.FC<ModalRoomProps> = ({ onClose, handleCreateRoom }) => {
    const { board, shipCount } = useMenuContext();
    const { roomCode, setRoomCode } = useModalContext();

    const handleJoinRoom = () => {
        socket.connect();
        socket.emit("join_room", roomCode, board, shipCount);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <div className="flex-col">
                    <button onClick={handleCreateRoom} className="my-5 w-2/3">
                        Створити гру
                    </button>
                    <p className="text-3xl">або</p>
                    <p className="text-base text-bold mt-5 mb-2">
                        Доєднатися до кімнати
                    </p>
                    <input
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue.length < 7) {
                                setRoomCode(parseInt(inputValue));
                            }
                        }}
                        value={roomCode ?? 0}
                        className="w-2/3 text-center text-black"
                        id="input-room"
                        type="text"
                        placeholder="Номер кімнати"
                    />
                    <div>
                        <button
                            onClick={handleJoinRoom}
                            className="py-1 px-4 mt-3"
                        >
                            Доєднатися
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalRoom;