import { createContext, Dispatch, SetStateAction } from "react";

type RoomContextType = {
    room: number | null;
    setRoom: Dispatch<SetStateAction<number | null>>;
};

const RoomContext = createContext<RoomContextType | null>(null);

export default RoomContext;
