import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Сетка кнопок
 * @component
 * @public
 */
function TableButtonsItem({ classes, children }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <div data-testid='root' className={styles.root}>
      {children}
    </div>
  );
}

TableButtonsItem.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

TableButtonsItem.defaultProps = { classes: {} };

// Приватные стили
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'inline-flex',
    height: '50%',
    '& > div': { padding: '0 15px' },
  },
}));

export default TableButtonsItem;
