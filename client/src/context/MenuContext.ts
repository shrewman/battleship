import { createContext, Dispatch, SetStateAction } from 'react';
import { MenuBoardType, ShipCount } from '../types';

type MenuContextType = {
  boardSize: number;
  setBoardSize: Dispatch<SetStateAction<number>>;
  shipCount: ShipCount[];
  setShipCount: Dispatch<SetStateAction<ShipCount[]>>;
  board: MenuBoardType;
  setBoard: Dispatch<SetStateAction<MenuBoardType>>;
  isGameStarted: boolean,
  setIsGameStarted: Dispatch<SetStateAction<boolean>>;
};

const MenuContext = createContext<MenuContextType | null>(null);

export default MenuContext;

