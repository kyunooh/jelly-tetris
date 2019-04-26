import { connect } from "react-redux";
import * as tetrisReducer from "../reducers/tetrisReducer";
import PlayView from "./PlayView";
import React from "react";

const PlayViewContainer = props => {
  const handleTick = () => {
    props.tick();
  };
  const handleMoveLeft = () => {
    props.moveLeft();
  };
  const handleMoveRight = () => {
    props.moveRight();
  };
  const handleRotate = () => {
    props.rotate();
  };

  return (
    <PlayView
      tick={handleTick}
      moveLeft={handleMoveLeft}
      moveRight={handleMoveRight}
      rotate={handleRotate}
      grid={props.grid}
      gameOver={props.gameOver}
    />
  );
};

export default connect(
  state => ({ ...state.grid }),
  dispatch => ({
    tick: () => dispatch(tetrisReducer.tick()),
    moveLeft: () => dispatch(tetrisReducer.moveLeft()),
    moveRight: () => dispatch(tetrisReducer.moveRight()),
    rotate: () => dispatch(tetrisReducer.rotate())
  })
)(PlayViewContainer);
