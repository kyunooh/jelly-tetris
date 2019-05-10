import { connect } from "react-redux";
import * as tetrisActions from "../tetris/actions";
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

  const tickTimer = levels => {
    props.tickTimer(levels);
  };

  const handleHold = () => {
    props.hold();
  };

  return (
    <PlayView
      tick={handleTick}
      moveLeft={handleMoveLeft}
      moveRight={handleMoveRight}
      rotate={handleRotate}
      drop={handleDrop}
      tickTimer={tickTimer}
      hold={handleHold}
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
    tick: () => dispatch(tetrisActions.tick()),
    moveLeft: () => dispatch(tetrisActions.moveLeft()),
    moveRight: () => dispatch(tetrisActions.moveRight()),
    rotate: () => dispatch(tetrisActions.rotate()),
    drop: () => dispatch(tetrisActions.drop()),
    tickTimer: () => dispatch(tetrisActions.tickTimer()),
    hold: () => dispatch(tetrisActions.hold())
  })
)(PlayViewContainer);
