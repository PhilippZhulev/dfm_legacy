import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox } from 'components';
import classNames from 'classnames';

export default function SystemCatalogsTableHeader({
  classes,
  items,
  checkState,
  onChange,
  enableEdit,
}) {
  const styles = useStyles({ classes });
  return (
    <thead>
      <tr className={styles.tableHeader}>
        {enableEdit && (
          <td
            key={'checkbox'}
            className={classNames(
              styles.checkboxItem,
              styles.checkboxItemHeader
            )}>
            <Checkbox
              checked={checkState === 'checked'}
              indeterminate={checkState === 'indeterminate'}
              onChange={onChange}
            />
          </td>
        )}
        {items.map((item, ind) => (
          <td
            className={classNames(styles.headerItem, {
              [styles.firstHeaderItem]: ind === 0,
            })}
            key={item}>
            {item}
          </td>
        ))}
      </tr>
    </thead>
  );
}

const useStyles = makeStyles(
  (theme) => ({
    tableHeader: {
      display: 'table-row',
      width: 'fit-content',
      background: theme.colorsTheme.headerBackground,
      zIndex: 3,
      paddingRight: 21,
    },
    checkboxItem: {
      width: 42,
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 7,
      background: theme.colorsTheme.categoryBackground,
      display: 'table-cell',
      '& .MuiSvgIcon-root': {
        '& path': {
          fill: theme.colorsTheme.grey,
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
    checkboxItemHeader: {
      top: 0,
      left: 0,
      zIndex: 7,
    },
    headerItem: {
      padding: '15px 15.5px',
      fontSize: 12,
      borderRight: `1px solid ${theme.colorsTheme.headerBorders}`,
      borderTop: `1px solid ${theme.colorsTheme.headerBorders}`,
      borderBottom: `1px solid ${theme.colorsTheme.headerBorders}`,
      textTransform: 'uppercase',
      fontWeight: 600,
      color: theme.colorsTheme.headerColor,
      width: 300,
      height: 48,
      lineHeight: '16px',
      display: 'table-cell',
      whiteSpace: 'nowrap',
      paddingRight: 37,
      background: theme.colorsTheme.headerBackground,
      position: 'sticky',
      top: 0,
      zIndex: 6,
    },
    firstHeaderItem: {
      borderLeft: `1px solid ${theme.colorsTheme.headerBorders}`,
    },
    optionsIcon: {
      position: 'absolute',
      display: 'flex',
      top: 0,
      bottom: 0,
      right: 13.5,
      '& svg': {
        margin: 'auto 0',
        '& path': {
          transition: 'all 300ms ease-in-out',
        },
        '&:hover': {
          cursor: 'pointer',
        },
        '&:hover path': {
          stroke: 'white!important',
        },
      },
    },
    optionsIconWrapper: {
      height: '100%',
      display: 'flex',
    },
  }),
  { name: 'SystemCatalogsTable' }
);
