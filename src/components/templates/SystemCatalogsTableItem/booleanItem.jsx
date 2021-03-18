/* eslint-disable max-lines */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import CheckboxIcon from '../../svg/Checkbox';
import CheckboxChecked from '../../svg/CheckboxChecked';

/**
 * Элемент таблицы системых справочников
 * @component
 * @public
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
function BooleanItem({ classes, value, label, disabled, onChange }) {
  const styles = useStyles({ classes });
  return (
    <div className={styles.checkboxItem}>
      <Checkbox
        checked={value}
        disabled={disabled}
        classes={{ root: styles.checkboxRoot }}
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxChecked />}
        onChange={() => onChange(!value)}
      />
      <span className={styles.input}>{label}</span>
    </div>
  );
}

const useStyles = makeStyles(
  (theme) => ({
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
    checkboxItem: {
      width: 42,
      zIndex: 7,
      '& .MuiSvgIcon-root': {
        '& path': {
          fill: theme.text,
        },
      },
      '& .Mui-checked .MuiSvgIcon-root': {
        '& path': {
          fill: `${theme.colorsTheme.selected}!important`,
        },
      },
      '& .MuiCheckbox-indeterminate .MuiSvgIcon-root': {
        '& path': {
          fill: `${theme.colorsTheme.selected}!important`,
        },
      },
    },
    checkboxRoot: {
      '& svg': {
        minWidth: 16,
        minHeight: 16,
        fill: 'rgba(0,0,0,0)',
      },
      '&.Mui-checked + span': {
        color: theme.colorsTheme.text,
      },
      '&.Mui-checked svg': {
        background: theme.colorsTheme.text,
        borderRadius: 4,
      },
      margin: 'auto 0',
    },
  }),
  { name: 'BooleanItem', index: 1 }
);

BooleanItem.defaultProps = {
  value: false,
  label: 'Состояние',
  disabled: true,
  onChange: () => {},
};

BooleanItem.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.bool,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default BooleanItem;
