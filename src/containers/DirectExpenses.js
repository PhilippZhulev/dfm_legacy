import { connect } from 'react-redux';
import { DirectExpenses } from 'components';
import { createSelector } from 'reselect';
import { permitRule } from 'helpers';
import {
  changeResources,
  changeFixedTariff,
  resourcesInit,
} from '../redux/resources/actions';
import { modelChange } from '../redux/model/actions';
import { graphInit } from '../redux/graph/actions';

export const getFixedCosts = (store) =>
  store.handleResourcesSuccess.data.fixedCosts;
const getAvailableMetric = (store) =>
  store.handleResourcesSuccess.data.availableMetric;
const getPeriod = (store) => ({
  period: store.handleResourcesSuccess.data.period,
  resource: store.handleResourcesSuccess.data.value,
});
const getLockedModel = (store) => store.handleModelLocked.state;
const getPermissionsModel = (store) =>
  store.handleModelSelectSuccess.data.permissions;

const getMemoSelector = createSelector(
  [getFixedCosts, getAvailableMetric, getPeriod],
  (fixedCosts, availableMetric, period) => ({
    fixedCosts,
    availableMetric,
    period,
  })
);

/** ANCHOR: блокаровка модели в зависимости от полномочий */
const getMemoLockedSelector = createSelector(
  [getLockedModel, getPermissionsModel],
  (lockedModel, permissions) => ({
    lockedModel: lockedModel && permitRule(permissions, ['update']),
  })
);

const mapStateToProps = (store) => ({
  ...getMemoSelector(store),
  ...getMemoLockedSelector(store),
});

const mapDispatchToProps = {
  dispatchChangeResources: changeResources,
  dispatchChangeFixedTariff: changeFixedTariff,
  dispatchFilter: resourcesInit,
  dispatchGraph: graphInit,
  dispatchModelChange: modelChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectExpenses);
