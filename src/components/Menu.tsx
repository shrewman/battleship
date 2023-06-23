import React, { useState } from 'react';
import Ship from '../types/Ship';

interface MenuProps {
  startGame: (ships: Ship[], boardSize: number) => void;
}

const Menu: React.FC<MenuProps> = ({ startGame }) => {
  const [ships, setShips] = useState<Ship[]>([
    { size: 5, count: 0 },
    { size: 4, count: 1 },
    { size: 3, count: 2 },
    { size: 2, count: 3 },
    { size: 1, count: 4 },
  ]);
  const [boardSize, setBoardSize] = useState(0);

  const handleShipCountChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const updatedShips = [...ships];
    updatedShips[index].count = parseInt(e.target.value);
    setShips(updatedShips);
  };

  const handleBoardSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardSize(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startGame(ships, boardSize);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Размер поля:
          <input type="number" value={boardSize} onChange={handleBoardSizeChange} />
        </label>
        <br />
        <label>
          Количество 5-палубных кораблей:
          <select value={ships[0].count} onChange={(e) => handleShipCountChange(e, 0)}>
            <option value={0}>0</option>
            <option value={1}>1</option>
          </select>
        </label>
        <br />
        <label>
          Количество 4-палубных кораблей:
          <select>
            <option value={0}>0</option>
            <option value={1}>1</option>
          </select>
        </label>
        <br />
        <label>
          Количество 3-палубных кораблей:
          <select>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </label>
        <br />
        <label>
          Количество 2-палубных кораблей:
          <select>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </label>
        <br />
        <label>
          Количество 1-палубных кораблей:
          <select>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </label>
        <br />
        <button type="submit">Начать игру</button>
      </form>
    </div>
  );
};

export default Menu;
