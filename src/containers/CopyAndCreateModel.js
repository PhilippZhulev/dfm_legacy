import { connect } from 'react-redux';
import { CopyAndCreateModel } from 'components';

function mapStateToProps(payload) {
  const { blocks } = payload.handleModelSuccess;

  return { blocks };
}

export default connect(mapStateToProps, {})(CopyAndCreateModel);
