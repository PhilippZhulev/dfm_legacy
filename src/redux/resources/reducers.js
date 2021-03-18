import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { setObject } from '../../helpers/setObject';

export const handleResourcesInit = handleActions(
  {
    [actions.resourcesInit](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.resourcesCreate](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.resourcesRemove](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.resourceList](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.resourceCopy](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.resourceLink](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.resourceGroup](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.resourceGroupCategory](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { params: {} }
);

export const handleResourceMetricInit = handleActions(
  {
    [actions.addMetric](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.deleteMetric](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { params: {} }
);

export const handleResourcesSuccess = handleActions(
  {
    [actions.resourcesSuccesed](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.changeResources](state, { payload }) {
      const data = { ...state.data, ...payload };
      return setObject(state, { data });
    },
  },
  {
    data: {
      inidicator: { label: 'n/a', color: '#fff' },
      formatValue: { full: '0', left: '0', direct: '0' },
    },
    state: false,
  }
);

export const handleResourcesOperations = handleActions(
  {
    [actions.resourcesCreateSuccesed](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.resourcesRemoveSuccesed](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.resourceCopySuccesed](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.resourceLinkSuccesed](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.resourceGroupSuccesed](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.resourceGroupCategorySuccesed](state, { payload }) {
      return setObject(state, payload);
    },
    [actions.actionMetricSucceeded](state, { payload }) {
      return setObject(state, payload);
    },
  },
  {
    data: {},
    state: false,
  }
);

export const handleResourceGroupCategory = handleActions(
  {
    [actions.resourceGroupCategorySuccesed](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { data: [], state: false }
);

export const handleResourcesListSuccesed = handleActions(
  {
    [actions.resourcesListSuccesed](state, { payload }) {
      return setObject(state, payload);
    },
  },
  { resources: [{ label: '', value: '' }] }
);

export const handleParentInfoNode = handleActions(
  {
    [actions.fetchParentInfoSuccesed](state, { payload }) {
      if (payload) {
        return payload;
      }

      return null;
    },
  },
  null
);
