import { delay } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import { POLL_STREAM, END_CONNECTION, CONNECT } from '../actions/plotter';
import { connect, pollStream, endConnection } from './streamComm';

var messages = require('../../grpc/proto/proto_pb');
var services = require('../../grpc/proto/proto_grpc_pb');
var grpc = require('grpc');
const util = require('util');

let client = null;
let call = null;

export function* _connect() {
  client = yield new services.CTEClient(
    `localhost:50051`,
    grpc.credentials.createInsecure()
  );
  call = yield client.startStream();
}

export function* _disconnect() {
  if (client) yield client.close();
  client = null;

  if (call) yield call.end();
  call = null;
}

export function* _pollStream(action) {
  const promise = new Promise((resolve, reject) => {
    var request = new messages.StreamDataRequest();
    var idsArray = [];
    if (action.signals.includes('AC')) idsArray.push(1);
    if (action.signals.includes('DC')) idsArray.push(2);
    request.setSignalidsList(idsArray);
    call.write(request);
    call.on('data', res => resolve(res));
    call.on('error', err => reject(err));
  });
  try {
    const response = yield promise;

    let updatedData = {};
    let name = null;
    for (const signal of response.getResponseList()) {
      name = signal.getId() === 1 ? 'AC' : 'DC';
      updatedData[name] = [];
      for (const sample of signal.getDataList()) {
        updatedData[name].push({
          timestamp: sample.getTimestamp(),
          data: sample.getValue()
        });
      }
    }
    yield put({ type: 'POLL_SUCESSFULL', data: updatedData });
  } catch (e) {
    yield put({ type: 'POLL_FAILED', error: e });
  }
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield takeLatest(CONNECT, _connect);
  yield takeLatest(END_CONNECTION, _disconnect);
  yield takeLatest(POLL_STREAM, _pollStream);
}
