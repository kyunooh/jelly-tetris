import {combineReducers} from 'redux';
import tetrisReducer from "./reducers/tetrisReducer";

const createReducer = asyncReducers =>
  combineReducers({
    tetrisReducer,
    ...asyncReducers
  });

export default createReducer;