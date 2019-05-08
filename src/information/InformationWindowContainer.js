import { connect } from "react-redux";
import React from "react";
import InformationWindow from "./InformationWindow";
import * as tetrisActions from "../tetris/actions";

const InformationWindowContainer = props => {
  const handleReset = () => {
    props.reset();
    document.getElementById("prevent-reset").focus();
  };

  const playBgm = () => {
    props.playBgm();
    document.getElementById("prevent-reset").focus();
  };

  const pauseBgm = () => {
    props.pauseBgm();
    document.getElementById("prevent-reset").focus();
  };

  return (
    <InformationWindow
      nextBlock={props.nextBlock}
      holdBlock={props.holdBlock}
      removedLines={props.removedLines}
      levels={props.levels}
      playBgm={playBgm}
      pauseBgm={pauseBgm}
      reset={handleReset}
    />
  );
};

export default connect(
  state => ({ ...state.tetrisReducer }),
  dispatch => ({
    reset: () => dispatch(tetrisActions.reset()),
    pauseBgm: () => dispatch(tetrisActions.pauseBgm()),
    playBgm: () => dispatch(tetrisActions.playBgm())
  })
)(InformationWindowContainer);
