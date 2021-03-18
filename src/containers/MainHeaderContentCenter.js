import { connect } from 'react-redux';
import { MainHeaderContentCenter } from 'components';
import { modalAction } from '../redux/modals/actions';
import { modelSave } from '../redux/model/actions';
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
  };
}

const mapDispatchToProps = {
  dispatchModal: modalAction,
  dispatchCreateResource: resourcesCreate,
  dispatchRemoveResource: resourcesRemove,
  dispatchCopyResource: resourceCopy,
  dispatchLinkResource: resourceLink,
  dispatchGroupResource: resourceGroup,
  dispatchModelSave: modelSave,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainHeaderContentCenter);
