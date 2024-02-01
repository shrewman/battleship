import { useContext } from "react";
import GameContext from "./GameContext";

export const useGameContext = () => {
    const gameContext = useContext(GameContext);

    if (!gameContext) {
        throw new Error("useGameContext must be used within a MenuProvider");
    }

    return gameContext;
};
