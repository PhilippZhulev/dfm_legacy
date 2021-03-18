/*
 * desc: контролл Выпадающий список
 * type: UI-component
 * ver: 1.0.0
 * Copyright(c) Heavy mouse team.
 *
 * props:
 * @value {string, number}
 * @type {string} text password number,
 * @classes {object},
 * @onChange {void}
 */

// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Выпадающий список
 * @component
 * @public
 */
function SimpleSelect({
  current,
  classes,
  items,
  disabled,
  readonly,
  onChange,
}) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <>
      <select
        data-testid='root'
        onChange={onChange}
        defaultValue={current}
        className={styles.select}
        readOnly={readonly || false}
        disabled={disabled || false}>
        {items.map((op, ind) =>
          (
            <option className={styles.option} key={ind} value={op.value}>
              {op.label}
            </option>
          ))}
      </select>
    </>
  );
}

SimpleSelect.propTypes = {
  current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.object,
  items: PropTypes.array,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
};

SimpleSelect.defaultProps = {
  current: 0,
  classes: {},
  items: [],
  disabled: false,
};

// Приватные стили
const useStyles = makeStyles((theme) =>
  ({
    '@global': {
      ...theme.global,
      ...theme.OpenSans,
      ...theme.initOpenSans,
    },
  }), {
    name: 'SimpleSelect',
  });

export default SimpleSelect;
