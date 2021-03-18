import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Кнопка
 * @component
 * @public
 */
function Background({ children, classes }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    /* Обертка */
    <div className={styles.root}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}

Background.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  classes: PropTypes.object,
};

// Приватные стили
const useStyles = makeStyles((theme) => ({ ...theme.background }));

export default Background;
