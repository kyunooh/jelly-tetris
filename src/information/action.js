import {createAction} from "redux-actions";
import {PAUSE_BGM, PLAY_BGM} from "./types";

export const playBgm = createAction(PLAY_BGM);
export const pauseBgm = createAction(PAUSE_BGM);