import { connect } from 'react-redux';
import { ReferenceBook } from 'components';
import { createSelector } from 'reselect';
import { permitRule } from '../helpers';
import { dictSave, modelSelect, modelSave } from '../redux/model/actions';

const getPermissionsModel = (store) =>
  store.handleModelSelectSuccess.data.permissions;

/** ANCHOR: блокаровка справочника модели в зависимости от полномочий */
const getLockedMemo = createSelector([getPermissionsModel], (permissions) => ({
  allowed: permitRule(permissions, ['update']),
}));

const mapStateToProps = (store) => {
  const { period, value } = store.handleResourcesSuccess.data;
  return {
    ...getLockedMemo(store),
    resource: value,
  };
};

const mapDispatchToProps = {
  dispatchSave: dictSave,
  dispatchModelSelect: modelSelect,
  dispatchModelSave: modelSave,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceBook);
