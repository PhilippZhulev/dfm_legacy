import React from 'react';
import PropTypes from 'prop-types';
import { modifyComponent } from 'helpers';
import { makeStyles } from '@material-ui/core/styles';

/**
 * @mod Модификатор поля текста
 * @component
 * @public
 */
function ModSelect({ children }) {
  const styles = useStyles();
  return modifyComponent(children, {
    classes: {
      select: styles.select,
      label: styles.label,
      selectedValues: styles.selectedValues,
    },
  });
}

ModSelect.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string,
};

const useStyles = makeStyles(
  (theme) => ({
    select: {
      width: '100%',
      cursor: 'pointer',
      display: 'flex',
      minHeight: '34px',
      background: 'rgba(32, 41, 60, 0.77)',
      fontSize: '14px',
      borderRadius: '50px',
      height: '34px',
    },
    selectedValues: {
      lineHeight: '33px',
    },
    label: {
      display: 'none',
    },
  }),
  {
    name: 'ModSelect',
    index: 1,
  }
);

export default ModSelect;
