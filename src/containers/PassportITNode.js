import { connect } from 'react-redux';
import { PassportITNode } from 'components';
import { createSelector } from 'reselect';

export const getResource = (store) => store.handleResourcesSuccess.data;

const getMemoSelector = createSelector([getResource], (resources) => ({
  resources,
}));

const mapStateToProps = (store) => getMemoSelector(store);

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PassportITNode);
