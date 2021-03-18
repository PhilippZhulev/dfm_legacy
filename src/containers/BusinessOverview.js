import { connect } from 'react-redux';
import { BusinessOverview } from 'components';
import { createSelector } from 'reselect';
import {
  reportBusinessOverviewFetch,
  reportBusinessOverviewReset,
} from '../redux/reports/actions';

const getModel = (payload) => payload.handleModelSelectSuccess.data;
const getResource = (payload) => payload.handleResourcesSuccess.data;

/**
 * Возвращаем второе значение для начального периода
 * @param periods
 * @param firstPairPeriod
 * @returns {*}
 */
const secondPeriodInPair = (periods, firstPairPeriod) => {
  const periodsByTypes = periods.filter(
    ({ type }) => type === firstPairPeriod.type
  );
  if (periodsByTypes.length < 2) {
    return firstPairPeriod;
  }

  const fPeriodIndex = periodsByTypes.findIndex(
    ({ value }) => value === firstPairPeriod.value
  );
  const sPeriodIndex =
    fPeriodIndex === periodsByTypes.length - 1
      ? fPeriodIndex - 1
      : fPeriodIndex + 1;
  return periodsByTypes[sPeriodIndex];
};

const getMemoSelectorModel = createSelector(
  [getModel, getResource],
  (model, resource) => ({
    model,
    periodTypes: model.periods.map((item) => item.type),
    currentPeriod: model.periods[resource.periodIndex],
    secondPeriod: secondPeriodInPair(
      model.periods,
      model.periods[resource.periodIndex]
    ),
  })
);

function mapStateToProps(payload) {
  const report = payload.handleBusinessOverviewSuccess;
  return {
    ...getMemoSelectorModel(payload),
    reportData: report.data,
    reportState: report.state,
  };
}

const mapDispatchToProps = {
  dispatchReport: reportBusinessOverviewFetch,
  dispatchReset: reportBusinessOverviewReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessOverview);
