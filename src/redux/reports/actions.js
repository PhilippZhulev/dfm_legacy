import { createAction } from 'redux-actions';

// Отчет RootCause
export const reportRootCauseFetch = createAction('REPORT_ROOTCAUSE_FETCH');
export const reportRootCauseReset = createAction('REPORT_ROOTCAUSE_RESET');
export const reportRootCauseSuccess = createAction('REPORT_ROOTCAUSE_SUCCESS');

// Отчет BusinessOverview
export const reportBusinessOverviewFetch = createAction(
  'REPORT_BUSINESSOVERVIEW_FETCH'
);
export const reportBusinessOverviewReset = createAction(
  'REPORT_BUSINESSOVERVIEW_RESET'
);
export const reportBusinessOverviewSuccess = createAction(
  'REPORT_BUSINESSOVERVIEW_SUCCESS'
);
