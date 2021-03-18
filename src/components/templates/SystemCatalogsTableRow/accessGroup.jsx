import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  Checkbox,
  SystemCatalogsCell as Cell,
  SystemCatalogsTableItem as Item,
} from 'components';

export default function AccessGroup({
  classes,
  data,
  onChange,
  enableEdit,
  secondaryData,
  checked,
  onSelect,
  selects,
}) {
  const styles = useStyles({ classes });
  const handleCategory = (e) => {
    const resultRow = { ...data, accessCategory: e.option };
    onChange(resultRow);
  };

  const handleName = (name) => {
    const resultRow = { ...data, name };
    onChange(resultRow);
  };

  const handleIsArchive = (e) => {
    const resultRow = { ...data, isArchive: e };
    onChange(resultRow);
  };

  return (
    <tr className={styles.row}>
      {enableEdit && (
        <td
          key={'checkbox'}
          className={classNames(
            styles.checkboxItem,
            styles.checkboxItemHeader
          )}>
          <Checkbox checked={checked} onChange={() => onSelect(checked)} />
        </td>
      )}
      <Cell noLeft={false}>
        <Item
          type={'string'}
          onChange={handleName}
          value={data?.name || ''}
          disabled={!enableEdit}
        />
      </Cell>
      <Cell>
        <Item
          type={'select'}
          onChange={handleCategory}
          value={String(data?.accessCategory?.code || '')}
          label={String(data?.accessCategory?.description || '')}
          disabled={!enableEdit}
          options={selects.ACCESS_CATEGORY}
        />
      </Cell>
      <Cell>
        <Item
          type={'boolean'}
          onChange={handleIsArchive}
          value={data.isArchive}
          label={''}
          disabled={!enableEdit}
        />
      </Cell>
    </tr>
  );
}

AccessGroup.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  onChange: PropTypes.func,
  enableEdit: PropTypes.bool,
  secondaryData: PropTypes.object,
  checked: PropTypes.bool,
  onSelect: PropTypes.func,
  selects: PropTypes.object,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: 'fit-content',
      display: 'flex',
      borderRadius: 8,
      zIndex: 999,
      margin: -43,
    },
    catalogMenu: {
      width: 300,
      background: theme.colorsTheme.nodeBackground,
      height: 779,
    },
    workspace: {
      width: 'calc(100% - 300px)',
      height: 779,
      background: theme.colorsTheme.categoryBackground,
    },
    titleWrapper: {
      display: 'flex',
      height: 95,
    },
    title: {
      margin: 'auto 0',
      marginLeft: 34,
      color: theme.colorsTheme.text,
      fontSize: 18,
      lineHeight: '25px',
      width: 'max-content',
    },
    buttonLabel: {
      fontSize: 14,
    },
    checkboxItem: {
      width: 42,
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 2,
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
  }),
  { name: 'SystemCatalogsRow' }
);
