import { handleActions } from "redux-actions";
import {
  DROP,
  HOLD,
  MOVE_LEFT,
  MOVE_RIGHT,
  PAUSE_BGM,
  PLAY_BGM,
  RESET,
  ROTATE,
  TICK
} from "../tetris/types";
import {
  doDrop,
  doHold,
  doMoveLeft,
  doMoveRight,
  doPauseBgm,
  doPlayBgm,
  doReset,
  doRotate,
  doTick,
  initialState
} from "../tetris/operations";

export default handleActions(
  {
    [TICK]: state => doTick(state),
    [MOVE_LEFT]: state => doMoveLeft(state),
    [MOVE_RIGHT]: state => doMoveRight(state),
    [ROTATE]: state => doRotate(state),
    [DROP]: state => doDrop(state),
    [RESET]: state => doReset(state),
    [HOLD]: state => doHold(state),
    [PLAY_BGM]: state => doPlayBgm(state),
    [PAUSE_BGM]: state => doPauseBgm(state)
  },
  initialState()
);
