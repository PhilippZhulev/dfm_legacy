/* eslint-disable */
import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

export const Table = React.forwardRef((props, ref) => {
  const { className, children } = props;

  /** Инициализация основных стилей */
  const classes = useStyles(props);

  return (
    <table
      data-testid='root'
      ref={ref}
      className={classNames(classes.root, className)}>
      {children}
    </table>
  );
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    fontSize: 12,
    tableLayout: 'fixed',
  },
}));
