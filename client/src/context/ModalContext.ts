import { createContext, Dispatch, SetStateAction } from "react";

type ModalContextType = {
    roomCode: number | null;
    setRoomCode: Dispatch<SetStateAction<number | null>>;
};

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
