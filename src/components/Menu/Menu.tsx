import React, { useState } from 'react';
import './Menu.css'
import Ship from '../../types/Ship';
import Board from '../Board/Board';
import ShipCountSelector from './ShipCountSelector';
import { getRandomlyFilledBoard } from '../../modules/GameLogic';

interface MenuProps {
  handleStartGame: (ships: Ship[], boardSize: number) => void;
}

const Menu: React.FC<MenuProps> = ({ handleStartGame: startGame }) => {
  const [ships, setShips] = useState<Ship[]>([
    { size: 5, count: 0 },
    { size: 4, count: 0 },
    { size: 3, count: 0 },
    { size: 2, count: 0 },
    { size: 1, count: 0 },
  ]);
  const [boardSize, setBoardSize] = useState(7);
  const [board, setBoard] = useState(getRandomlyFilledBoard(boardSize, ships));

  const handleBoardRefresh = () => {
    setBoard(getRandomlyFilledBoard(boardSize, ships));
  }

  const handleShipCountChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const updatedShips = [...ships];
    updatedShips[index].count = parseInt(e.target.value);

    setShips(updatedShips);
  };

  const handleBoardSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBoardSize(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startGame(ships, boardSize);
  };

  return (
    <div className='menu-container'>
      <Board boardSize={boardSize} ships={ships} setShips={setShips} />
      <form onSubmit={handleSubmit}>
        <label>
          Розмір поля:
          <select value={boardSize} onChange={handleBoardSizeChange}>
            <option value={7}>8x8</option>
            <option value={10}>10x10</option>
            <option value={12}>12x12</option>
          </select>
        </label>
        <br />
        <ShipCountSelector
          label='4-палубні кораблі: '
          value={ships[1].count}
          optionValues={[0, 1, 2]}
          onChange={(e) => handleShipCountChange(e, 1)} />
        <ShipCountSelector
          label='3-палубні кораблі: '
          value={ships[2].count}
          optionValues={[0, 1, 2]}
          onChange={(e) => handleShipCountChange(e, 2)} />
        <ShipCountSelector
          label='2-палубні кораблі: '
          value={ships[3].count}
          optionValues={[0, 1, 2, 3]}
          onChange={(e) => handleShipCountChange(e, 3)} />
        <ShipCountSelector
          label='1-палубні кораблі: '
          value={ships[4].count}
          optionValues={[0, 1, 2, 3, 4]}
          onChange={(e) => handleShipCountChange(e, 4)} />

        <button type='button' onClick={handleBoardRefresh}>⟳</button>
        <button type="submit">Почати гру</button>
      </form>
    </div>
  );
};

export default Menu;
