import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * Кнопка
 * @component
 * @public
 */
function SelectModelButton({ classes, label, select, onClick }) {
  // Получить classes
  const styles = useStyles({ classes });

  return (
    <div data-testid='root' className={styles.root}>
      <div data-testid='label' className={styles.label}>
        {label}
      </div>
      <div
        data-testid='selectWrapper'
        className={styles.selectWrapper}
        onClick={onClick}>
        <div data-testid='value' title={select} className={styles.value}>
          {select}
        </div>
      </div>
    </div>
  );
}

SelectModelButton.propTypes = {
  classes: PropTypes.object,
  label: PropTypes.string,
  select: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

SelectModelButton.defaultProps = {
  classes: {},
  label: '',
  select: '',
};

// Приватные стили
const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    ...theme.SelectComponent.label,
    paddingLeft: 0,
  },
  selectWrapper: {
    ...theme.SelectComponent.select,
    background: 'transparent',
    paddingLeft: 2,
  },
  value: {
    color: theme.colorsTheme.blue,
    fontSize: 14,
    lineHeight: '36px',
    overflow: 'hidden',
    wordBreak: 'break-all',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: 200,
  },
}));

export default SelectModelButton;
