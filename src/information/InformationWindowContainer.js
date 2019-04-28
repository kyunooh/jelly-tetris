import { connect } from "react-redux";
import React from "react";
import InformationWindow from "./InformationWindow";
import * as tetrisReducer from "../reducers/tetrisReducer";

const InformationWindowContainer = props => {

  const handleReset = () => {
      props.reset();
  };

  return (
    <InformationWindow
      removedLines={props.removedLines}
      levels={props.levels}
      reset={handleReset}
    />
  );
};


export default connect(
  state => ({...state.tetrisReducer }),
  dispatch => ({
    reset: () => dispatch(tetrisReducer.reset())
  })
)(InformationWindowContainer);