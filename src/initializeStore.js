import {applyMiddleware, compose, createStore} from "redux";
import createReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
);

const initializeStore = () => {
  const store = createStore(createReducer(), enhancer);
  store.asyncReducers = {};

  store.injectReducer = (key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  sagaMiddleware.run(rootSaga);

  return store;
};

export default initializeStore;
