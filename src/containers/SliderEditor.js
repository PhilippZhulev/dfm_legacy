import { connect } from 'react-redux';
import { SliderEditor } from 'components';
import { createSelector } from 'reselect';
import { permitRule } from '../helpers';

const getLockedModel = (store) => store.handleModelLocked.state;

const getPermissionsModel = (store) =>
  store.handleModelSelectSuccess.data.permissions;

/** ANCHOR: блокаровка модели в зависимости от полномочий */
const getMemoLockedSelector = createSelector(
  [getLockedModel, getPermissionsModel],
  (lockedModel, permissions) => ({
    lockedModel: lockedModel && permitRule(permissions, ['update']),
  })
);

const mapStateToProps = (store) => getMemoLockedSelector(store);

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SliderEditor);
