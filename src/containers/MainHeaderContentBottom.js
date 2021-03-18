import { connect } from 'react-redux';
import { MainHeaderContentBottom } from 'components';
import { modalAction } from '../redux/modals/actions';
import {
  modelWhatIfCreate,
  modelSelect,
  modelLocked,
  modelChange,
  modelClearCache,
} from '../redux/model/actions';

/**
 * ANCHOR: Мгенерировать пропсы для компонента
 * @param  {} payload
 * @public
 */
function mapStateToProps(payload) {
  const { data } = payload.handleResourcesSuccess;
  const {
    parentValue,
    parentLabel,
    model,
  } = payload.handleModelSelectSuccess.data;
  const locked = payload.handleModelLocked;

  return {
    data,
    parentValue,
    parentLabel,
    model: model.id,
    modelChange: payload.handleModelChange.state,
    modelLabel: model.label,
    userData: payload.handleFetchUserSuccess,
    locked: locked.state,
  };
}

const mapDispatchToProps = {
  dispatchModal: modalAction,
  dispatchModelSelect: modelSelect,
  dispatchWhatIfCreate: modelWhatIfCreate,
  dispatchModelLocked: modelLocked,
  dispatchModelChange: modelChange,
  dispatchModelClearCache: modelClearCache,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainHeaderContentBottom);
