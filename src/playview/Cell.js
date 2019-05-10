import React from "react";
import "./Cell.scss";

function Cell(props) {
  return props.blockNumber ? (
    <span className={`cell fill-${props.blockNumber}`}>&nbsp;</span>
  ) : (
    <span className="cell empty">&nbsp;</span>
  );
}

export default Cell;
