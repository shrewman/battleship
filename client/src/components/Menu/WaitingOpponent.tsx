import { useModalContext } from "../../context/UseModalContext";
import MenuBoard from "./MenuBoard";

type WaitingOpponentProps = {
    exitRoom: () => void;
};

const WaitingOpponent: React.FC<WaitingOpponentProps> = ({ exitRoom }) => {
    const { roomCode } = useModalContext();
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