import { connect } from 'react-redux';
import { SaveStatus } from 'components';
import { modelCalc } from '../redux/model/actions';

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  dispatchRecalc: modelCalc,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveStatus);
