import React from 'react';
import PropTypes from 'prop-types';
import { modifyComponent } from 'helpers';
import { makeStyles } from '@material-ui/core/styles';

/**
 * @mod Модификатор поля текста
 * @component
 * @public
 */
function PeriodSelect({ children }) {
  const styles = useStyles();
  return modifyComponent(children, {
    classes: {
      select: styles.select,
      label: styles.label,
      selectedValues: styles.selectedValues,
      menuIcon: styles.menuIcon,
    },
  });
}

PeriodSelect.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string,
};

const useStyles = makeStyles(
  (theme) => ({
    select: {
      cursor: 'pointer',
      minHeight: '34px',
      background: 'none',
      fontSize: 14,
      lineHeight: '16px',
      display: 'flex',
      alignItems: 'center',
      color: '#fff',
      padding: '0px 9px',
      height: '100%',
    },
    selectedValues: {
      padding: 0,
      color: '#fff',
    },
    label: {
      display: 'none',
    },
    menuIcon: {
      '& svg': {
        margin: '0px 6px',
        width: 5,
        display: 'flex',
        alignItems: 'center',
      },
    },
  }),
  {
    name: 'PeriodSelect',
    index: 1,
  }
);

export default PeriodSelect;
