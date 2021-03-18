import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { createMessage, handleWarn } from 'helpers';
import SystemDict from '../../services/api/systemDict';

/**
 * ANCHOR: Получить список системных справочников saga
 * @param {object} action
 * @public
 */
function* fetchDictionary(action) {
  try {
    if (!Array.isArray(action.payload.params.type)) {
      action.payload.params.type = [action.payload.params.type];
    }

    const res = yield call(
      SystemDict.getSystemDictionaries,
      action.payload.params
    );

    if (res.code === 200) {
      yield put({
        type: 'FETCH_DICTIONARY_SUCCEEDED',
        payload: {
          data: res.data.length === 1 ? res.data[0] : res.data,
          state: true,
        },
      });
    } else {
      yield createMessage(put, delay, res.msg);
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Редактирование системного справочника saga
 * @param {object} action
 * @public
 */
function* updateDictionary(action) {
  try {
    const res = yield call(
      SystemDict.updateSystemDictionaries,
      action.payload.params
    );

    if (res.code === 200 || res.code === 201) {
      yield put({
        type: 'UPDATE_DICTIONARY_SUCCEEDED',
        payload: { data: res.data, state: true },
      });

      yield createMessage(put, delay, 'Системный справочник изменен');
    } else {
      yield createMessage(
        put,
        delay,
        'Ошибка изменения системного справочника'
      );
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Удаление элемента системного справочника saga
 * @param {object} action
 * @public
 */
function* deleteDictionary(action) {
  try {
    const res = yield call(
      SystemDict.deleteSystemDictionaries,
      action.payload.params
    );

    if (res.code === 200 || res.code === 201) {
      yield put({
        type: 'DELETE_DICTIONARY_SUCCEEDED',
        payload: { data: res.data, state: true },
      });

      yield createMessage(put, delay, 'Элемент системного справочника удален');
    } else {
      yield createMessage(
        put,
        delay,
        'Ошибка удаления элемента системного справочника'
      );
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * ANCHOR: Сохранение системного справочника saga
 * @param {object} action
 * @public
 */
function* saveDictionary(action) {
  try {
    if (action.payload.params.updateData) {
      const resUpdated = yield call(
        SystemDict.updateSystemDictionaries,
        action.payload.params.updateData
      );
      if (resUpdated.code !== 200) {
        yield createMessage(
          put,
          delay,
          'Ошибка изменения системного справочника'
        );
        return;
      }
    }

    if (action.payload.params.deleteData) {
      const resDeleted = yield call(
        SystemDict.deleteSystemDictionaries,
        action.payload.params.deleteData
      );
      if (resDeleted.code !== 200) {
        yield createMessage(
          put,
          delay,
          'Ошибка удаления элемента системного справочника'
        );
        return;
      }
    }

    const res = yield call(
      SystemDict.getSystemDictionaries,
      action.payload.params.getData
    );

    if (res.code === 200 || res.code === 201) {
      yield put({
        type: 'FETCH_DICTIONARY_SUCCEEDED',
        payload: { data: res.data, state: true },
      });

      yield createMessage(put, delay, 'Системный справочник обновлен');
    } else {
      yield createMessage(
        put,
        delay,
        'Ошибка изменения системного справочника. Свяжитесь с администратором.'
      );
    }
  } catch (e) {
    yield handleWarn(e);
  }
}

function* initSaga() {
  yield takeLatest('FETCH_DICTIONARY', fetchDictionary);
  yield takeLatest('UPDATE_DICTIONARY', updateDictionary);
  yield takeLatest('DELETE_DICTIONARY', deleteDictionary);
  yield takeLatest('SAVE_DICTIONARY', saveDictionary);
}

export default initSaga;
