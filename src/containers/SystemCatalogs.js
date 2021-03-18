// TODO: для системных справочников redux больше не используется

import { connect } from 'react-redux';
import { SystemCatalogs } from 'components';
import { fetchDictionary, saveDictionary } from '../redux/systemDict/actions';

const mapStateToProps = (payload) => ({
  fetchResult: payload.handleSystemsDictionaryErrorSuccess,
});

const mapDispatchToProps = {
  dispatchCatalogFetch: fetchDictionary,
  dispatchCatalogSave: saveDictionary,
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemCatalogs);
