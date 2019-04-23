import {combineReducers} from 'redux';
import grid from "./reducers/gridReducer";

const createReducer = asyncReducers =>
  combineReducers({
    grid,
    ...asyncReducers
  });

export default createReducer;