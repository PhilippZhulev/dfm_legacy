import { connect } from 'react-redux';
import { Model } from 'components';
import { modalAction } from '../redux/modals/actions';
import { modelCreate, modelWhatIfCreate } from '../redux/model/actions';

function mapStateToProps(payload) {
  const { blocks, models, stages } = payload.handleModelSuccess;
  const userData = payload.handleFetchUserSuccess;

  return {
    stages,
    models,
    blocks,
    userData,
  };
}

const mapDispatchToProps = {
  dispatchModal: modalAction,
  dispatchCreateModal: modelCreate,
  dispatchWhatIfCreate: modelWhatIfCreate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Model);
