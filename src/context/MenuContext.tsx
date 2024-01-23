import { createContext, Dispatch, SetStateAction } from 'react';
import { Board, ShipCount } from '../types';

type MenuContextType = {
  boardSize: number;
  setBoardSize: Dispatch<SetStateAction<number>>;
  shipCount: ShipCount[];
  setShipCount: Dispatch<SetStateAction<ShipCount[]>>;
  board: Board;
  setBoard: Dispatch<SetStateAction<Board>>;
};

export const MenuContext = createContext<MenuContextType | null>(null);

