import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Элемент таблицы системых справочников
 * @component
 * @public
 */
function SystemCatalogsTableCell({
  classes,
  enableEdit,
  checked,
  noLeft,
  children,
}) {
  const styles = useStyles({ classes });

  return (
    <td
      className={classNames(
        styles.itemWrapper,
        { [styles.editEnabled]: enableEdit },
        { [styles.checked]: checked }
      )}
      style={{
        borderLeft: noLeft ? 'none' : '',
      }}>
      {children}
    </td>
  );
}

const useStyles = makeStyles(
  (theme) => ({
    itemWrapper: {
      position: 'relative',
      border: `0.5px solid ${theme.colorsTheme.tableBorders}`,
      borderTop: 'none',
      fontSize: 12,
      width: 300,
      display: 'table-cell',
      whiteSpace: 'nowrap',
      alignItems: 'center',
      height: 64,
      padding: 0,
      verticalAlign: 'middle',
      '& .MuiSelect-select:focus': {
        background: 'transparent',
      },
    },
    editEnabled: {
      background: theme.colorsTheme.nodeBackground,
    },
    checked: {
      background: theme.colorsTheme.checkedRow,
    },
  }),
  { name: 'SystemCatalogsTableCell', index: 1 }
);

SystemCatalogsTableCell.defaultProps = {
  noLeft: true,
  column: null,
  row: 0,
  enableEdit: false,
  checked: false,
  options: {},
  type: null,
  children: null,
};

SystemCatalogsTableCell.propTypes = {
  classes: PropTypes.object,
  noLeft: PropTypes.bool,
  column: PropTypes.string,
  row: PropTypes.number,
  enableEdit: PropTypes.bool,
  checked: PropTypes.bool,
  options: PropTypes.object,
  type: PropTypes.string,
  catalog: PropTypes.object,
  data: PropTypes.array,
  update: PropTypes.object,
  setUpdate: PropTypes.func,
  children: PropTypes.object,
};

export default SystemCatalogsTableCell;
