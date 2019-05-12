import { connect } from "react-redux";
import React from "react";
import InformationWindow from "./InformationWindow";
import * as tetrisActions from "../playview/actions";
import { pauseBgm, playBgm } from "./action";

const InformationWindowContainer = props => {
  const preventFocus = React.createRef();
  const bgmAudio = React.createRef();

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
      isPlayBgm={props.isPlayBgm}
      preventFocus={preventFocus}
      bgmAudio={bgmAudio}
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
    pauseBgm: () => dispatch(pauseBgm()),
    playBgm: () => dispatch(playBgm())
  })
)(InformationWindowContainer);
