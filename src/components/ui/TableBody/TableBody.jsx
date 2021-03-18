/* eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableElement } from '../Table/Context';

export const TableBody = React.forwardRef((props, ref) => {
  const { className, children } = props;

  /** Инициализация основных стилей */
  const classes = useStyles(props);

  return (
    <TableElement.Provider value={{ element: 'body' }}>
      <tbody ref={ref} className={classes.root}>
        {children}
      </tbody>
    </TableElement.Provider>
  );
});

export const useStyles = makeStyles((theme) => ({
  root: {
    color: '#fff',
  },
}));

// TODO: Проблема тестирования. Вложенный компонент
