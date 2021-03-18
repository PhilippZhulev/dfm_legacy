import { connect } from 'react-redux';
import { PanelCategories } from '../components/templates/MaximizeNodeConsumes/panelCategories';
import { modalAction } from '../redux/modals/actions';
import { resourceCopy } from '../redux/resources/actions';

const mapStateToProps = (payload) => ({});

const mapDispatchToProps = {
  dispatchModal: modalAction,
  dispatchCopyResource: resourceCopy,
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelCategories);
