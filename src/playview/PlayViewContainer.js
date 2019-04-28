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
  const handleDrop = () => {
    props.drop();
  };

  const tickTimer = (levels) => {
    props.tickTimer(levels);
  };

  return (
    <PlayView
      tick={handleTick}
      moveLeft={handleMoveLeft}
      moveRight={handleMoveRight}
      rotate={handleRotate}
      drop={handleDrop}
      tickTimer={tickTimer}
      grid={props.grid}
      levels={props.levels}
      gameOver={props.gameOver}
      reservedTick={props.reservedTick}
    />
  );
};

export default connect(
  state => ({ ...state.tetrisReducer }),
  dispatch => ({
    tick: () => dispatch(tetrisReducer.tick()),
    moveLeft: () => dispatch(tetrisReducer.moveLeft()),
    moveRight: () => dispatch(tetrisReducer.moveRight()),
    rotate: () => dispatch(tetrisReducer.rotate()),
    drop: () => dispatch(tetrisReducer.drop()),
    tickTimer: (levels) => dispatch({ type: "WATCH_TICK", levels })
  })
)(PlayViewContainer);
