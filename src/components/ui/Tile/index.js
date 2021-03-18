import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Кнопка
 * @component
 * @public
 */
function Tile({ classes, children, onClick }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <div data-testid='root' onClick={onClick} className={styles.root}>
      <div data-testid='wrapper' className={styles.wrapper}>
        {children}
      </div>
    </div>
  );
}

Tile.propTypes = {
  classes: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

Tile.defaultProps = { classes: {} };

// Приватные стили
const useStyles = makeStyles((theme) => ({
  root: {
    width: 280,
    height: 153,
    padding: '22px 16px',
    backgroundColor: theme.colorsTheme.background,
    boxSizing: 'border-box',
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    paddingRight: 30,
    cursor: 'pointer',
  },
  wrapper: {
    position: 'relative',
    height: '100%',
    zIndex: 2,
  },
}));

export default Tile;
