import React from 'react';

const Row = ({ cells }) => {
  return <tr>{cells.map((cell) => cell)}</tr>;
};

export default Row;
