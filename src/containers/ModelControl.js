import { connect } from 'react-redux';
import { ModelControl } from 'components';

function mapStateToProps(payload) {
  return { modelState: payload.handleModelSelectSuccess.state };
}

export default connect(mapStateToProps)(ModelControl);
