import { connect } from 'react-redux';
import { MinimizeNodeProvides, MaximizeNodeProvides } from 'components';
import { createSelector } from 'reselect';
import {
  changeResources,
  changeFixedTariff,
  addMetric,
  deleteMetric,
  resourcesInit,
} from '../redux/resources/actions';
import { modelSelect, modelChange } from '../redux/model/actions';
import { permitRule } from '../helpers';

import { graphInit } from '../redux/graph/actions';

export const getResource = (store) => store.handleResourcesSuccess.data;
const getLockedModel = (store) => store.handleModelLocked.state;
export const getPeriod = (store) => store.handleResourcesInit.params.period;
const getParentInfo = (store) => store.handleParentInfoNode;
const getCurrentModel = (store) => store.handleModelSelectSuccess.data.model;
const getPermissionsModel = (store) =>
  store.handleModelSelectSuccess.data.permissions;

const getMemoSelector = createSelector(
  [getResource, getPeriod],
  (resource, period) => ({
    resource,
    period,
    availableMetric: resource.availableMetric,
  })
);

const getMemoModel = createSelector([getCurrentModel], (model) => ({
  model,
}));

const getParentInfoMemo = createSelector(
  [getParentInfo, getResource],
  (parent, resource) => {
    if (!parent) {
      return { parentInfo: parent };
    }
    const parentInfo = { ...parent, tariffs: {} };

    parent.budcycles
      .find(({ id }) => id === resource.period)
      ?.tariffs.forEach((tariff) => {
        parentInfo.tariffs[tariff.metricId] = tariff.unitCost;
      });

    return {
      parentInfo,
    };
  }
);

/** ANCHOR: блокаровка модели в зависимости от полномочий */
const getLockedMemo = createSelector(
  [getLockedModel, getPermissionsModel],
  (lockedModel, permissions) => ({
    lockedModel: lockedModel && permitRule(permissions, ['update']),
  })
);

const mapStateToProps = (store) => ({
  ...getMemoSelector(store),
  ...getParentInfoMemo(store),
  ...getMemoModel(store),
  ...getLockedMemo(store),
});

const mapDispatchToProps = {
  dispatchChangeResources: changeResources,
  dispatchChangeFixedTariff: changeFixedTariff,
  dispatchModelSelect: modelSelect,
  dispatchAddMetricResource: addMetric,
  dispatchDeleteMetricResource: deleteMetric,
  dispatchFilter: resourcesInit,
  dispatchGraph: graphInit,
  dispatchModelChange: modelChange,
};

export default {
  MinimizeNodeProvides: connect(
    mapStateToProps,
    mapDispatchToProps
  )(MinimizeNodeProvides),
  MaximizeNodeProvides: connect(
    mapStateToProps,
    mapDispatchToProps
  )(MaximizeNodeProvides),
};
