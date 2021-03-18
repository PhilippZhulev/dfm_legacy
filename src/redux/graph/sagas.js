import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { handleError, createMessage } from 'helpers';
import { virualStore } from '../../virtualStore';
import Middleware from '../../services/middleware/index.js';

function* GraphInit(action) {
  try {
    const { model } = virualStore;

    const res = yield call(
      Middleware.GetDumpData,
      model,
      action.payload.params,
      'graphCompile'
    );

    if (res.completed) {
      yield put({
        type: 'GRAPH_SUCCESS',
        payload: {
          data: res.data,
          updater: Math.random(),
        },
      });
    } else {
      yield createMessage(put, delay, 'Ошибка компиляции графа');
    }
  } catch (e) {
    yield handleError('@graph/sagas/GraphInit', e);
  }
}

function* GraphSettings(action) {
  try {
    localStorage.setItem(
      'graphSettings',
      JSON.stringify(action.payload.settings)
    );
  } catch (e) {
    yield handleError('@graph/sagas/GraphInit', e);
  }
}

function* initGraphSaga() {
  yield takeLatest('GRAPH_INIT', GraphInit);
  yield takeLatest('GRAPH_SETTINGS', GraphSettings);
}

export default initGraphSaga;
