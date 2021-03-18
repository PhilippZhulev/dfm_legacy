import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { ModelDangers } from '../components';

const getModelDangers = (store) => store.handleModelDangersSuccess.data;
const getDangersSelector = createSelector([getModelDangers], (dangers) => ({
  dangers,
}));

const mapStateToProps = (store) => ({
  ...getDangersSelector(store),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ModelDangers);
