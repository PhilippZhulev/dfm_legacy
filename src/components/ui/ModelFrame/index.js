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
function ModelFrame({ classes, children }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <div
      data-testid='root'
      className={styles.root}>
      {children}
    </div>
  );
}

ModelFrame.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

ModelFrame.defaultProps = { classes: {} };

// Приватные стили
const useStyles = makeStyles(() =>
  ({
    root: {
      width: 'calc(100% - 304px)',
      height: 'calc(100% - 85px)',
      padding: '0 32px 0 0',
      boxSizing: 'border-box',
      margin: '0 0 0 auto',
      bottom: 0,
      left: 0,
      right: 0,
      position: 'absolute',
    },
  }));

export default ModelFrame;
