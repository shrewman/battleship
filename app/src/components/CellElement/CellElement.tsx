import React from 'react';
import './CellElement.css';

interface Position {
  x: number;
  y: number;
}

interface CellProps {
  position: Position;
  state: 'empty' | 'ship' | 'neighbour' | 'hit' | 'unknown';
  belongsTo: 'P1' | 'P2';
  onFire: (x: number, y: number) => void;
}

const CellElement: React.FC<CellProps> = ({ position, state: status, belongsTo, onFire }) => {
  let cellBelonging = '';
  let cellStatus = '';

  if (belongsTo === 'P1') {
    cellBelonging = 'p1-cell';
  } else {
    cellBelonging = 'p2-cell';
  }

  if (status === 'empty') {
    cellStatus = 'cell-free';
  } else if (status === 'ship') {
    cellStatus = 'cell-occupied';
  } else if (status === 'hit') {
    cellStatus = 'cell-destroyed';
  } else if (status === 'neighbour') {
    cellStatus = 'cell-neighbour';
  }

  const handleClick = () => {
    if (belongsTo === 'P2')
      onFire(position.x, position.y);
  };

  return <div className={`cell ${cellBelonging} ${cellStatus}`} onClick={handleClick} />;
};

export default CellElement;
