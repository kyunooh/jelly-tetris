import {handleActions} from "redux-actions";
import {DROP, HOLD, MOVE_LEFT, MOVE_RIGHT, ROTATE, TICK} from "../playview/types";
import {
  doTick
} from "../playview/operations/gridOperations";
import {doPauseBgm, doPlayBgm, doReset} from "../information/operations";
import {PAUSE_BGM, PLAY_BGM, RESET} from "../information/types";
import {doDrop, doHold, doMoveLeft, doMoveRight, doRotate} from "../playview/operations/controlOperations";

export const JELLY_TETRIS = "jelly-tetris";
export const initialState = state => {
  const existTetris = localStorage.getItem(JELLY_TETRIS);
  if (existTetris) {
    return JSON.parse(existTetris);
  }
  return {
    newBlock: true,
    gameOver: false,
    dropping: false,
    hold: false,
    canHold: true,
    removedLines: 0,
    levels: 1,
    currentBlock: [],
    currentBlockNumber: -1,
    nextBlock: [],
    nextBlockNumber: -1,
    holdBlock: [],
    isPlayBgm: state ? state.isPlayBgm : true,
    temporaryHoldBlockNumber: 0,
    currentBlockLocation: [0, 0],
    grid: Array(16).fill(Array(10).fill(0))
  };
};

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
