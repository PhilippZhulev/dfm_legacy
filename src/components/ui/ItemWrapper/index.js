/*
 * desc: контролл текст кнопка
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Кнопка линк кликабельная или нет
 * @component
 * @public
 */
function ItemWrapper({ children, classes }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <div className={`${styles.infoItem} ${styles.childElementItem}`}>
      {children}
    </div>
  );
}

ItemWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  classes: PropTypes.object,
};

ItemWrapper.defaultProps = {
  classes: {},
};

// Приватные стили
const useStyles = makeStyles((theme) => ({
  infoItem: {
    height: 30,
    marginBottom: 30,
    '&:focus': { outline: 'none' },
    '&:last-child': { marginBottom: 0 },
  },
  childElementItem: { height: 'unset' },
}));

export default ItemWrapper;
