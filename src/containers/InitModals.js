import { connect } from 'react-redux';
import { InitModals } from 'components';
import { modalAction } from '../redux/modals/actions';

function mapStateToProps(payload) {
  const userData = payload.handleFetchUserSuccess;
  return { modal: payload.handleModalAction, userData };
}

const mapDispatchToProps = { dispatchModal: modalAction };

export default connect(mapStateToProps, mapDispatchToProps)(InitModals);
