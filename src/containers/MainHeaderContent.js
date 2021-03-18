import { connect } from 'react-redux';
import { MainHeaderContent } from 'components';
import {
  modelSave,
  modelClearCache,
  modelReload,
  modelSelect,
  modelStatus,
  modelChange,
} from '../redux/model/actions';

import { resourcesInit } from '../redux/resources/actions';
import { graphInit } from '../redux/graph/actions';

function mapStateToProps(payload) {
  const locked = payload.handleModelLocked;
  const { data } = payload.handleModelSelectSuccess;
  const { stages } = payload.handleModelSuccess;
  const { period, value } = payload.handleResourcesSuccess.data;

  return {
    data,
    period,
    resource: value,
    model: data.model.id,
    permissions: data.permissions,
    stage: stages.find((item) => item.id === data.stage) || { label: 'n/a' },
    locked: locked.state,
    modelChange: payload.handleModelChange.state,
  };
}

const mapDispatchToProps = {
  dispatchModelSelect: modelSelect,
  dispatchModelLocked: modelStatus,
  dispatchModelReload: modelReload,
  dispatchFilter: resourcesInit,
  dispatchGraph: graphInit,
  dispatchModelClearCache: modelClearCache,
  dispatchModelSave: modelSave,
  dispatchModelChange: modelChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainHeaderContent);
