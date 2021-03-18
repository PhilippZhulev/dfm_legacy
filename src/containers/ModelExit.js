import { connect } from 'react-redux';
import { ModelExit } from 'components';
import { modalAction } from '../redux/modals/actions';
import {
  modelClearCache,
  modelReload,
  modelSave,
  modelChange,
  modelLocked,
} from '../redux/model/actions';
import {
  resourcesCreate,
  resourcesRemove,
  resourceCopy,
  resourceLink,
  resourceGroup,
} from '../redux/resources/actions';

/**
 * ANCHOR: Мгенерировать пропсы для компонента
 * @param  {} payload
 * @public
 */
function mapStateToProps(payload) {
  const locked = payload.handleModelLocked;
  const { data } = payload.handleResourcesSuccess;
  const { model, permissions } = payload.handleModelSelectSuccess.data;

  return {
    data,
    locked: locked.state,
    model: model.id,
    permissions,
    modelChange: payload.handleModelChange.state,
    modelData: payload.handleModelSelectSuccess.data,
  };
}

const mapDispatchToProps = {
  dispatchModal: modalAction,
  dispatchModelLocked: modelLocked,
  dispatchModelChange: modelChange,
  dispatchModelReload: modelReload,
  dispatchCreateResource: resourcesCreate,
  dispatchRemoveResource: resourcesRemove,
  dispatchCopyResource: resourceCopy,
  dispatchLinkResource: resourceLink,
  dispatchGroupResource: resourceGroup,
  dispatchModelSave: modelSave,
  dispatchModelListReload: modelReload,
  dispatchModelClearCache: modelClearCache,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelExit);
