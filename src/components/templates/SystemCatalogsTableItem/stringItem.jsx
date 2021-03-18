/* eslint-disable max-lines */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Элемент таблицы системых справочников
 * @component
 * @public
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
function StringItem({
  classes,
  disabled,
  value,
  onChange,
}) {
  const [input, setInput] = useState(value);
  const [focused, setFocused] = useState(false);
  const styles = useStyles({ classes });
  const _handleInput = (e) => {
    const string = e.target.value;
    setInput(string);
    clearTimeout(window.catalogTableInput);
    window.catalogTableInput = setTimeout(() => {
      onChange(string);
    }, 1000);
  };

  useEffect(() => {
    if (value !== input) {
      setInput(value);
    }
  }, [value]);

  return (
    <>
        <div
        className={styles.itemTextWrapper}
        style={{ display: disabled ? '' : 'none' }}>
        <span className={styles.itemText}>
            {input}
        </span>
        </div>
        {!disabled && (
        <div
          className={
            classNames(
              styles.inputWrapper,
              {
                [styles.inputWrapper_focused]: focused,
              }
            )
          }>
            <input
              onChange={_handleInput}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              value={input}
              className={styles.input}
            />
            <div className={classNames(styles.hiddenSpan)}>
              {input}
            </div>
        </div>
        )}
    </>
  );
}

const useStyles = makeStyles(
  (theme) => ({
    inputWrapper_focused: {
      color: 'unset',
    },
    itemText: {
      color: theme.colorsTheme.grey,
      margin: 'auto 0',
      wordBreak: 'break-word',
    },
    inputWrapper: {
      border: '1px solid rgba(0,0,0,0)',
      height: 62,
      '&$inputWrapper_focused': {
        border: '1px solid rgba(31, 142, 250, 0.7)',
      },
    },
    input: {
      zIndex: 5,
      background: 'rgba(0,0,0,0)',
      color: theme.colorsTheme.text,
      outline: 'none',
      resize: 'none',
      padding: '10px 15px',
      width: '100%',
      height: '100%',
      border: '1px solid rgba(0,0,0,0)',
      lineHeight: '18px',
      margin: 'auto 0',
      fontSize: 12,
    },
    itemTextWrapper: {
      padding: '10px 15px',
      lineHeight: '12px',
    },
    hiddenSpan: {
      visibility: 'hidden',
      fontSize: 12,
      padding: '10px 15px',
    },
  }),
  { name: 'StringItem', index: 1 }
);

StringItem.defaultProps = {
  classes: {},
  disabled: true,
  value: '',
  onChange: () => {},
};

StringItem.propTypes = {
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default StringItem;
