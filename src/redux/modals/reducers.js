// Зависимости
import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { setObject } from '../../helpers/setObject';

const defaultParams = {
  type: '',
  state: false,
  title: '',
  buttonText: '',
  text: '',
  titleSize: 'auto',
  hideButton: false,
  cross: false,
  params: {},
  done: () => {},
};


export const handleModalAction = handleActions(
  {
    [actions.modalAction](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.closeAction](state, { payload }) {
      return {
        ...state,
        ...payload,
        ...defaultParams,
      };
    },
  }, defaultParams);
