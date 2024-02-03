import { useState } from 'react'
import Menu from './components/Menu/Menu'
import Game from './components/Game'
import './App.css'
import Cell from './types/Cell';
import Ship from './types/Ship';
import { TurnProvider } from './context/TurnContext';

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [ships, setShips] = useState<Ship[]>([
    { size: 5, count: 0 },
    { size: 4, count: 1 },
    { size: 3, count: 2 },
    { size: 2, count: 3 },
    { size: 1, count: 4 },
  ]);
  const [boardSize, setBoardSize] = useState(0);
  const [board, setBoard] = useState<Cell[][]>([]);

  const handleStartGame = (board: Cell[][], boardSize: number, ships: Ship[]) => {
    setBoard(board)
    setBoardSize(boardSize);
    setShips(ships);
    setGameStarted(true);
  };

  return (
    <>
      <h2>Морський бій</h2>
      <TurnProvider>
        {!gameStarted && <Menu handleStartGame={handleStartGame} />}
        {gameStarted && <Game board={board} setBoard={setBoard} ships={ships} boardSize={boardSize} />}
      </TurnProvider>
    </>
  )
}

export default App
