import { useEffect } from "react";
import { useRoomContext } from "../../context/UseRoomContext";
import MenuBoard from "./MenuBoard";
import { socket } from "../../socket";

type WaitingOpponentProps = {
    exitRoom: () => void;
};

const WaitingOpponent: React.FC<WaitingOpponentProps> = ({ exitRoom }) => {
    const { room, setRoom } = useRoomContext();

    useEffect(() => {
        socket.on("get_room_code", (room: number) => setRoom(room));
    }, []);

    return (
        <div className="waiting-opponent">
            <MenuBoard />
            <p className="text-lg mt-2">
                Номер кімнати: <b>{room}</b>
            </p>
            <p className="mt-2">Очікуємо опонента...</p>
            <button className="mt-2" onClick={exitRoom}>
                Вийти
            </button>
        </div>
    );
};

export default WaitingOpponent;
