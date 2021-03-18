import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import useValueFormat from '../../../helpers/useValueFormat';

/**
 * Ui подсветка узла в метрики
 * @param {Object} classes
 * @param {Number} value значение узла
 * @param {String} label название узла
 * @param {String} color цвет категории
 * @component
 */
function ConsumedResources({
  classes,
  value,
  color,
  label,
  id,
  invert,
  noClick,
}) {
  const data = useValueFormat({ value });

  const handleClickNode = () => {
    document.dispatchEvent(
      new CustomEvent('app.graph.activeNode', {
        detail: {
          value: id,
          label: label,
        },
      })
    );
    window.ActiveNode(id, true);
  };

  const styles = useStyles({ classes });
  return (
    <div
      onClick={() => (!noClick ? handleClickNode() : () => {})}
      data-testid='root'
      className={!invert ? styles.root : styles.rootInvert}>
      <div
        style={{ background: color }}
        data-testid='color'
        className={styles.category}
      />
      <div data-testid='title' className={styles.title}>
        {label}
      </div>
      <div data-testid='value' className={styles.value}>
        {!noClick ? `${data._$value}ед.` : data.$value}
      </div>
    </div>
  );
}

ConsumedResources.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.number,
  label: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string,
  invert: PropTypes.bool,
  noClick: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '15px 20px',
    margin: '5px 0',
    background: '#2F3B52',
    position: 'relative',
    border: '1px solid #242E42',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  rootInvert: {
    padding: '15px 20px',
    margin: '5px 5px 5px 5px',
    width: '35%',
    height: 76,
    background: '#242e42',
    position: 'relative',
    border: '1px solid #242e42',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  title: {
    color: '#98A7B9',
    fontSize: 14,
    lineHeight: '22px',
  },
  value: {
    color: '#fff',
    fontSize: 14,
    lineHeight: '22px',
  },
  category: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 5,
    height: 20,
    bottom: 0,
    margin: 'auto',
    transition: 'all 300ms ease-in-out',
    willChange: 'top, bottom',
    borderRadius: '0 3px 3px 0',
  },
}));

export default ConsumedResources;
