import {createAction} from "redux-actions";
import {DROP, HOLD, MOVE_LEFT, MOVE_RIGHT, ROTATE, TICK, TICK_TIMER} from "./types";
import {RESET} from "../information/types";

export const tick = createAction(TICK);
export const moveLeft = createAction(MOVE_LEFT);
export const moveRight = createAction(MOVE_RIGHT);
export const rotate = createAction(ROTATE);
export const drop = createAction(DROP);
export const reset = createAction(RESET);
export const hold = createAction(HOLD);
export const tickTimer = createAction(TICK_TIMER);