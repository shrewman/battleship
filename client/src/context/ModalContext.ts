import { createContext, Dispatch, SetStateAction } from "react";

type ModalContextType = {
    roomCode: number;
    setRoomCode: Dispatch<SetStateAction<number>>;
};

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
