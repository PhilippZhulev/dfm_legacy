import React, { useMemo } from 'react';
import classNames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import { TableRow, TableCell } from 'components';
import { useStyles } from './style';
import { typesList } from '../../../../static/period';

export const Period = (props) => {
  const { period, deleteData, onCheckbox, disabled } = props;

  /** Инициализация стилей */
  const classes = useStyles(props);

  /** Типы периодов */
  const currentType = useMemo(
    () => typesList.find((item) => item.value === period.type),
    []
  );

  return (
    <TableRow
      className={classNames({
        [classes.active]: !disabled,
        [classes.delete]: deleteData.has(period.id),
      })}>
      <TableCell checkbox>
        <Checkbox
          onChange={(event) => onCheckbox(event, period.id)}
          checked={deleteData.has(period.id)}
          color='primary'
        />
      </TableCell>
      <TableCell></TableCell>
      <TableCell>{currentType.label}</TableCell>
      <TableCell>{period.label}</TableCell>
      <TableCell>{period.year}</TableCell>
      <TableCell>{period.quarter}</TableCell>
      <TableCell>{period.month}</TableCell>
    </TableRow>
  );
};
