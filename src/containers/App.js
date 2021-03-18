import { connect } from 'react-redux';
import { message, messageEvent } from '../redux/message/actions';
import App from '../components/App';

function mapStateToProps(payload) {
  return {
    message: payload.handleMessage,
    userData: payload.handleFetchUserSuccess,
    modelData: payload.handleModelSelectSuccess.data,
    modelLoad: payload.handleModelSuccess.models !== null,
  };
}

const mapDispatchToProps = {
  dispatchMessage: message,
  dispatchMessageEvent: messageEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
