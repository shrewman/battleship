import { createContext, Dispatch, SetStateAction } from 'react';
import { GameBoardType, MenuBoardType, ShipCount } from '../types';

type MenuContextType = {
  boardSize: number;
  setBoardSize: Dispatch<SetStateAction<number>>;
  shipCount: ShipCount[];
  setShipCount: Dispatch<SetStateAction<ShipCount[]>>;
  board: MenuBoardType;
  setBoard: Dispatch<SetStateAction<MenuBoardType>>;
  opponentBoard: GameBoardType | null;
  setOpponentBoard: Dispatch<SetStateAction<GameBoardType | null>>;
  isGameStarted: boolean,
  setIsGameStarted: Dispatch<SetStateAction<boolean>>;
};

const MenuContext = createContext<MenuContextType | null>(null);

export default MenuContext;

