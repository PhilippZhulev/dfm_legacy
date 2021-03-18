import { connect } from 'react-redux';
import { GroupResource } from 'components';
import { createSelector } from 'reselect';
import { resourceList } from '../redux/resources/actions';

const getResources = (payload) => payload.handleResourcesListSuccesed.resources;
const getResource = (payload) => payload.handleResourcesSuccess.data;

const getMemoSelectorGroup = createSelector(
  [getResources, getResource],
  (resources, { value, label, group }) => {
    const resource = resources.find((item) => item.value === value) || {};
    // Узлы свободные от групп
    const freeGroupResources = resources.filter(
      (item) => item.group === false && item.include === false
    );

    return {
      selectResource: { value, label, group },
      select: !resource.children
        ? [freeGroupResources[0] || { value, label, group }]
        : resource.children.map((item) =>
            resources.find((el) => el.value === item)
          ),
      resources: freeGroupResources,
    };
  }
);

function mapStateToProps(payload) {
  const { model, selectPeriod } = payload.handleModelSelectSuccess.data;

  return {
    ...getMemoSelectorGroup(payload),
    model: model.id,
    period: selectPeriod,
  };
}

const mapDispatchToProps = { dispatchResourceList: resourceList };

export default connect(mapStateToProps, mapDispatchToProps)(GroupResource);
