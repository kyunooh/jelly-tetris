import { connect } from "react-redux";
import * as terisActions from "../tetris/actions";
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
    tick: () => dispatch(terisActions.tick()),
    moveLeft: () => dispatch(terisActions.moveLeft()),
    moveRight: () => dispatch(terisActions.moveRight()),
    rotate: () => dispatch(terisActions.rotate()),
    drop: () => dispatch(terisActions.drop()),
    tickTimer: levels => dispatch({ type: "WATCH_TICK", levels }),
    hold: () => dispatch(terisActions.hold())
  })
)(PlayViewContainer);
