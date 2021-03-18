/* eslint-disable */
import React, { useContext } from 'react';
import { TableElement } from '../Table/Context';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

/** ячейка колонки */
export const TableCell = React.forwardRef((props, ref) => {
  const { className, children, checkbox } = props;
  const tableElement = useContext(TableElement);

  /** true  если в thead */
  const isHeadCell = tableElement.element === 'head';

  /** th или td  */
  const Component = isHeadCell ? 'th' : 'td';

  /** Инициализация основных стилей */
  const classes = useStyles(props);

  return (
    <Component
      data-testid='cell'
      className={classNames(classes.root, {
        [classes.head]: isHeadCell,
        [classes.checkbox]: checkbox,
        [classes.stickyHeader]: tableElement.stickyHeader
      })}>
      {children}
    </Component>
  );
});

export const useStyles = makeStyles((theme) => ({
  root: {
    verticalAlign: 'inherit',
    textAlign: 'left',
    padding: '4px 16px',

    border: '0.5px solid #3b4c5d',
  },
  head: {
    border: '#2F3B52',
    lineHeight: '22px',
    '&:not(:first-of-type)': {
      borderLeft: '1px solid #2F3B52',
      padding: '10px 16px',
    },
  },

  checkbox: {
    width: 48,
    padding: 0,
    textAlign: 'center',
  },

  stickyHeader: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: '#425270',
  },
  body: {},
}));
