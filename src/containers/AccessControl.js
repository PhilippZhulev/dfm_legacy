import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { AccessControl } from '../components';

const getUserData = (store) => store.handleFetchUserSuccess;
const getPermissionsSelector = createSelector([getUserData], (userData) => ({
  roles: userData.roles,
  permissions: userData.permissions,
}));

const mapStateToProps = (store) => ({
  ...getPermissionsSelector(store),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AccessControl);
