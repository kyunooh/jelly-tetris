import React from "react";
import "./InformationWindow.scss";
import Row from "../playview/Row";

const InformationWindow = props => {
  const nextBlockGrid = (block) => {
    const padding = 1;
    const nextBlockGrid = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    for (let r = 0; r < block.length; r++) {
      for (let c = 0; c < block[r].length; c++) {
          nextBlockGrid[r+padding][c+padding] = block[r][c];
      }
    }
    return nextBlockGrid;
  };

  return (
    <div id="information-window">
        <Row grid={nextBlockGrid(props.nextBlock)}/>
        <div id="removed-lines">Lines: {props.removedLines}</div>
      <div id="levels">Level: {props.levels}</div>
      <button id="prevent-reset" style={{ width: "0px", height: "0px" }} />
      <button onClick={props.reset}>Reset</button>
    </div>
  );
};

export default InformationWindow;
