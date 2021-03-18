import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

/**
 * Нижняя часть шапки
 * @component
 * @public
 */
function HeaderBottom({ children, classes }) {
  const styles = useStyles({ classes });

  return (
    <div className={styles.headerBottom}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}

HeaderBottom.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  classes: PropTypes.object,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    headerBottom: {
      height: 50,
      width: '100%',
      background: theme.colorsTheme.layer,
      borderTop: `2px solid ${theme.colorsTheme.input}`,
      zIndex: 10,
      position: 'relative',
      top: 0,
    },
    inner: {
      padding: '0 25px',
      height: '100%',
      display: 'flex',
    },
  }),
  {
    name: 'HeaderBottom',
  }
);

export default HeaderBottom;
