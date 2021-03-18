// Зависимости
import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { setObject } from '../../helpers/setObject';

export const handleLoginApp = handleActions(
  {
    [actions.loginInit](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { params: {} }
);

export const handleLoginSuccess = handleActions(
  {
    [actions.loginSuccess](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.loginError](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { response: null }
);
