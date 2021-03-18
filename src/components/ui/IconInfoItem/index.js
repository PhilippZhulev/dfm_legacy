import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Кнопка
 * @component
 * @public
 */
function IconInfoItem({ label, icon, classes }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <div className={styles.IconInfoItem}>
      <div className={styles.dateIcon}>{icon}</div>
      <div className={styles.dateValue}>{label}</div>
    </div>
  );
}

IconInfoItem.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  classes: PropTypes.object,
};

IconInfoItem.defaultProps = {
  label: '',
  classes: {},
};

// Приватные стили
const useStyles = makeStyles((theme) => ({
  dateIcon: { '& svg': { fill: theme.colorsTheme.disabled } },
  IconInfoItem: { display: 'flex' },
  dateValue: {
    color: theme.colorsTheme.disabled,
    fontSize: 14,
    marginLeft: 8,
  },
}));

export default IconInfoItem;
