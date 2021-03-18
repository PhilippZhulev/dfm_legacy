import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  Checkbox,
  SystemCatalogsCell as Cell,
  SystemCatalogsTableItem as Item,
} from 'components';

export default function AccessGroupsAuthorityObject({
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

  const handleAccessGroup = (e) => {
    const resultRow = { ...data, accessGroup: e.option };
    onChange(resultRow);
  };

  const handlePermissions = (e) => {
    const resultRow = { ...data, permissions: e.map((el) => el.option) };
    onChange(resultRow);
  };

  const handleAuthorityObject = (e) => {
    const resultRow = { ...data, authorityObject: e.option };
    onChange(resultRow);
  };

  return (
    <tr className={styles.row}>
      {enableEdit && (
        <td
          className={classNames(
            styles.checkboxItem,
            styles.checkboxItemHeader
          )}>
          <Checkbox checked={checked} onChange={() => onSelect(checked)} />
        </td>
      )}
      <Cell noLeft={false}>
        <Item
          type={'select'}
          onChange={handleAuthorityObject}
          value={String(data?.authorityObject?.id || '')}
          label={String(data?.authorityObject?.name || '')}
          disabled={!enableEdit}
          options={selects.AUTHORITY_OBJECT}
        />
      </Cell>
      <Cell>
        <Item
          type={'multiselect'}
          onChange={handlePermissions}
          value={data?.permissions ? data.permissions.map((el) => el.code) : []}
          label={
            data?.permissions
              ? data.permissions.map((el) => el.description)
              : []
          }
          disabled={!enableEdit}
          options={selects.USER_ACTION}
          selectObject={data?.permissions ? data.permissions : []}
        />
      </Cell>
      <Cell>
        <Item
          type={'select'}
          onChange={handleAccessGroup}
          value={String(data?.accessGroup?.id || '')}
          label={String(data?.accessGroup?.name || '')}
          disabled={!enableEdit}
          options={selects.DICT_ACCESS_GROUP}
        />
      </Cell>
    </tr>
  );
}

AccessGroupsAuthorityObject.propTypes = {
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
  { name: 'SystemCatalogsRow', index: 1 }
);
