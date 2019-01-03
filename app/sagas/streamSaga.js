import { delay } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import {
  POLL_STREAM,
  END_CONNECTION,
  CONNECT,
  FETCH_SIGNALS,
  FETCH_SIGNALS_SUCESSFULL,
  FETCH_SIGNALS_FAILED,
  fetchSignals
} from '../actions/plotter';
import { connect, pollStream, endConnection } from './streamComm';

var messages = require('../../grpc/proto/proto_pb');
var services = require('../../grpc/proto/proto_grpc_pb');
var grpc = require('grpc');
const util = require('util');
var path = require('path');
const childProcess = require('child_process');

let client = null;
let call = null;
let server = null;

export function* _connect() {
  console.log(process.resourcesPath);
  console.log(__dirname);
  server = yield childProcess.spawn(
    'javaw',
    ['-jar', `${path.join(__dirname, '../CRE', 'test.jar')}`],
    { detached: true }
  );
  client = yield new services.CTEClient(
    `localhost:50051`,
    grpc.credentials.createInsecure()
  );
  call = yield client.startStream();

  yield put(fetchSignals());
}

export function* _disconnect() {
  if (client) yield client.close();
  client = null;

  if (call) yield call.end();
  call = null;

  console.log(server);
  yield server.kill('SIGTERM');
}

export function* _fetchSignals() {
  const promise = new Promise((resolve, reject) => {
    client.getSignals(new messages.Empty(), (err, resp) => {
      if (err) reject(err);
      resolve(resp);
    });
  });
  try {
    const response = yield promise;
    yield put({
      type: 'FETCH_SIGNALS_SUCESSFULL',
      signals: response.getDataList().map(x => ({ value: x, label: x }))
    });
  } catch (err) {
    yield put({ type: 'FETCH_SIGNALS_FAILED', error: err });
  }
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
  yield takeLatest(FETCH_SIGNALS, _fetchSignals);
}
