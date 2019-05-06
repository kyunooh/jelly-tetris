import React from "react";
import "./InformationWindow.scss";
import Row from "../playview/Row";

const InformationWindow = props => {
  const blockGird = block => {
    const padding = 1;
    const blockGrid = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
    for (let r = 0; r < block.length; r++) {
      for (let c = 0; c < block[r].length; c++) {
        blockGrid[r + padding][c + padding] = block[r][c];
      }
    }
    return blockGrid;
  };

  return (
    <div id="information-window">
      <Row grid={blockGird(props.nextBlock)} />
      <div>NEXT</div>
      <Row grid={blockGird(props.holdBlock)} />
      <div>HOLD</div>

      <div id="removed-lines">Lines: {props.removedLines}</div>
      <div id="levels">Level: {props.levels}</div>
      <button id="prevent-reset" style={{ width: "0px", height: "0px" }} />
      <button className="reset-button" onClick={props.reset}>Reset</button>
      <div id="audio-panel">
        <audio controls autoPlay={true} loop>
          <source src="/jelly-tetris/tetris.ogg" type="audio/ogg; codecs=vorbis"/>
        </audio>
      </div>
    </div>
  );
};

export default InformationWindow;
