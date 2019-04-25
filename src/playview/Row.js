import React from 'react';


function Row(props) {
  const { grid } = props;
  const rows = [];

  function column(row) {
    let cells = [];
    for (let column = 0; column < grid[row].length; column++) {
      const keyName = `${row}-${column}`;
      if (grid[row][column]) {
        cells.push(<span className="cell fill" key={keyName}>&nbsp;</span>)
      } else {
        cells.push(<span className="cell empty" key={keyName}>&nbsp;</span>)
      }
    }
    return cells;
  }

  for (let row = 0; row < grid.length; row++) {
    rows.push(<div className="row" key={row}>{column(row)}</div>);
  }

  return rows;
}

export default Row;