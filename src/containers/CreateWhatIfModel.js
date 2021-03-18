import { connect } from 'react-redux';
import { CreateWhatIfModel } from 'components';

function mapStateToProps(payload) {
  const userData = payload.handleFetchUserSuccess;
  const models = payload.handleModelSuccess.models?.reduce((items, tribe) => {
    tribe.models.forEach((modelItem) => {
      if (modelItem.scenario === 'TCO') {
        items.push(modelItem);
      }
    });
    return items;
  }, []);
  return { modelsList: models, userData };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(CreateWhatIfModel);
