import { useState } from 'react'
import Menu from './components/Menu'
import Game from './components/Game/Game'
import './App.css'

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [shipCount, setShipCount] = useState(0);
  const [boardSize, setBoardSize] = useState(0);

  const startGame = (shipCount: number, boardSize: number) => {
    setShipCount(shipCount);
    setBoardSize(boardSize);
    setGameStarted(true);
  };

  return (
    <>
      <h2>Морской бой</h2>
      {!gameStarted && <Menu startGame={startGame}/>}
      {gameStarted && <Game shipCount={shipCount} boardSize={boardSize} />}
    </>
  )
}

export default App
