import { delay } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_FIRMWARE, SCAN_FIRMWARES } from '../actions/firmware';
import convert from 'xml-js';
import axios from 'axios';

export function* scan() {
  try {
    const response = yield axios.get(
      'http://cai1-sv00075/eclipse/config/configVersions.xml'
    );
    const result = convert.xml2js(response.data, {
      compact: true
    });
    yield put({
      type: 'SCAN_FIRMWARES_SUCCESS',
      data: result.config.firmwares.firmware.map(x => ({
        value: x,
        label: x._attributes.id
      }))
    });
  } catch (e) {
    yield put({ type: 'SCAN_FIRMWARES_FAIL', error: e });
  }
}

export function* fetch() {
  try {
    const response = yield axios.get(
      'http://cai1-sv00075/eclipse/config/configVersions.xml'
    );
    const result = convert.xml2js(response.data, {
      compact: true
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

// single entry point to start all Sagas at once
export default function* firmwareSaga() {
  yield takeLatest(SCAN_FIRMWARES, scan);
  yield takeLatest(FETCH_FIRMWARE, fetch);
}
