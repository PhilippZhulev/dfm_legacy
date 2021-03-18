/*
 * desc: REDUX ACTIONS
 * Хранилище action handlers
 * ver: 1.0.0
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import { createAction } from 'redux-actions';

// Основное событие
export const modelInit = createAction('MODEl_INIT');
export const modelSuccesed = createAction('MODEl_SUCCEEDED');
export const modelError = createAction('MODEl_ERROR');

export const modelList = createAction('MODEL_LIST');
export const modelCopy = createAction('MODEL_COPY');
export const modelDelete = createAction('MODEL_DELETE');
export const modelCreate = createAction('MODEL_CREATE');
export const modelWhatIfCreate = createAction('MODEL_WHATIF_CREATE');
export const modelSelect = createAction('MODEL_SELECT');
export const modelDangers = createAction('MODEL_DANGERS');
export const modelSelectSuccess = createAction('MODEL_SELECT_SUCCESS');
export const modelFavorite = createAction('MODEL_FAVORITE');
export const modelFavoriteSuccess = createAction('MODEL_FAVORITE_SUCCESS');
export const modelTariff = createAction('MODEL_TARIFF');
export const modelTariffSuccess = createAction('MODEL_TARIFF_SUCCESS');
export const modelLocked = createAction('MODEL_LOCKED');
export const modelReload = createAction('MODEL_RELOAD');
export const modelLockedSuccess = createAction('MODEL_LOCKED_SUCCESS');
export const modelListSuccess = createAction('MODEL_LIST_SUCCESS');
export const modelDump = createAction('MODEL_DUMP');
export const modelStatus = createAction('MODEL_STATUS');
export const modelChange = createAction('MODEL_CHANGE');
export const modelSave = createAction('MODEL_SAVE');
export const modelCalc = createAction('MODEL_CALC');
export const modelClearCache = createAction('MODEL_CLEAR_CACHE');
export const dictSave = createAction('MODEL_DICT_SAVE');
export const modelGetWhatIf = createAction('MODEL_GET_WHATIF');
export const modelGetWhatIfSuccess = createAction('MODEL_GET_WHATIF_SUCCESS');
export const whatifSelect = createAction('WHATIF_SELECT');
export const whatifSelectSuccess = createAction('WHATIF_SELECT_SUCCESS');

/** Экшн изменения вида отображения метрик "Узел потребяет" */

export const formulaViewedChange = createAction('FORMULA_VIEWED_CHANGE');
