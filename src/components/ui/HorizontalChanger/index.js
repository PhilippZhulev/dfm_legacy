import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { AppBarCol } from 'components';
import classNames from 'classnames';

/**
 * Горизонтальный переключатель
 * @component
 * @public
 */
function HorizontalChanger({ classes, current, items, allowItems, onChange }) {
  /** ANCHOR: Получить classes */
  const styles = useStyles({ classes });

  return (
    <div className={styles.wrapper}>
      {items.map((item) => (
        <div
          data-testid={`checker_${item.value}`}
          key={item.value}
          onClick={() =>
            allowItems.includes(item.value) && onChange(item.value)
          }
          className={classNames(styles.label, {
            selected: item.value === current,
            disabled: !allowItems.includes(item.value),
          })}>
          {item.label}
        </div>
      ))}
    </div>
  );
}

HorizontalChanger.propTypes = {
  classes: PropTypes.object,
  current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  items: PropTypes.array.isRequired,
  allowItems: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

HorizontalChanger.defaultProps = {
  classes: {},
  current: '',
  items: {},
  allowItems: [],
  onChange: null,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    wrapper: {
      display: 'inline-flex',
    },
    label: {
      color: '#657D95',
      display: 'flex',
      cursor: 'pointer',
      padding: '4px 16px',
      margin: '8px 0px',
      fontSize: 13,
      lineHeight: '16px',
      fontWeight: 500,

      '&.selected': {
        color: '#fff',
        background: '#6B75CA',
        borderRadius: 50,
        display: 'flex',
        flexDirection: 'row',
        flex: 'none',
        order: 0,
        alignSelf: 'center',
      },

      '&.disabled': {
        opacity: 0.3,
        cursor: 'not-allowed',
        pointerEvents: 'all',
      },
    },
  }),
  {
    name: 'HorizontalChanger',
  }
);

export default HorizontalChanger;
