import { createContext, Dispatch, SetStateAction } from 'react';
import { ShipCount } from '../types';

type MenuContextType = {
  boardSize: number;
  setBoardSize: Dispatch<SetStateAction<number>>;
  shipCount: ShipCount[];
  setShipCount: Dispatch<SetStateAction<ShipCount[]>>;
};

export const MenuContext = createContext<MenuContextType | null>(null);

