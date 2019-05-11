import React from "react";
import "./InformationWindow.scss";
import Grid from "../playview/Grid";

class InformationWindow extends React.Component {
  componentDidUpdate() {
    this.setBgm();
  }

  setBgm() {
    const bgmEl = this.props.bgmAudio.current;
    console.log(bgmEl);
    if (bgmEl) {
      bgmEl.playbackRate = 0.96 + 0.04 * this.props.levels;
      if (this.props.playBgm) {
        bgmEl.play();
      } else {
        bgmEl.pause();
      }
    }
  };


  render() {
    return (
      <div id="information-window">
        <Grid grid={BlockGrid(this.props.nextBlock)} />
        <div>NEXT</div>
        <Grid grid={BlockGrid(this.props.holdBlock)} />
        <div>HOLD (shift)</div>

        <div id="removed-lines">Lines: {this.props.removedLines}</div>
        <div id="levels">Level: {this.props.levels}</div>
        <button
          id="prevent-reset"
          ref={this.props.preventFocus}
          style={{ width: "0px", height: "0px" }}
        />
        <button className="reset-button" onClick={this.props.reset}>
          Reset
        </button>
        <div id="audio-panel">
          <audio
            id="bgm-audio"
            ref={this.props.bgmAudio}
            controls
            onPause={this.props.pauseBgm}
            onPlay={this.props.playBgm}
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
  }
}

const PADDING = 1;
const BlockGrid = block => {
  const emptyRow = Array(5).fill(0);
  const blockGrid = [
    [...emptyRow],
    [...emptyRow],
    [...emptyRow],
    [...emptyRow]
  ];

  for (let r = 0; r < block.length; r++) {
    for (let c = 0; c < block[r].length; c++) {
      blockGrid[r + PADDING][c + PADDING] = block[r][c];
    }
  }
  return blockGrid;
};

export default InformationWindow;
