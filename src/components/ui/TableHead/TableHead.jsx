/* eslint-disable */
import React from 'react';
import { TableElement } from '../Table/Context';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

/** Шапка таблицы */
export const TableHead = React.forwardRef((props, ref) => {
  const { className, children, stickyHeader } = props;

  // TODO: возможно стоит удалить строчку?
  const table = React.useMemo(() => ({ stickyHeader }), [stickyHeader]);

  /** Инициализация основных стилей */
  const classes = useStyles(props);

  return (
    <TableElement.Provider value={{ element: 'head', stickyHeader }}>
      <thead data-testid='thead' className={classNames(classes.root)}>
        {children}
      </thead>
    </TableElement.Provider>
  );
});

export const useStyles = makeStyles((theme) => ({
  root: {
    color: '#A7C1DA',
    textTransform: 'uppercase',
    border: '1px solid transparent',

    '& th': {
      fontWeight: 600,
    },
  },
}));
