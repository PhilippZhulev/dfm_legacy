// Зависимости
import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { setObject } from '../../helpers/setObject';

export const handleMessage = handleActions(
  {
    [actions.message](state, { payload }) {
      return setObject(state, payload);
    },
  },
  {}
);

export const handleMessageEvent = handleActions(
  {
    [actions.messageEvent](state, { payload }) {
      return setObject(state, payload);
    },
  },
  {
    text: '',
    state: false,
  }
);
