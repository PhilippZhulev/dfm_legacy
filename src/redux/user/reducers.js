// Зависимости
import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { setObject } from '../../helpers/setObject';

export const handleFetchUser = handleActions(
  {
    [actions.fetchUser](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { params: {} }
);

export const handleLogoutUser = handleActions(
  {
    [actions.logoutUser](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { params: {} }
);

export const handleFetchUserSuccess = handleActions(
  {
    [actions.fetchUserSuccess](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.fetchUserError](state, { payload }) {
      return setObject(state, payload);
    },
  },
  {
    state: false,
    avatar: '',
    login: 'n/a',
    fullName: 'n/a',
    permissions: [],
    position: 'default',
    roles: [{ label: 'n/a' }],
    username: 'n/a',
  }
);
