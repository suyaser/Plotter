import {
  FETCH_FIRMWARE_SUCCESS,
  FETCH_FIRMWARE_FAIL,
  SCAN_FIRMWARES_SUCCESS,
  SCAN_FIRMWARES_FAIL,
  SELECT_FIRMWARE
} from '../actions/firmware';
import { object } from 'prop-types';

const initState = {
  firmwares: [],
  selectedFirmware: null,
  fetchError: false,
  fetchErrorMsg: '',
  scanError: false,
  scanErrorMsg: ''
};

const firmware = (state = initState, action) => {
  switch (action.type) {
    case SELECT_FIRMWARE:
      return Object.assign({}, state, { selectedFirmware: action.firmware });
    case FETCH_FIRMWARE_SUCCESS:
      return Object.assign({}, state, {
        fetchError: false,
        fetchErrorMsg: ''
      });
    case FETCH_FIRMWARE_FAIL:
      return Object.assign({}, state, {
        fetchError: true,
        fetchErrorMsg: action.error,
        selectedFirmware: null
      });
    case SCAN_FIRMWARES_SUCCESS:
      return Object.assign({}, state, {
        scanError: false,
        scanErrorMsg: '',
        firmwares: action.data
      });
    case SCAN_FIRMWARES_FAIL:
      return Object.assign({}, state, {
        scanError: true,
        scanErrorMsg: action.error,
        firmwares: []
      });
    default:
      return state;
  }
};

export default firmware;
