/*
 * name: SYSTEMS DICTIONARY ACTIONS
 * desc: REDUX ACTIONS
 * Хранилище action handlers
 * ver: 1.0.0
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import { createAction } from 'redux-actions';

// Основное событие
export const fetchDictionary = createAction('FETCH_DICTIONARY');
export const updateDictionary = createAction('UPDATE_DICTIONARY');
export const deleteDictionary = createAction('DELETE_DICTIONARY');
export const saveDictionary = createAction('SAVE_DICTIONARY');

export const fetchDictionarySuccess = createAction('FETCH_DICTIONARY_SUCCEEDED');
export const updateDictionarySuccess = createAction('UPDATE_DICTIONARY_SUCCEEDED');
export const deleteDictionarySuccess = createAction('DELETE_DICTIONARY_SUCCEEDED');

export const systemsDictionaryError = createAction('SYSTEMS_DICTIONARY_ERROR');
