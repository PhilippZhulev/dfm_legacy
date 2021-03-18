import { connect } from 'react-redux';
import { Login } from 'components';
import { loginInit } from '../redux/login/actions';

function mapStateToProps(payload) {
  return { state: payload.handleLoginSuccess.response };
}

const mapDispatchToProps = { dispatch: loginInit };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
