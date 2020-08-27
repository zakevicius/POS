import React from 'react';

const CellButton = ({ value = 'X', onCellClick }) => {
  return (
    <td className="number" onClick={(e) => onCellClick(e, value)}>
      {value}
    </td>
  );
};

export default CellButton;
