import { useContext } from "react";
import RoomContext from "./RoomContext";

export const useRoomContext = () => {
    const roomContext = useContext(RoomContext);

    if (!roomContext) {
        throw new Error("useRoomContext must be used within a RoomProvider");
    }

    return roomContext;
};
