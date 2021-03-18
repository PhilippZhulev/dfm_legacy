import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

/**
 * Сетка кнопок
 * @component
 * @public
 */
function TableButtons({ classes, children }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <div data-testid='root' className={styles.root}>
      {children}
    </div>
  );
}

TableButtons.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

TableButtons.defaultProps = { classes: {} };

// Приватные стили
const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    marginLeft: 20,
    height: '100%',
    display: 'inline-flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    padding: '10px 0 0 0',
  },
}));

export default TableButtons;
