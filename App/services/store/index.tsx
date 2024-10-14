import {createInjectorsEnhancer} from 'redux-injectors';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createReducer} from './reducers';

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const {run: runSaga} = sagaMiddleware;

  const reducers = createReducer();

  // Create the store with saga middleware
  let middlewares = [sagaMiddleware];

  // LOG ONLY IN DEVELOPMENT/STAGING PRODUCTION OPTIMIZATIONS
  if (__DEV__) {
    middlewares = [...middlewares];
  }
  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    //@ts-ignore
    reducer: reducers,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false
      }).concat(
        createLogger({
          collapsed: true,
          duration: true,
          timestamp: true,
        }),
      ),
      ...middlewares,
    ],
    enhancers,
  });
  return {store};
}
