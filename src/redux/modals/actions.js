/*
 * desc: REDUX ACTIONS
 * Хранилище action handlers
 * ver: 1.0.0
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import { createAction } from 'redux-actions';

// Основное событие
export const modalAction = createAction('MODAL_ACTION');
export const closeAction = createAction('MODAL_CLOSE');
