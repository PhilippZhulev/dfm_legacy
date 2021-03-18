import { call, put, delay, takeLatest } from 'redux-saga/effects';

function* message(action) {
  yield put({
    type: 'MESSAGE',
    payload: action.payload,
  });
  yield delay(3000);
  yield put({
    type: 'MESSAGE',
    payload: {
      text: '',
      state: false,
    },
  });
}

function* initFetchUser() {
  yield takeLatest('MESSAGE_EVENT', message);
}

export default initFetchUser;
