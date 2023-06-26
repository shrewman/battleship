import { createContext } from 'react';

export type Turn = 'P1' | 'P2';
export const TurnContext = createContext<Turn>(Math.random() < 0.5 ? 'P1' : 'P2');
