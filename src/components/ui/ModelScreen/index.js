/*
 * desc: контролл Поле ввода
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Поля ввода экрана графа
 * @component
 * @public
 */
function ModelScreen({ classes, children }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <div data-testid='modelScreen' className={styles.modelScreen}>
      {children}
    </div>
  );
}

ModelScreen.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

ModelScreen.defaultProps = { classes: {} };

// Приватные стили
const useStyles = makeStyles(() => ({ modelScreen: { display: 'flex' } }));

export default ModelScreen;
