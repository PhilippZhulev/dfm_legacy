import { connect } from 'react-redux';
import { WhatIf } from 'components';
import { modalAction } from '../redux/modals/actions';
import {
  modelWhatIfCreate,
  modelChange,
  modelLocked,
  modelClearCache,
  modelReload,
  modelSelect,
  modelDelete,
} from '../redux/model/actions';

/**
 * ANCHOR: Мгенерировать пропсы для компонента
 * @param  {} payload
 * @public
 */
function mapStateToProps(payload) {
  const locked = payload.handleModelLocked;
  const { data } = payload.handleResourcesSuccess;
  const {
    model,
    permissions,
    parentValue,
  } = payload.handleModelSelectSuccess.data;

  return {
    data,
    locked: locked.state,
    model: model.id,
    modelLabel: model.label,
    parentValue: parentValue,
    permissions,
    modelsList: payload.handleGetWhatIf.models,
    modelChange: payload.handleModelChange.state,
    userData: payload.handleFetchUserSuccess,
  };
}

const mapDispatchToProps = {
  dispatchModal: modalAction,
  dispatchWhatIfCreate: modelWhatIfCreate,
  dispatchModelLocked: modelLocked,
  dispatchModelChange: modelChange,
  dispatchModelListReload: modelReload,
  dispatchModelClearCache: modelClearCache,
  dispatchModelSelect: modelSelect,
  dispatchDeleteModal: modelDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(WhatIf);
