import { connect } from 'react-redux';
import { MinimizeNodeConsumes, MaximizeNodeConsumes } from 'components';
import { createSelector } from 'reselect';
import { formulaViewedChange, modelChange } from '../redux/model/actions';
import { permitRule } from '../helpers';
import { resourcesInit } from '../redux/resources/actions';
import { graphInit } from '../redux/graph/actions';

const getCategories = (store) => store.handleModelSelectSuccess.data.categories;
const getInstance = (store) => store.handleModelSelectSuccess.data.instance;
const getConsumptions = (store) =>
  store.handleResourcesSuccess.data.consumptions;
const getLockedModel = (store) => store.handleModelLocked.state;
const getPeriod = (store) => {
  const { value, period } = store.handleResourcesSuccess.data;

  return {
    resource: value,
    period,
  };
};
const getPermissionsModel = (store) =>
  store.handleModelSelectSuccess.data.permissions;

const getFormulaViewed = (store) =>
  store.handleFormulaViewedChange.formulaViewed;

const getMemoSelector = createSelector(
  [getCategories, getConsumptions, getInstance],
  (categories, consumptions, instance) => {
    const mapCategories = {};

    categories.forEach((category) => {
      mapCategories[category.value] = { ...category };
    });

    consumptions.forEach((consumption) => {
      if (!mapCategories[consumption.category].consumption) {
        mapCategories[consumption.category].consumption = [];
      }

      mapCategories[consumption.category].consumption.push(consumption);
    });

    return {
      categories,
      consumptions,
      mapCategories,
      instance,
    };
  }
);

/** ANCHOR: блокаровка модели в зависимости от полномочий */
const getMemoLockedSelector = createSelector(
  [getLockedModel, getPermissionsModel],
  (lockedModel, permissions) => ({
    lockedModel: lockedModel && permitRule(permissions, ['update']),
  })
);

/** ANCHOR: Установка свичера "Показ формул" */
const getMemoFormulaViewed = createSelector(
  [getFormulaViewed],
  (formulaViewed) => ({
    formulaViewed,
  })
);

const mapStateToProps = (store) => ({
  ...getMemoSelector(store),
  ...getMemoLockedSelector(store),
  ...getMemoFormulaViewed(store),
  period: getPeriod(store),
});

const mapDispatchToProps = {
  dispatchFormulaViewed: formulaViewedChange,
  dispatchFilter: resourcesInit,
  dispatchGraph: graphInit,
  dispatchModelChange: modelChange,
};

export default {
  MinimizeNodeConsumes: connect(
    mapStateToProps,
    mapDispatchToProps
  )(MinimizeNodeConsumes),

  MaximizeNodeConsumes: connect(
    mapStateToProps,
    mapDispatchToProps
  )(MaximizeNodeConsumes),
};
