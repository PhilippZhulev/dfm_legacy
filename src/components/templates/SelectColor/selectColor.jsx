import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from 'components';
import { COLOR_ITEMS } from '../ReferenceBook/categories';

export const SelectColor = (props) => {
  const { value, onChange, disabled } = props;
  /** Инициализация стилей */
  const classes = useStyles(props);
  return (
    <Select
      value={value || '#EF5350'}
      MenuProps={{ classes: { paper: classes.select } }}
      onChange={onChange}
      IconComponent={(iconProps) => (
        <Icon
          icon='CHEVRON_DOWN'
          size={16}
          fillColor='transparent'
          {...iconProps}
        />
      )}
      className={classes.select}
      classes={{ icon: classes.selectIcon }}
      disabled={disabled}>
      <MenuItem value={value}>
        <div
          style={{
            backgroundColor: value || '#EF5350',
            height: 16,
            width: '100%',
          }}
        />
      </MenuItem>
      {COLOR_ITEMS.filter((el) => el !== value).map((el, key) => (
        <MenuItem key={key} value={el}>
          <div
            style={{
              backgroundColor: el,
              height: 16,
              width: '100%',
            }}
          />
        </MenuItem>
      ))}
    </Select>
  );
};

/** Основные стили */
const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      selectIcon: {
        color: `${colorsTheme.grey} !important`,
        cursor: 'pointer',
        position: 'absolute',
        top: 'auto',
      },

      select: {
        width: '100%',
        maxWidth: 200,
        background: 'inherit',
        color: '#fff',
        lineHeight: '18px',
        fontSize: 12,
        backgroundColor: colorsTheme.background,

        '&::before': {
          border: 'none !important',
        },
        '&::after': {
          border: 'none !important',
        },

        '& .MuiSelect-select:focus': {
          background: 'transparent',
        },
      },
    };
  },
  { index: 2, name: 'SelectColor' }
);
