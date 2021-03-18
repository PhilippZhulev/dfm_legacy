import { connect } from 'react-redux';
import { AddResource } from 'components';

function mapStateToProps(payload) {
  const {
    categories,
    model,
    selectPeriod,
  } = payload.handleModelSelectSuccess.data;
  const { value, label } = payload.handleResourcesSuccess.data;

  return {
    category: categories,
    model: model.label,
    period: selectPeriod,
    resource: {
      value,
      label,
    },
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddResource);
