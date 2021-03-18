import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Кнопка
 * @component
 * @public
 */
function Button({ top, disabled, onClick, mod, red, position, text, classes }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    /* Обертка */
    <div
      data-testid='root'
      style={top ? { marginTop: top } : null}
      className={styles.root}>
      {/*
       * Кнопка
       * props.position: определяет класс стиля поз. кнопки
       * (right, center)
       */}
      <button
        data-testid='button'
        type='button'
        disabled={disabled}
        onClick={onClick}
        className={`
          ${styles.button}
          ${mod ? styles.mod_blue : ''}
          ${red ? styles.mod_red : ''}
          ${position === 'center' ? styles.button__center : ''}
          ${position === 'right' ? styles.button__right : ''}
          ${position === 'left' ? styles.button__left : ''}
        `}>
        {text}
      </button>
    </div>
  );
}

Button.propTypes = {
  position: PropTypes.string,
  red: PropTypes.bool,
  mod: PropTypes.bool,
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  top: PropTypes.number,
  classes: PropTypes.object,
};

Button.defaultProps = {
  classes: {},
  position: 'lft',
  red: false,
  mod: false,
  text: '',
  disabled: false,
};

// Приватные стили
const useStyles = makeStyles((theme) => ({ ...theme.button }), {
  name: 'Button',
});

export default Button;
