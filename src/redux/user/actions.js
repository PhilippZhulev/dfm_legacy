/*
 * desc: REDUX ACTIONS
 * Хранилище action handlers
 * ver: 1.0.0
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import { createAction } from 'redux-actions';

// Основное событие
export const fetchUser = createAction('FETCH_USER');
export const logoutUser = createAction('LOGOUT_USER');
export const fetchUserSuccess = createAction('FETCH_USER_SUCCEEDED');
export const fetchUserError = createAction('FETCH_USER_ERROR');
