import { connect } from 'react-redux';
import { ModelTile } from 'components';
import { modalAction } from '../redux/modals/actions';
import {
  modelCopy,
  modelDelete,
  modelSelect,
  modelFavorite,
  modelTariff,
  whatifSelect,
  modelWhatIfCreate,
} from '../redux/model/actions';

function mapStateToProps(payload) {
  return {};
}

const mapDispatchToProps = {
  dispatchModal: modalAction,
  dispatchCopyModal: modelCopy,
  dispatchDeleteModal: modelDelete,
  dispatchModelSelect: modelSelect,
  dispatchModelFavorite: modelFavorite,
  dispatchModelTariff: modelTariff,
  dispatchWhatifSelect: whatifSelect,
  dispatchWhatIfCreate: modelWhatIfCreate,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelTile);
