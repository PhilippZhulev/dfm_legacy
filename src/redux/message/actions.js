/*
 * desc: REDUX ACTIONS
 * Хранилище action handlers
 * ver: 1.0.0
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import { createAction } from 'redux-actions';

// Основное событие
export const message = createAction('MESSAGE');
export const messageEvent = createAction('MESSAGE_EVENT');
