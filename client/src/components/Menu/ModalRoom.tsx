import { useRoomContext } from "../../context/UseRoomContext";
type ModalRoomProps = {
    onClose: () => void;
    handleCreateRoom: () => void;
    handleJoinRoom: () => void;
};
const ModalRoom: React.FC<ModalRoomProps> = ({
    onClose,
    handleCreateRoom,
    handleJoinRoom,
}) => {
    const { room, setRoom } = useRoomContext();

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
                                setRoom(parseInt(inputValue));
                            }
                        }}
                        value={room ?? ""}
                        className="w-2/3 text-center text-black"
                        id="input-room"
                        type="number"
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
