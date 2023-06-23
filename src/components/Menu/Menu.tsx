import React, { useState } from 'react';
import './Menu.css'
import Ship from '../../types/Ship';
import Board from '../Board/Board';
import ShipCountSelector from './ShipCountSelector';

interface MenuProps {
  handleStartGame: (ships: Ship[], boardSize: number) => void;
}

const Menu: React.FC<MenuProps> = ({ handleStartGame: startGame }) => {
  const [ships, setShips] = useState<Ship[]>([
    { size: 1, count: 0 },
    { size: 2, count: 0 },
    { size: 3, count: 0 },
    { size: 4, count: 0 },
    { size: 5, count: 0 },
  ]);
  const [boardSize, setBoardSize] = useState(7);

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
            <option value={7}>7x7</option>
            <option value={10}>10x10</option>
            <option value={12}>13x13</option>
          </select>
        </label>
        <br />
        <ShipCountSelector
          label='Кількість 5-палубних кораблів'
          value={ships[4].count}
          optionValues={[0, 1]}
          onChange={(e) => handleShipCountChange(e, 4)} />
        <ShipCountSelector
          label='Кількість 4-палубних кораблів'
          value={ships[3].count}
          optionValues={[0, 1, 2]}
          onChange={(e) => handleShipCountChange(e, 3)} />
        <ShipCountSelector
          label='Кількість 3-палубних кораблів'
          value={ships[2].count}
          optionValues={[0, 1, 2]}
          onChange={(e) => handleShipCountChange(e, 2)} />
        <ShipCountSelector
          label='Кількість 2-палубних кораблів'
          value={ships[1].count}
          optionValues={[0, 1, 2, 3]}
          onChange={(e) => handleShipCountChange(e, 1)} />
        <ShipCountSelector
          label='Кількість 1-палубних кораблів'
          value={ships[0].count}
          optionValues={[0, 1, 2, 3, 4]}
          onChange={(e) => handleShipCountChange(e, 0)} />

        <button type="submit">Почати гру</button>
      </form>
    </div>
  );
};

export default Menu;
