import { connect } from "react-redux";
import React from "react";
import InformationWindow from "./InformationWindow";
import * as tetrisActions from "../tetris/actions";


const InformationWindowContainer = props => {

  const handleReset = () => {
      props.reset();
      document.getElementById("prevent-reset").focus();
  };

  return (
    <InformationWindow
      nextBlock={props.nextBlock}
      holdBlock={props.holdBlock}
      removedLines={props.removedLines}
      levels={props.levels}
      reset={handleReset}
    />
  );
};


export default connect(
  state => ({...state.tetrisReducer }),
  dispatch => ({
    reset: () => dispatch(tetrisActions.reset())
  })
)(InformationWindowContainer);
