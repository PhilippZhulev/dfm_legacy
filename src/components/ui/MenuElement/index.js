import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Элемент меню
 * @component
 * @public
 */
function MenuElement({ children, classes, disabled }) {
  const styles = useStyles({ classes });

  return (
    <div
      data-testid='root'
      className={`${styles.root} ${disabled ? styles.disabled : ''}`}>
      {children}
    </div>
  );
}

MenuElement.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  disabled: PropTypes.bool,
};

// Приватные стили
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: -4,
    width: 20,
    textAlign: 'center',
    '& path': {
      fill: theme.text,
      transition: 'all 300ms ease-in-out',
    },
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}));

export default MenuElement;
