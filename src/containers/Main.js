import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Main } from 'components';
import { MoneyFormat } from 'helpers';
import { graphCalc, graphSuccess } from '../redux/graph/actions';
import { virualStore } from '../virtualStore';

const getLocked = (payload) => payload.handleModelLocked;
const getResource = (payload) => payload.handleResourcesSuccess.data;
const getCalcType = (payload) => payload.handleGraphCalcType.type;
const getGraphCalcType = (payload) => payload.handleGraphCalcType;
const getGraph = (payload) => payload.handleGraphSuccess;

/**
 * Тип label в popup
 * @param  {string} calc
 */
const popUplabelType = (calc) => {
  if (calc === 'full') {
    return 'ТСО узла';
  }
  if (calc === 'direct') {
    return 'Прямые затраты';
  }
  return 'Нераспределённые';
};

const getMemoSelectorLocked = createSelector([getLocked], (locked) => ({
  locked: locked.state,
}));

const getMemoSelectorResource = createSelector([getResource], (resource) => ({
  period: resource.period,
  resource: resource.value,
}));

const getMemoSelectorGraphSettings = createSelector(
  [getGraphCalcType],
  (graphSettings) => ({
    graphSettings,
  })
);

const getMemoSelectorGraph = createSelector(
  [getGraph, getCalcType],
  (graph, type) => {
    const { data, updater, inidicator } = graph;
    const listFullValues = data.nodes.map((item) => item.values.full);
    return {
      calcType: type,
      graph: data.nodes.map((item) => {
        const position = window.Convert2dto3dPosition(
          item.position.x,
          item.position.y
        );

        const fo = virualStore.model.resources.find(
          (ch) => ch.value === item.id
        );

        if (item.c2d && !fo.position.mod) {
          item.pos = [position.x, position.y, item.position.z || 0];
        }

        if (item.position.z !== null) {
          item.pos = [item.position.x, item.position.y, item.position.z];
        }

        item.indicator = inidicator.color;
        item.value = item.values[type];
        item.formatValue = MoneyFormat(item.values[type]);
        item.popUp[1].label = popUplabelType(type);
        return item;
      }),
      updateIndex: updater,
      filterValues: {
        min: Math.min.apply(null, listFullValues),
        max: Math.max.apply(null, listFullValues),
      },
    };
  }
);

/**
 * Контейнер Main
 * @param  {object} payload
 */
function mapStateToProps(payload) {
  return {
    ...getMemoSelectorLocked(payload),
    ...getMemoSelectorResource(payload),
    ...getMemoSelectorGraphSettings(payload),
    ...getMemoSelectorGraph(payload),
  };
}

const mapDispatchToProps = {
  dispatchGraphCalc: graphCalc,
  dispatchGraphSuccess: graphSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
