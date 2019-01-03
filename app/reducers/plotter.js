import {
  SELECT_SIGNAL,
  CONNECT,
  END_CONNECTION,
  POLL_STREAM,
  ADD_SIGNAL,
  REMOVE_SIGNAL,
  POLL_SUCESSFULL,
  POLL_FAILED,
  FETCH_SIGNALS_SUCESSFULL,
  FETCH_SIGNALS_FAILED
} from '../actions/plotter';

const initState = {
  options: [{ value: 'AC', label: 'AC' }, { value: 'DC', label: 'DC' }],
  selectedOption: null,
  streamChannels: [],
  data: {},
  connected: false,
  error: { state: false, msg: '' },
  signals: [],
  maxSize: 20000
};

const plotter = (state = initState, action) => {
  switch (action.type) {
    case ADD_SIGNAL:
      return state.streamChannels.includes(action.id)
        ? state
        : Object.assign({}, state, {
            streamChannels: [...state.streamChannels, action.id]
          });
    case REMOVE_SIGNAL:
      const index = state.streamChannels.indexOf(action.id);
      let channels = state.streamChannels;
      index > -1 && channels.splice(index, 1);
      return Object.assign({}, state, {
        streamChannels: channels
      });
    case SELECT_SIGNAL:
      return Object.assign({}, state, {
        selectedOption: action.id
      });
    case CONNECT:
      return Object.assign({}, state, {
        error: { state: false, msg: '' },
        connected: true
      });
    case END_CONNECTION:
      return Object.assign({}, state, {
        error: { state: false, msg: '' },
        connected: false
      });
    case FETCH_SIGNALS_SUCESSFULL:
      return Object.assign({}, state, {
        signals: action.signals
      });
    case FETCH_SIGNALS_FAILED:
      return Object.assign({}, state, {
        error: { state: true, msg: action.error }
      });
    case POLL_SUCESSFULL:
      const newData = {};
      for (const signal of state.streamChannels) {
        newData[signal] = action.data[signal];
        if (state.data[signal])
          newData[signal] = [...state.data[signal], ...action.data[signal]];
        while (newData[signal] && newData[signal].length > state.maxSize) {
          newData[signal].shift();
        }
      }
      return Object.assign({}, state, {
        data: newData
      });
    case POLL_FAILED:
      return Object.assign({}, state, {
        error: { state: true, msg: action.error }
      });
    default:
      return state;
  }
};

export default plotter;
