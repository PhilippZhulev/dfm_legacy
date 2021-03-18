import { connect } from 'react-redux';
import { AnalysisTSO } from 'components';
import { createSelector } from 'reselect';
import {
  reportRootCauseFetch,
  reportRootCauseReset,
} from '../redux/reports/actions';

const getModel = (payload) => payload.handleModelSelectSuccess.data;
const getResource = (payload) => payload.handleResourcesSuccess.data;

const getMemoSelectorModel = createSelector(
  [getModel, getResource],
  (model, resource) => ({
    model,
    periodTypes: model.periods.map((item) => item.type),
    currentPeriod: model.periods[resource.periodIndex],
    headResource: model.headResources[resource.period],
  })
);

function mapStateToProps(payload) {
  const reportData = payload.handleReportRootCauseSuccess;
  return {
    ...getMemoSelectorModel(payload),
    reportData,
  };
}

const mapDispatchToProps = {
  dispatchReport: reportRootCauseFetch,
  dispatchReset: reportRootCauseReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisTSO);
