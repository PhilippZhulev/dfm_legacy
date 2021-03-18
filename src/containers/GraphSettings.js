import { connect } from 'react-redux';
import { GraphSettings } from 'components';
import { graphSettings } from '../redux/graph/actions';

function mapStateToProps(payload) {
  return { graphSettings: payload.handleGraphSettings };
}

const mapDispatchToProps = { dispatchGraphSettings: graphSettings };

export default connect(mapStateToProps, mapDispatchToProps)(GraphSettings);
