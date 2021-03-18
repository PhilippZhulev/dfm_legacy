/*
 * desc: контролл Поле ввода
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function TilesWrapper({ classes, children, margin }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <div data-testid='root' style={{ margin }} className={styles.root}>
      {children}
    </div>
  );
}

TilesWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  classes: PropTypes.object,
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

TilesWrapper.defaultProps = { classes: {} };

// Приватные стили
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default TilesWrapper;
