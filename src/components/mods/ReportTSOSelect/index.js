import React from 'react';
import PropTypes from 'prop-types';
import { modifyComponent } from 'helpers';
import { makeStyles } from '@material-ui/core/styles';

/**
 * @mod Модификатор
 * @component
 * @public
 */
function ReportTSOSelect({ children }) {
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

ReportTSOSelect.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string,
};

const useStyles = makeStyles(
  (theme) => ({
    select: {
      cursor: 'pointer',
      minHeight: '24px',
      background: 'none',
      fontSize: 20,
      lineHeight: '24px',
      display: 'flex',
      alignItems: 'center',
      color: '#fff',
      padding: 0,
      height: '100%',
    },
    selectedValues: {
      padding: 0,
      color: '#fff',
      width: 135,
    },
    label: {
      display: 'none',
    },
    menuIcon: {
      '& svg': {
        margin: '0px 16px',
        width: 10,
        display: 'flex',
        alignItems: 'center',
      },
    },
  }),
  {
    name: 'ReportTSOSelect',
    index: 1,
  }
);

export default ReportTSOSelect;
