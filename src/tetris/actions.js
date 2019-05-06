import {createAction, handleActions} from "redux-actions";
import {DROP, HOLD, MOVE_LEFT, MOVE_RIGHT, RESET, ROTATE, TICK} from "./types";


export const tick = createAction(TICK);
export const moveLeft = createAction(MOVE_LEFT);
export const moveRight = createAction(MOVE_RIGHT);
export const rotate = createAction(ROTATE);
export const drop = createAction(DROP);
export const reset = createAction(RESET);
export const hold = createAction(HOLD);

