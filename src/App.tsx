import { useState } from 'react'
import Menu from './components/Menu/Menu'
import Game from './components/Game/Game'
import './App.css'

interface Ship {
  size: number;
  count: number;
}

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [ships, setShips] = useState<Ship[]>([
    { size: 5, count: 0 },
    { size: 4, count: 1 },
    { size: 3, count: 2 },
    { size: 2, count: 3 },
    { size: 1, count: 4 },
  ]);
  const [boardSize, setBoardSize] = useState(0);

  const handleStartGame = (ships: Ship[], boardSize: number) => {
    setShips(ships);
    setBoardSize(boardSize);
    setGameStarted(true);
  };

  return (
    <>
      <h2>Морський бій</h2>
      {!gameStarted && <Menu handleStartGame={handleStartGame} />}
      {gameStarted && <Game ships={ships} boardSize={boardSize} setShips={setShips}/>}
    </>
  )
}

export default App
