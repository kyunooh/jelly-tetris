import { all, takeLatest, select, put } from "redux-saga/effects";
import {tick} from "./tetris/actions";
import {TICK_TIMER} from "./tetris/types";

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* tickSaga() {
  const levels = yield select((state) => state.tetrisReducer.levels);

  yield delay(1000 * Math.pow(0.85, levels));
  yield put(tick());
}

export function* watchTickSaga() {
  yield takeLatest(TICK_TIMER, () => tickSaga());
}

export function* rootSaga() {
  yield all([watchTickSaga()]);
}
