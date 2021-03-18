// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function KeyValue({ classes, label, value }) {
  const styles = useStyles({ classes });

  // Представление
  return (
    <div className={styles.nodeInfo}>
      <div className={styles.nodeInfo_label}>{label} :</div>
      <div className={styles.nodeInfo_value}>{value}</div>
    </div>
  );
}

// Типы props
KeyValue.propTypes = {
  classes: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

KeyValue.defaultProps = {
  classes: {},
  label: '',
  value: '',
};

// Приватные стили
const useStyles = makeStyles((theme) =>
  ({
    nodeInfo: {
      marginBottom: 20,
      display: 'flex',
    },
    nodeInfo_label: {
      color: theme.colorsTheme.disabled,
      fontSize: 14,
    },
    nodeInfo_value: {
      color: theme.colorsTheme.text,
      fontSize: 14,
      marginLeft: 8,
    },
  }));

export default KeyValue;
