import { connect } from 'react-redux';
import { UserControl } from 'components';
import { fetchUser } from '../redux/user/actions';

function mapStateToProps(payload) {
  return { session: payload.handleFetchUserSuccess };
}

const mapDispatchToProps = { initSession: fetchUser };

export default connect(mapStateToProps, mapDispatchToProps)(UserControl);
