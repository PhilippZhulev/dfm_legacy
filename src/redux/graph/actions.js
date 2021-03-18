/*
 * desc: REDUX ACTIONS
 * Хранилище action handlers
 * ver: 1.0.0
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import { createAction } from 'redux-actions';

// Основное событие
export const graphInit = createAction('GRAPH_INIT');
export const graphSuccess = createAction('GRAPH_SUCCESS');
export const graphSettings = createAction('GRAPH_SETTINGS');
export const graphCalc = createAction('GRAPH_CALC');
