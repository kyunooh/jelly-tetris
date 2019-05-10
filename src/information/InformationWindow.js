import React from "react";
import "./InformationWindow.scss";
import Grid from "../playview/Grid";

const InformationWindow = props => {
  return (
    <div id="information-window">
      <Grid grid={BlockGrid(props.nextBlock)} />
      <div>NEXT</div>
      <Grid grid={BlockGrid(props.holdBlock)} />
      <div>HOLD (shift)</div>

      <div id="removed-lines">Lines: {props.removedLines}</div>
      <div id="levels">Level: {props.levels}</div>
      <button
        id="prevent-reset"
        ref={props.preventFocus}
        style={{ width: "0px", height: "0px" }}
      />
      <button className="reset-button" onClick={props.reset}>
        Reset
      </button>
      <div id="audio-panel">
        <audio
          id="bgm-audio"
          controls
          onPause={props.pauseBgm}
          onPlay={props.playBgm}
          loop
        >
          <source
            src="http://jellyms.kr/jelly-tetris/tetris.ogg"
            type="audio/ogg; codecs=vorbis"
          />
        </audio>
      </div>
    </div>
  );
};

const BlockGrid = block => {
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

export default InformationWindow;
