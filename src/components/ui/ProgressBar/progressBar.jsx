import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export const ProgressBar = React.memo((props) => {
  const { value, showBubble } = props;
  const classes = useStyles(props);

  return (
    <div data-testid='root' className={classes.root}>
      <div
        data-testid='color'
        className={classNames(classes.element, classes.color)}>
        {showBubble && (
          <div
            data-testid='valueBubble'
            className={classNames(classes.valueBubble, classes.color, {
              [classes.turnLeft]: value > 75,
            })}>
            {Math.round(value)}%
          </div>
        )}
      </div>
    </div>
  );
});

/** Основные стили */
const useStyles = makeStyles((theme) => {
  const { colorsTheme } = theme;

  return {
    root: {
      background: colorsTheme.nodeBackground,
      borderRadius: 6,
      width: '100%',
      padding: '2px 4px',
    },

    element: ({ value }) => ({
      height: 4,
      position: 'relative',
      maxWidth: '100%',
      width: `${value}%`,
      borderRadius: 2,
    }),

    color: {
      backgroundColor: colorsTheme.primaryProgress,
    },

    valueBubble: {
      width: 67,
      height: 26,
      fontSize: 14,
      lineHeight: '26px',
      fontStyle: 'normal',
      fontWeight: 'normal',
      alignItems: 'center',
      textAlign: 'center',
      letterSpacing: 0.2,
      position: 'absolute',
      bottom: 15,
      color: colorsTheme.nodeColor,
      left: '100%',
      borderRadius: '13px 13px 13px 0',
      boxShadow: '0px 19px 28px rgba(0, 0, 0, 0.27)',
    },

    turnLeft: {
      borderRadius: '13px 13px 0 13px',
      transform: 'translateX(-100%)',
    },
  };
});

ProgressBar.displayName = 'ProgressBar';

ProgressBar.defaultProps = {
  value: 50,
  showBubble: true,
};
