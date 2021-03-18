import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Кнопка
 * @component
 * @public
 */
function InfoItem({ label, text, classes }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <div className={styles.infoItem}>
      <div className={styles.infoLabel}>{label}</div>
      <div className={styles.infoText}>{text}</div>
    </div>
  );
}

InfoItem.propTypes = {
  label: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
  classes: PropTypes.object,
};

InfoItem.defaultProps = {
  label: '',
  text: '',
  classes: {},
};

// Приватные стили
const useStyles = makeStyles((theme) => ({
  infoItem: {
    marginBottom: 30,
    '&:focus': { outline: 'none' },
    '&:last-child': { marginBottom: 0 },
  },
  infoLabel: {
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    color: theme.colorsTheme.grey,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    lineHeight: '20px',
  },
}));

export default InfoItem;
