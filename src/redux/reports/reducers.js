import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { setObject } from '../../helpers/setObject';

export const handleReportRootCauseSuccess = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.reportRootCauseSuccess](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { chart: {}, categories: [], list: [], state: false }
);

export const handleBusinessOverviewSuccess = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.reportBusinessOverviewSuccess](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { chart: {}, detail: {}, list: [], state: false }
);
