import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import Reports from '../../services/api/reports';
import { handlePreload, handleWarn } from '../../helpers';
import Middleware from '../../services/middleware';
import { virualStore } from '../../virtualStore';

/**
 * Отчет RootCause - Анализ драйверов ТСО
 * @param action
 * @returns {Generator<<"CALL", CallEffectDescriptor>|*, void, *>}
 * @constructor
 */
function* RootCauseReport(action) {
  yield handlePreload({ message: 'Загрузка отчета...' });
  try {
    const { model } = virualStore;

    /* API запрос данных для отчета */
    const dataReport = yield call(Reports.RootCause, action.payload.params);

    /* Запрос данных для отчета (Модифицирован парсером) */
    const res = yield call(
      Middleware.GetDumpData,
      model,
      {
        ...action.payload.params,
        report: dataReport.data,
      },
      'reportRootCause'
    );

    yield put({
      type: 'REPORT_ROOTCAUSE_SUCCESS',
      payload: {
        chart: res.data.chart,
        list: res.data.list,
        categories: res.data.categories,
        state: true,
      },
    });
  } catch (e) {
    yield handleWarn(e);
  }
  handlePreload(null);
}

/**
 * Сброс отчета RootCause - Анализ драйверов ТСО
 * @param action
 * @returns {Generator<<"CALL", CallEffectDescriptor>|*, void, *>}
 * @constructor
 */
function* ResetRootCauseReport(action) {
  try {
    yield put({
      type: 'REPORT_ROOTCAUSE_SUCCESS',
      payload: {
        chart: {},
        list: {},
        categories: {},
        state: false,
      },
    });
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * Отчет BusinessOverview - Карточка модели
 * @param action
 * @returns {Generator<<"PUT", PutEffectDescriptor<{payload: {categories: *, state: boolean, list: *, chart: {}}, type: string}>>|<"CALL", CallEffectDescriptor>|*, void, *>}
 * @constructor
 */
function* BusinessOverviewReport(action) {
  yield handlePreload({ message: 'Загрузка отчета...' });
  try {
    const { model } = virualStore;

    /* API запрос данных для отчета */
    const dataReport = yield call(
      Reports.BusinessOverview,
      action.payload.params
    );

    /* Запрос данных для отчета (Модифицирован парсером) */
    const res = yield call(
      Middleware.GetDumpData,
      model,
      {
        ...action.payload.params,
        report: dataReport.data,
      },
      'reportBusinessOverview'
    );

    yield put({
      type: 'REPORT_BUSINESSOVERVIEW_SUCCESS',
      payload: {
        dump: dataReport.data,
        data: res.data,
        state: true,
      },
    });
  } catch (e) {
    yield handleWarn(e);
  }
  handlePreload(null);
}

/**
 * Сброс отчета BusinessOverview - Карточка модели
 * @param action
 * @returns {Generator<<"CALL", CallEffectDescriptor>|*, void, *>}
 * @constructor
 */
function* ResetBusinessOverviewReport(action) {
  try {
    let payload = { data: {}, state: false };

    if (action.payload.params) {
      yield handlePreload({ message: 'Загрузка отчета...' });

      const { model } = virualStore;
      const dataReport = yield select(
        (state) => state.handleBusinessOverviewSuccess.dump
      );

      /* Запрос данных для отчета (Модифицирован парсером) */
      const res = yield call(
        Middleware.GetDumpData,
        model,
        {
          ...action.payload.params,
          report: dataReport,
        },
        'reportBusinessOverview'
      );
      payload = { dump: dataReport, data: res.data, state: true };

      handlePreload(null);
    }

    yield put({
      type: 'REPORT_BUSINESSOVERVIEW_SUCCESS',
      payload: payload,
    });
  } catch (e) {
    yield handleWarn(e);
  }
}

/**
 * Инициализировать саги
 * @public
 */
function* initSaga() {
  yield takeLatest('REPORT_ROOTCAUSE_FETCH', RootCauseReport);
  yield takeLatest('REPORT_ROOTCAUSE_RESET', ResetRootCauseReport);
  yield takeLatest('REPORT_BUSINESSOVERVIEW_FETCH', BusinessOverviewReport);
  yield takeLatest(
    'REPORT_BUSINESSOVERVIEW_RESET',
    ResetBusinessOverviewReport
  );
}

export default initSaga;
