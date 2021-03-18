import { connect } from 'react-redux';
import { Maximize } from 'components';
import { modalAction } from '../redux/modals/actions';
import { modelClearCache, modelReload } from '../redux/model/actions';

function mapStateToProps(payload) {
  const locked = payload.handleModelLocked;
  const { state } = payload.handleResourcesSuccess;
  const { model, permissions } = payload.handleModelSelectSuccess.data;

  return {
    resource: state,
    model: model.id,
    permissions,
    locked: locked.state,
  };
}

const mapDispatchToProps = {
  dispatchModal: modalAction,
  dispatchModelListReload: modelReload,
  dispatchModelClearCache: modelClearCache,
};

export default connect(mapStateToProps, mapDispatchToProps)(Maximize);
