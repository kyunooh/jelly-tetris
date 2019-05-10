import { connect } from "react-redux";
import React from "react";
import InformationWindow from "./InformationWindow";
import * as tetrisActions from "../tetris/actions";

const InformationWindowContainer = props => {
  const preventFocus = React.createRef();

  const handleReset = () => {
    props.reset();
    preventFocus.current.focus();
  };

  const playBgm = () => {
    props.playBgm();
    preventFocus.current.focus();
  };

  const pauseBgm = () => {
    props.pauseBgm();
    preventFocus.current.focus();
  };

  return (
    <InformationWindow
      nextBlock={props.nextBlock}
      holdBlock={props.holdBlock}
      removedLines={props.removedLines}
      levels={props.levels}
      preventFocus={preventFocus}
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
