import { createContext, Dispatch, SetStateAction } from "react";
import { GameBoardType, ShipCount } from "../types";

type GameContextType = {
    gameShipCount: ShipCount[];
    setGameShipCount: Dispatch<SetStateAction<ShipCount[]>>;
    board: GameBoardType;
    setBoard: Dispatch<SetStateAction<GameBoardType>>;
};

const GameContext = createContext<GameContextType | null>(null);

export default GameContext;
