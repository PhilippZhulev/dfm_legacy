import { all, call, put, takeLatest, delay } from 'redux-saga/effects';
import { handleError, createMessage, SessionToken } from 'helpers';
import User from '../../services/api/user';
import Model from '../../services/api/model';

function* fetchUser(action) {
  try {
    const [user, permissions] = yield all([
      /** Запрос информации авторизованного пользователя */
      call(User.GetSession, action.payload.params),
      /** Запрос полномочий пользователя */
      call(User.GetPermissions, action.payload.params),
    ]);

    if (user.code === 200 && permissions.code === 200) {
      yield put({
        type: 'FETCH_USER_SUCCEEDED',
        payload: {
          ...user.data,
          permissions: permissions.data,
          state: true,
        },
      });

      yield put({
        type: 'MODEL_INIT',
        payload: {
          params:
            localStorage.getItem('model') !== null
              ? { model: JSON.parse(localStorage.getItem('model')) }
              : {},
        },
      });
    } else {
      yield createMessage(put, delay, user.msg || permissions.msg);
    }
  } catch (e) {
    yield handleError('@user/sagas/fetchUser', e);
  }
}

function* logoutUser(action) {
  try {
    const clearRes = yield call(Model.ModelClearCache, action.payload.params);
    if (clearRes.code === 200) {
      const res = yield call(User.Logout, action.payload.params);
      if (res.code === 200) {
        SessionToken.removeItem();

        yield put({
          type: 'FETCH_USER_SUCCEEDED',
          payload: {
            state: false,
          },
        });

        yield (window.toLogin = false);
        yield action.payload.route.push('/dfm_it/login');
      } else {
        yield createMessage(put, delay, res.msg);
      }
    } else {
      yield createMessage(put, delay, clearRes.msg);
    }
  } catch (e) {
    yield handleError('@user/sagas/logoutUser', e);
  }
}

function* initSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('LOGOUT_USER', logoutUser);
}

export default initSaga;
