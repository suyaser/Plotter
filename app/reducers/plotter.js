import {
  SELECT_SIGNAL,
  CONNECT,
  END_CONNECTION,
  POLL_STREAM,
  ADD_SIGNAL,
  REMOVE_SIGNAL,
  POLL_SUCESSFULL,
  POLL_FAILED
} from '../actions/plotter';

const initState = {
  options: [{ value: 'AC', label: 'AC' }, { value: 'DC', label: 'DC' }],
  selectedOption: null,
  streamChannels: [],
  data: {},
  connected: false,
  error: { state: false, msg: '' },
  maxSize: 20000
};

const plotter = (state = initState, action) => {
  switch (action.type) {
    case ADD_SIGNAL:
      return Object.assign({}, state, {
        streamChannels: [...state.streamChannels, action.id]
      });
    case REMOVE_SIGNAL:
      const index = state.streamChannels.indexOf(action.id);
      return index > -1
        ? Object.assign({}, state, {
            streamChannels: state.streamChannels.splice(index, 1)
          })
        : state;
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
    case POLL_SUCESSFULL:
      const newData = {};
      console.log(state.streamChannels);
      for (const signal of state.streamChannels) {
        console.log(signal);
        newData[signal] = action.data[signal];
        if (state.data[signal])
          newData[signal] = [...state.data[signal], ...action.data[signal]];
        console.log(newData);
        while (newData[signal].length > state.maxSize) {
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
