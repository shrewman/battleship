import React from 'react';
import './CellElement.css';

interface Position {
  x: number;
  y: number;
}

interface CellProps {
  position: Position;
  status: 'free' | 'occupied' | 'neighbour' | 'destroyed' | 'fired';
  belongsTo: 'P1' | 'P2';
  shotFired: boolean;
  onFire: (x: number, y: number) => void;
}

const CellContainer: React.FC<CellProps> = ({ position, status, belongsTo, shotFired, onFire }) => {
  let cellBelonging = '';
  let cellStatus = '';
  let cellFired = '';

  if (belongsTo === 'P1') {
    cellBelonging = 'p1-cell';
  } else {
    cellBelonging = 'p2-cell';
  }

  if (status === 'free') {
    cellStatus = 'cell-free';
  } else if (status === 'occupied') {
    cellStatus = 'cell-occupied';
  } else if (status === 'destroyed') {
    cellStatus = 'cell-destroyed';
  } else if (status === 'neighbour') {
    cellStatus = 'cell-neighbour';
  }

  if (shotFired === true) {
    cellFired = 'cell-fired'
  }

  if (status === 'occupied' && shotFired === true) {
    cellStatus = 'cell-destroyed';
    cellFired = 'cell-fired'
  }

  const handleClick = () => {
    if (belongsTo === 'P2')
      onFire(position.x, position.y);
  };

  return <div className={`cell ${cellBelonging} ${cellStatus} ${cellFired}`} onClick={handleClick} />;
};

export default CellContainer;
