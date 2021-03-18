import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Ячейка сетки шапки
 * @component
 * @public
 */
const AppBarCol = React.memo(({ children, classes, width, maxWidth }) => {
  const useStyles = makeStyles(
    (theme) => ({
      headerItemCol: {
        height: '100%',
        width,
        maxWidth,
        padding: '12px 15px',
        position: 'relative',
        display: 'inline-flex',
      },
    }),
    {
      name: 'AppBarCol',
    }
  );

  // Получить classes
  const styles = useStyles({ classes });

  return <div className={styles.headerItemCol}>{children}</div>;
});

AppBarCol.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  classes: PropTypes.object,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
};

export default AppBarCol;
