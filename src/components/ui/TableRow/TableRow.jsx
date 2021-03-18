/* eslint-disable */
import React, { useContext } from 'react';
import { TableElement } from '../Table/Context';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

/** Строка таблицы */
export const TableRow = React.forwardRef((props, ref) => {
  const { className, children } = props;

  const tableElement = useContext(TableElement);
  /** Строка в thead */
  const isHeadCell = tableElement.element === 'head';

  /** Инициализация основных стилей */
  const classes = useStyles(props);

  return (
    <tr
      data-testid='tr'
      className={classNames(classes.root, className, {
        [classes.head]: isHeadCell,
      })}>
      {children}
    </tr>
  );
});

/** Стили */
export const useStyles = makeStyles((theme) => ({
  root: {
    color: 'inherit',
    verticalAlign: 'middle',
    outline: 0,
  },
  head: {
    backgroundColor: '#425270',
    borderLeft: '1px solid #425270',
    borderRight: '1px solid #425270',
  },
  selected: {},
  hover: {},
}));
