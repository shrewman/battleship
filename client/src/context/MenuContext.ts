import { createContext, Dispatch, SetStateAction } from 'react';
import { GameBoardType, MenuBoardType, Player, ShipCount } from '../types';

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
  turn: Player,
  setTurn: Dispatch<SetStateAction<Player>>;
};

const MenuContext = createContext<MenuContextType | null>(null);

export default MenuContext;

