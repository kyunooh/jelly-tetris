import React from "react";
import Cell from "./Cell";

function Grid(props) {
  const { grid } = props;
  const rows = [];

  function cells(row) {
    const cells = [];
    for (let column = 0; column < grid[row].length; column++) {
      cells.push(
        <Cell key={`${row}-${column}`} blockNumber={grid[row][column]} />
      );
    }
    return cells;
  }

  for (let row = 0; row < grid.length; row++) {
    rows.push(
      <div className="row" key={row}>
        {cells(row)}
      </div>
    );
  }

  return rows;
}

export default Grid;
