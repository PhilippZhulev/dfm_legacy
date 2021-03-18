import { connect } from 'react-redux';
import { CopyResource } from 'components';
import { modelList } from '../redux/model/actions';
import {
  resourceList,
  resourcesListSuccesed,
} from '../redux/resources/actions';

function mapStateToProps(payload) {
  const { models } = payload.handleModelList;
  const { model, selectPeriod } = payload.handleModelSelectSuccess.data;
  const { resources } = payload.handleResourcesListSuccesed;
  const { data } = payload.handleResourcesSuccess;

  return {
    models,
    resources: resources,
    resource: {
      value: data.value,
      label: data.label,
    },
    period: selectPeriod,
    model: model.id,
  };
}

const mapDispatchToProps = {
  dispatchModelList: modelList,
  dispatchResourceList: resourceList,
  resourcesListSuccesed,
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyResource);
