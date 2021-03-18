import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { handleError, createMessage, SessionToken } from 'helpers';
import Login from '../../services/api/login';

function* LoginUser(action) {
  try {
    const res = yield call(Login.AuthUser, action.payload.params);

    if (res.code === 200) {
      SessionToken.setItem(res.data.accessToken);

      yield put({
        type: 'LOGIN_SUCCEEDED',
        payload: { response: res },
      });
      yield put({
        type: 'FETCH_USER',
        payload: {},
      });

      yield (window.toLogin = true);
      yield action.payload.route.push('/dfm_it/model');
    } else {
      yield put({
        type: 'LOGIN_ERROR',
        payload: {
          response: {
            code: res.data,
            message: res.msg,
          },
        },
      });

      yield createMessage(put, delay, res.msg);
    }
  } catch (e) {
    yield handleError('@login/sagas/LoginUser', e);
  }
}

function* initSaga() {
  yield takeLatest('LOGIN_APP', LoginUser);
}

export default initSaga;
