/*
 * desc: контролл Поле ввода
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function ButtonBlock({ classes, children }) {
  // Получить classes
  const styles = useStyles({ classes });

  return <div className={styles.buttonBlock}>{children}</div>;
}

ButtonBlock.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  classes: PropTypes.object,
};

ButtonBlock.defaultProps = { classes: {} };

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({ buttonBlock: { display: 'flex' } }),
  {
    name: 'ButtonBlock',
  }
);

export default ButtonBlock;
