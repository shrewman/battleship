import React from 'react';
import './CellContainer.css';

interface CellProps {
  status: 'free' | 'occupied' | 'neighbour' | 'destroyed';
  shotFired: boolean;
}

const CellContainer: React.FC<CellProps> = ({ status, shotFired }) => {
  let cellClassName = '';

  if (status === 'free') {
    cellClassName = 'cell-free';
  } else if (status === 'occupied') {
    cellClassName = 'cell-occupied';
  } else if (status === 'destroyed') {
    cellClassName = 'cell-destroyed';
  } else if (status === 'neighbour') {
    cellClassName = 'cell-neighbour';
  }

  if (status === 'free' && shotFired === true) {
    cellClassName = 'cell-fired'
  }


  return <div className={`cell ${cellClassName}`} />;
};

export default CellContainer;
