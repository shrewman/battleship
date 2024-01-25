import { createContext, Dispatch, SetStateAction } from 'react';
import { GameBoardType, MenuBoardType, Player, PlayerNum, ShipCount } from '../types';

type MenuContextType = {
  boardSize: number;
  setBoardSize: Dispatch<SetStateAction<number>>;
  shipCount: ShipCount[];
  setShipCount: Dispatch<SetStateAction<ShipCount[]>>;
  board: MenuBoardType;
  setBoard: Dispatch<SetStateAction<MenuBoardType>>;
  opponentBoard: GameBoardType;
  setOpponentBoard: Dispatch<SetStateAction<GameBoardType>>;
  isGameStarted: boolean,
  setIsGameStarted: Dispatch<SetStateAction<boolean>>;
  turn: PlayerNum,
  setTurn: Dispatch<SetStateAction<PlayerNum>>;
  player: Player;
  setPlayer: Dispatch<SetStateAction<Player>>
};

const MenuContext = createContext<MenuContextType | null>(null);

export default MenuContext;

