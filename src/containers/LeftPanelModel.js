import { connect } from 'react-redux';
import { LeftPanelModel } from 'components';

/**
 * ANCHOR: Мгенерировать пропсы для компонента
 * @param  {} payload
 * @public
 */
function mapStateToProps(payload) {
  const { data } = payload.handleResourcesSuccess;

  return {
    data,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanelModel);
