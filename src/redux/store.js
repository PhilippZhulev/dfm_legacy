import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import promiseMiddleware from 'redux-promise';

import { handleLoginApp, handleLoginSuccess } from './login/reducers';
import { handleMessage, handleMessageEvent } from './message/reducers';
import {
  handleModelInit,
  handleModelSuccess,
  handleModelDangersSuccess,
  handleModelEdit,
  handleModelSelectSuccess,
  handleModelLocked,
  handleModelList,
  handleModelDump,
  handleModelChange,
  handleModelFavorite,
  handleFormulaViewedChange,
  handleGetWhatIf,
  handleWhatifSuccess,
} from './model/reducers';
import {
  handleFetchUser,
  handleFetchUserSuccess,
  handleLogoutUser,
} from './user/reducers';
import { handleModalAction } from './modals/reducers';
import {
  handleGraphInit,
  handleGraphSuccess,
  handleGraphSettings,
  handleGraphCalcType,
} from './graph/reducers';
import {
  handleResourcesInit,
  handleResourcesSuccess,
  handleResourcesOperations,
  handleResourcesListSuccesed,
  handleResourceGroupCategory,
  handleParentInfoNode,
  handleResourceMetricInit,
} from './resources/reducers';
import {
  handleFetchDictionary,
  handleSaveDictionary,
  handleSystemsDictionaryErrorSuccess,
} from './systemDict/reducers';
import {
  handleReportRootCauseSuccess,
  handleBusinessOverviewSuccess,
} from './reports/reducers';

import LoginSaga from './login/sagas';
import initMessage from './message/sagas';
import initFetchUser from './user/sagas';
import modelFetchUser from './model/sagas';
import initGraphSaga from './graph/sagas';
import initResourcesSaga from './resources/sagas';
import initSystemDictSaga from './systemDict/sagas';
import initReports from './reports/sagas';

const initReducer = combineReducers({
  handleLoginApp,
  handleLoginSuccess,
  handleMessage,
  handleMessageEvent,
  handleFetchUser,
  handleFetchUserSuccess,
  handleLogoutUser,
  handleModelInit,
  handleModelEdit,
  handleModelSuccess,
  handleModelDangersSuccess,
  handleModelList,
  handleGetWhatIf,
  handleModalAction,
  handleGraphInit,
  handleGraphSuccess,
  handleModelSelectSuccess,
  handleResourcesInit,
  handleResourcesSuccess,
  handleModelLocked,
  handleResourcesOperations,
  handleResourcesListSuccesed,
  handleGraphSettings,
  handleModelDump,
  handleModelChange,
  handleResourceGroupCategory,
  handleModelFavorite,
  handleFetchDictionary,
  handleSaveDictionary,
  handleSystemsDictionaryErrorSuccess,
  handleParentInfoNode,
  handleResourceMetricInit,
  handleGraphCalcType,
  handleFormulaViewedChange,
  handleReportRootCauseSuccess,
  handleBusinessOverviewSuccess,
  handleWhatifSuccess,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  initReducer,
  applyMiddleware(sagaMiddleware, promiseMiddleware)
);

sagaMiddleware.run(LoginSaga);
sagaMiddleware.run(initMessage);
sagaMiddleware.run(initFetchUser);
sagaMiddleware.run(modelFetchUser);
sagaMiddleware.run(initGraphSaga);
sagaMiddleware.run(initResourcesSaga);
sagaMiddleware.run(initSystemDictSaga);
sagaMiddleware.run(initReports);

export default store;
