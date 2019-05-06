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
      <div id="audio-panel">
        <audio controls autoPlay={true} volume="0.2" loop>
          <source src="/tetris.ogg" type="audio/ogg; codecs=vorbis"/>
        </audio>
      </div>
      <button id="prevent-reset" style={{ width: "0px", height: "0px" }} />
      <button onClick={props.reset}>Reset</button>
    </div>
  );
};

export default InformationWindow;
