// Зависимости
import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { setObject } from '../../helpers/setObject';

export const handleModelInit = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelInit](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { params: {} }
);

export const handleModelSuccess = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelSuccesed](state, { payload }) {
      return setObject(state, payload);
    },

    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelError](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { models: null, blocks: [], stages: [], state: false }
);

export const handleModelEdit = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelCopy](state, { payload }) {
      return setObject(state, payload);
    },
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelDelete](state, { payload }) {
      return setObject(state, payload);
    },
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelCreate](state, { payload }) {
      return setObject(state, payload);
    },
    /**
    * @param  {} state
    * @param  {} {payload}
    */
    [actions.modelWhatIfCreate](state, { payload }) {
      return setObject(state, payload);
    },
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelSelect](state, { payload }) {
      return setObject(state, payload);
    },
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelReload](state, { payload }) {
      return setObject(state, payload);
    },
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelLocked](state, { payload }) {
      return setObject(state, payload);
    },
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelList](state, { payload }) {
      return setObject(state, payload);
    },
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelStatus](state, { payload }) {
      return setObject(state, payload);
    },
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelSave](state, { payload }) {
      return setObject(state, payload);
    },
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelClearCache](state, { payload }) {
      return setObject(state, payload);
    },
  },
  {
    params: {},
    route: null,
  }
);

export const handleModelLocked = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelLockedSuccess](state, { payload }) {
      return setObject(state, payload);
    },
  },
  {
    model: null,
    state: false,
  }
);

export const handleModelChange = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelChange](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { state: false }
);

export const handleModelDump = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelDump](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { model: null }
);

export const handleModelList = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelListSuccess](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { models: [{ label: '', value: '' }] }
);

export const handleModelSelectSuccess = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelSelectSuccess](state, { payload }) {
      return setObject(state, payload);
    },
  },
  {
    data: {
      model: { label: 'n/d', id: null },
      locked: false,
      stage: 0,
      resources: [{}],
      periods: [{}],
      selectResource: {},
      selectPeriod: {},
    },
    state: false,
  }
);

export const handleModelDangersSuccess = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */

    [actions.modelDangers](state, { payload }) {
      return setObject(state, payload);
    },
  },
  {
    data: '',
  }
);

export const handleModelFavorite = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelFavorite](state, { payload }) {
      return setObject(state, payload);
    },
  },
  {}
);

export const handleModelTariff = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.modelFavorite](state, { payload }) {
      return setObject(state, payload);
    },
  },
  {}
);

export const handleFormulaViewedChange = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.formulaViewedChange](state, { payload }) {
      return setObject(state, payload);
    },
  },
  {
    viewed: true,
  }
);

export const handleGetWhatIf = handleActions(
  {
      /**
     * @param  {} state
     * @param  {} {payload}
      */
      [actions.modelGetWhatIfSuccess](state, { payload }) {
        return setObject(state, payload);
      },
  },
  {
    models: [],
  }
);

export const handleWhatifSuccess = handleActions(
  {
    /**
     * @param  {} state
     * @param  {} {payload}
     */
    [actions.whatifSelectSuccess](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { data: [] }
);
