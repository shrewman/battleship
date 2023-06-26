import { createContext, useState } from 'react';

export type Turn = 'P1' | 'P2';

interface TurnContextType {
    turn: Turn;
    passTurn: () => void;
}

export const TurnContext = createContext<TurnContextType>({turn: 'P1', passTurn: () => {''} });

export const TurnProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [turn, setTurn] = useState<Turn>(Math.random() < 0.5 ? 'P1' : 'P2');
    const setTurnValue = () => {
        setTurn(turn === 'P1' ? 'P2' : 'P1');
    }

    return (
        <TurnContext.Provider value={{turn, passTurn: setTurnValue}}>
            {children}
        </TurnContext.Provider>
    )
}

