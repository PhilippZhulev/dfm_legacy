import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
/**
Инициализация стилей для сторибук
 */
const AppTheme = ({ children }) => {
  useStyles();

  return <div>{children}</div>;
};

const useStyles = makeStyles(
  (theme) => ({
    '@global': {
      ...theme.global,
      ...theme.OpenSans,
      ...theme.initOpenSans,
    },
  }),
  { name: 'AppTheme' }
);

export default AppTheme;
