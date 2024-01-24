import { useEffect } from "react";
import { useModalContext } from "../../context/UseModalContext";
import MenuBoard from "./MenuBoard";
import { socket } from "../../socket";

type WaitingOpponentProps = {
    exitRoom: () => void;
};

const WaitingOpponent: React.FC<WaitingOpponentProps> = ({ exitRoom }) => {
    const { roomCode, setRoomCode } = useModalContext();

    useEffect(() => {
        socket.on("get_room_code", (room: number) => setRoomCode(room));
    }, []);

    return (
        <div className="waiting-opponent">
            <MenuBoard />
            <p className="text-lg mt-2">
                Номер кімнати: <b>{roomCode}</b>
            </p>
            <p className="mt-2">Очікуємо опонента...</p>
            <button className="mt-2" onClick={exitRoom}>
                Вийти
            </button>
        </div>
    );
};

export default WaitingOpponent;
