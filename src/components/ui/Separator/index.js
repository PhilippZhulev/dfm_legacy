/*
 * desc: контролл Поле ввода
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function Separator({ classes }) {
  // Получить classes
  const styles = useStyles({ classes });

  return <div className={styles.horizontalSeparator} />;
}

Separator.propTypes = { classes: PropTypes.object };

// Приватные стили
const useStyles = makeStyles((theme) =>
  ({
    horizontalSeparator: {
      padding: '0 10px',
      backgroundColor: theme.colorsTheme.separator,
      margin: '30px 0',
      height: 1,
    },
  }));

export default Separator;
