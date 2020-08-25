import React from 'react';
import CellButton from './CellButton';

const Row = ({cells}) => {
  return (
    <tr>
      {cells.map(cell => cell)}
    </tr>
  )
}

export default Row;