// @flow
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import createRootReducer from '../reducers';
import rootSaga from '../sagas/streamSaga';
import firmwareSaga from '../sagas/firmwareSaga';

const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();
const rootReducer = createRootReducer(history);
const enhancer = applyMiddleware(sagaMiddleware);

function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  sagaMiddleware.run(firmwareSaga);
  return store;
}

export default { configureStore, history };
