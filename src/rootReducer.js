import {combineReducers} from 'redux';
import grid from "./reducers/tetrisReducer";

const createReducer = asyncReducers =>
  combineReducers({
    grid,
    ...asyncReducers
  });

export default createReducer;