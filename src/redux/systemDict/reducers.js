// Зависимости
import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { setObject } from '../../helpers/setObject';

export const handleFetchDictionary = handleActions(
  {
    [actions.fetchDictionary](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { params: {} }
);

export const handleSaveDictionary = handleActions(
  {
    [actions.saveDictionary](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.updateDictionary](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.deleteDictionary](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { params: {} }
);

export const handleSystemsDictionaryErrorSuccess = handleActions(
  {
    [actions.fetchDictionarySuccess](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.updateDictionarySuccess](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.deleteDictionarySuccess](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.systemsDictionaryError](state, { payload }) {
      return setObject(state, payload);
    },
  },
  {
    state: false,
    data: {},
  }
);
