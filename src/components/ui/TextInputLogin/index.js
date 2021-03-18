/*
 * desc: контролл Поле ввода
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Текстовое поле экрана аутификации
 * @component
 * @public
 */
function TextInputLogin({
  onChange,
  type,
  value,
  onKeyPress,
  placeholder,
  label,
  err,
  classes,
}) {
  const styles = useStyles({ classes });

  return (
    /* Обертка */
    <div data-testid='root' className={`${styles.root} ${err ? styles.error : ''}`}>
      {/* Заголовок поля */}
      <div data-testid='label' className={`${styles.label} ${err ? styles.errLabel : ''}`}>
        {label}
      </div>

      {/*
       * Поле ввода
       * readOnly + onFocus => remove attr readOnly
       * хак для отключения автозаполнения
       */}
      <input
        data-testid='input'
        placeholder={placeholder}
        readOnly
        onFocus={(e) =>
          e.target.removeAttribute('readonly')}
        onKeyPress={(e) =>
          (onKeyPress ? onKeyPress(e) : false)}
        onChange={onChange}
        type={type}
        value={value}
        className={styles.input}
      />
    </div>
  );
}

TextInputLogin.propsTypes = {
  classes: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onKeyPress: PropTypes.func,
  err: PropTypes.bool,
};

TextInputLogin.defaultProps = {
  value: '',
  label: '',
  type: 'text',
  classes: {},
};

// Приватные стили
const useStyles = makeStyles((theme) =>
  ({ ...theme.TextInputLogin }));

export default TextInputLogin;
