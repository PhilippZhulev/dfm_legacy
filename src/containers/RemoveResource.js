import { connect } from 'react-redux';
import { RemoveResource } from 'components';

function mapStateToProps(payload) {
  const { data } = payload.handleResourcesSuccess;
  const { model, selectPeriod } = payload.handleModelSelectSuccess.data;

  return {
    period: selectPeriod,
    resource: data.value,
    model: model.label,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveResource);
