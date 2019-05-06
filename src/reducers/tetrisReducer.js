import {handleActions} from "redux-actions";
import {DROP, HOLD, MOVE_LEFT, MOVE_RIGHT, RESET, ROTATE, TICK} from "../tetris/types";
import {doDrop, doHold, doMoveLeft, doMoveRight, doReset, doRotate, doTick, initialState} from "../tetris/operations";


export default handleActions(
  {
    [TICK]: state => doTick(state),
    [MOVE_LEFT]: state => doMoveLeft(state),
    [MOVE_RIGHT]: state => doMoveRight(state),
    [ROTATE]: state => doRotate(state),
    [DROP]: state => doDrop(state),
    [RESET]: state => doReset(state),
    [HOLD]: state => doHold(state)
  },
  initialState()
);
