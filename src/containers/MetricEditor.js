import { connect } from 'react-redux';
import { MetricEditor } from 'components';
import { createSelector } from 'reselect';
import { permitRule } from '../helpers';
import { modelChange } from '../redux/model/actions';

const getParameters = (store) => store.handleModelSelectSuccess.data.parameters;
const getAvailableMetric = (store) =>
  store.handleResourcesSuccess.data.availableMetric;

const getLockedModel = (store) => store.handleModelLocked.state;

const getPermissionsModel = (store) =>
  store.handleModelSelectSuccess.data.permissions;

const getMemoSelector = createSelector(
  [getParameters, getAvailableMetric],
  (parameters, availableMetric) => {
    const listAutoComplete = [];

    availableMetric.forEach((metric) => {
      if (metric.state) {
        listAutoComplete.push({
          name: `${metric.label} [${metric.value}]`,
          value: metric.value,
          amount: metric.requiredValue,
          paramName: 'метрика',
        });
      }
    });

    parameters.forEach((parameter) => {
      listAutoComplete.push({
        name: `${parameter.value}`,
        value: parameter.value,
        amount: parameter.volume,
        paramName: 'параметр',
      });
    });

    return listAutoComplete;
  }
);

/** ANCHOR: блокаровка модели в зависимости от полномочий */
const getMemoLockedSelector = createSelector(
  [getLockedModel, getPermissionsModel],
  (lockedModel, permissions) => ({
    lockedModel: lockedModel && permitRule(permissions, ['update']),
  })
);

const mapStateToProps = (store) => ({
  ...getMemoLockedSelector(store),
  listAutoComplete: getMemoSelector(store),
});

const mapDispatchToProps = {
  dispatchModelChange: modelChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(MetricEditor);
