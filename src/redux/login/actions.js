/*
 * desc: REDUX ACTIONS
 * Хранилище action handlers
 * ver: 1.0.0
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import { createAction } from 'redux-actions';

// Основное событие
export const loginInit = createAction('LOGIN_APP');
export const loginSuccess = createAction('LOGIN_SUCCEEDED');
export const loginError = createAction('LOGIN_ERROR');
