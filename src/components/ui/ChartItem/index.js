import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const ChartItem = (props) => {
  const { classes, label, children } = props;
  const styles = useStyles({ classes });
  return (
    <div className={styles.root}>
      <div>{label}</div>
      {children}
    </div>
  );
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      color: theme.colorsTheme.text,
      flexGrow: 1,
    },
  }),
  {
    index: 1,
    name: 'ChartItem',
  }
);

export default ChartItem;
