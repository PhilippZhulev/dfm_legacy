import { connect } from 'react-redux';
import { SelectWhatif } from 'components';

function mapStateToProps(payload) {
  const { model } = payload.handleModelSelectSuccess.data;
  const variants = payload.handleWhatifSuccess.data;

  return {
    model: model,
    variants: variants,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelectWhatif);
