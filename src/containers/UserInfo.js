import { connect } from 'react-redux';
import { UserInfo } from 'components';
import { modalAction } from '../redux/modals/actions';
import { logoutUser } from '../redux/user/actions';
import { modelClearCache, modelLocked } from '../redux/model/actions';

function mapStateToProps(payload) {
  return {
    modelChange: payload.handleModelChange.state,
  };
}

const mapDispatchToProps = {
  dispatchModal: modalAction,
  dispatchModelLocked: modelLocked,
  dispatchLogout: logoutUser,
  dispatchModelClearCache: modelClearCache,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
