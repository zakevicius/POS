import React from 'react';

const Row = ({ cells, ...props }) => {
  if (props.results) {
    const requiredCells = ['id', 'pay_amount', 'pay_currency', 'status'];
    return (
      <tr>
        {cells.map((cell) => {
          if (requiredCells.includes(cell.key)) return cell;
        })}
      </tr>
    );
  } else {
    return <tr>{cells.map((cell) => cell)}</tr>;
  }
};

export default Row;
