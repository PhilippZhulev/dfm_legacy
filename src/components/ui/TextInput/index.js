import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
/*
 * desc: контролл Поле ввода
 * Copyright(c) Heavy mouse team.
 */

/**
 * Текстовое поле
 * @component
 * @public
 */
const TextInput = React.forwardRef((props, ref) => {
  const {
    type,
    value,
    disabled,
    autocomplete,
    onChange,
    onFocus,
    placeholder,
    width,
    label,
    classes,
    onKeyPress,
    onBlur,
    ...other
  } = props;

  const handleFocus = (e) => {
    e.target.removeAttribute('readonly');

    if (onFocus) {
      onFocus(e);
    }
  };

  // Получить classes
  const styles = useStyles({ classes });

  return (
    /* Обертка */
    <div
      data-testid='root'
      style={width ? { width } : {}}
      className={styles.root}>
      {/* Заголовок поля */}
      <div data-testid='label' className={styles.label}>
        {label}
      </div>

      {/*
       * Поле ввода
       * readOnly + onFocus => remove attr readOnly
       * хак для отключения автозаполнения
       */}
      <input
        data-testid='input'
        ref={ref}
        placeholder={placeholder}
        autoComplete={autocomplete.toString() || ''}
        readOnly
        onFocus={handleFocus}
        onChange={onChange}
        type={type}
        value={value}
        className={styles.input}
        onKeyPress={onKeyPress}
        onBlur={onBlur}
        disabled={disabled || false}
        {...other}
      />
    </div>
  );
});

TextInput.propTypes = {
  type: PropTypes.string,
  classes: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  autocomplete: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
};

TextInput.defaultProps = {
  type: 'text',
  classes: {},
  value: '',
  disabled: false,
  autocomplete: false,
  placeholder: '',
  label: '',
  onKeyPress: () => {},
  onBlur: () => {},
};

// Приватные стили
const useStyles = makeStyles((theme) => ({ ...theme.textInput }));

export default TextInput;
