// Зависимости
import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { setObject } from '../../helpers/setObject';

export const handleGraphInit = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.graphInit](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { params: {} }
);

export const handleGraphCalcType = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.graphCalc](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { type: 'full' }
);

export const handleGraphSettings = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.graphSettings](state, { payload }) {
      return setObject(state, payload);
    },
  },
  {
    settings: localStorage.graphSettings ?
      JSON.parse(localStorage.graphSettings) :
      {
        nodeMaxSize: 15,
        nodeMinSize: 0.8,
        bloom: false,
        SMAA: false,
        fog: false,
        antialias: false,
        light: false,
        orbit: false,
        stars: false,
      },
    ver: 0,
  }
);

export const handleGraphSuccess = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.graphSuccess](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { data: { nodes: [] } }
);
