import { connect } from 'react-redux';
import { LinkResource } from 'components';
import { modelList } from '../redux/model/actions';
import { resourceList } from '../redux/resources/actions';

function mapStateToProps(payload) {
  const { model, selectPeriod } = payload.handleModelSelectSuccess.data;
  const { models } = payload.handleModelList;
  const { resources } = payload.handleResourcesListSuccesed;
  const { data } = payload.handleResourcesSuccess;

  return {
    models,
    resources: resources.filter((item) => item.group === false),
    select: data.value,
    resource: {
      value: data.value,
      label: data.label,
    },
    period: selectPeriod,
    model: model.id,
    linkModel: models.find((item) => item.value === data.link.modelId),
    linkResource: resources.find((item) => item.value === data.link.resourceId),
  };
}

const mapDispatchToProps = {
  dispatchModelList: modelList,
  dispatchResourceList: resourceList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkResource);
