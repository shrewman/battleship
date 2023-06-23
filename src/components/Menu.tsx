import React, { useState } from 'react';

interface MenuProps {
  startGame: (shipCount: number, boardSize: number) => void;
}

const Menu: React.FC<MenuProps> = ({ startGame }) => {
  const [shipCount, setShipCount] = useState(0);
  const [boardSize, setBoardSize] = useState(0);

  const handleShipCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipCount(parseInt(e.target.value));
  };

  const handleBoardSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardSize(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startGame(shipCount, boardSize);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Количество кораблей:
          <input type="number" value={shipCount} onChange={handleShipCountChange} />
        </label>
        <br />
        <label>
          Размер поля:
          <input type="number" value={boardSize} onChange={handleBoardSizeChange} />
        </label>
        <br />
        <button type="submit">Начать игру</button>
      </form>
    </div>
  );
};

export default Menu;
