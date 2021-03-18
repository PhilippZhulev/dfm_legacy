import { connect } from 'react-redux';
import { NodeInfo } from 'components';
import { createSelector } from 'reselect';
import {
  fetchParentInfoNode,
  fetchParentInfoSuccesed,
} from '../redux/resources/actions';
import { permitRule } from '../helpers';

export const getCategories = (store) =>
  store.handleModelSelectSuccess.data.categories;
const getLockedModel = (store) => store.handleModelLocked.state;
export const getResource = (store) => store.handleResourcesSuccess.data;
const getPermissionsModel = (store) =>
  store.handleModelSelectSuccess.data.permissions;

/**
 * Доступные для выбора категории
 * @param metrics
 * @param categories
 * @returns array - Массив объектов-категорий
 */
const availableCatsByMetrics = (metrics, categories) => {
  if (metrics) {
    const metricsByState = metrics.filter((item) => item.state);
    let cats = new Set(metricsByState[0]?.cats || []);
    metricsByState.slice(1).forEach((el) => {
      cats = new Set(el.cats.filter((x) => cats.has(x)));
    });

    const filtered = categories.filter((item) => cats.has(item.value));
    if (filtered.length > 0) {
      return filtered;
    }
  }
  return categories;
};

const getMemoSelector = createSelector(
  [getCategories, getResource],
  (categories, resources) => ({
    categories: availableCatsByMetrics(resources.availableMetric, categories),
    resources,
  })
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
  ...getLockedMemo(store),
});

const mapDispatchToProps = {
  getParentInfoNode: fetchParentInfoNode,
  fetchParentInfoSuccesed,
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeInfo);
