import React, { useEffect } from 'react';
import Row from './Row';

const Results = ({ data = [{ id: 1 }] }) => {
  useEffect(() => {}, [data.id]);

  const renderRows = () => {
    let rows = [];
    for (let item of data) {
      rows.push(<Row key={item.id} cells={renderCells(item)} results />);
    }
    return rows;
  };

  const renderCells = (d) => {
    let cells = [];

    for (let key in d) {
      cells.push(<td key={key}>{d[key]}</td>);
    }
    return cells;
  };

  return (
    <div className="results">
      {data ? (
        <table className="results-table">
          <tbody>{renderRows()}</tbody>
        </table>
      ) : (
        ''
      )}
    </div>
  );
};

export default Results;
