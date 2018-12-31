import { Dispatch } from 'redux';

export const SELECT_SIGNAL = 'SELECT_SIGNAL';
export const CONNECT = 'CONNECT';
export const END_CONNECTION = 'END_CONNECTION';
export const POLL_STREAM = 'POLL_STREAM';
export const ADD_SIGNAL = 'ADD_SIGNAL';
export const REMOVE_SIGNAL = 'REMOVE_SIGNAL';
export const POLL_SUCESSFULL = 'POLL_SUCESSFULL';
export const POLL_FAILED = 'POLL_FAILED';

export const selectSignal = id => ({
  type: SELECT_SIGNAL,
  id: id
});

export const startConnection = () => ({
  type: CONNECT
});

export const endConnection = () => ({
  type: END_CONNECTION
});

export const pollStream = signals => ({
  type: POLL_STREAM,
  signals: signals
});

export const pollStreamSucessfull = () => ({
  type: POLL_SUCESSFULL
});

export const pollStreamFailed = () => ({
  type: POLL_FAILED
});

export const addSignal = id => ({
  type: ADD_SIGNAL,
  id: id
});

export const removeSignal = id => ({
  type: REMOVE_SIGNAL,
  id: id
});
