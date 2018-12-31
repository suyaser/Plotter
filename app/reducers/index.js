// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import plotter from './plotter';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    plotter
  });
}
