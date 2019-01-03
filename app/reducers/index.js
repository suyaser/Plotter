// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import plotter from './plotter';
import firmware from './firmware';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    plotter,
    firmware
  });
}
