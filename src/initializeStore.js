import {applyMiddleware, compose, createStore} from "redux";
import createReducer from "./rootReducer";
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from "./sagas";

const initializeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    createReducer(),
    compose(applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
  store.asyncReducers = {};

  store.injectReducer = (key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  sagaMiddleware.run(rootSaga);

  return store;
};

export default initializeStore;
