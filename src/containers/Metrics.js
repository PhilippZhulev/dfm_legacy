import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Metrics from '../components/templates/ReferenceBook/metrics';

const getCategories = (store) => store.handleModelSelectSuccess.data.categories;

const getMemoSelector = createSelector([getCategories], (categories) => {
  const mapCategories = {};
  categories.forEach((category) => {
    mapCategories[category.value] = { ...category };
  });

  return {
    mapCategories,
    categories,
  };
});

const mapStateToProps = (store) => ({ ...getMemoSelector(store) });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
