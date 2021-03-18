import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Slide } from '@material-ui/core';
import { Icon } from 'components';
import classNames from 'classnames';

export const Maximize = React.forwardRef((props, ref) => {
  const {
    state,
    locked,
    children,
    container,
    clickBackground,
    onClose,
    stateIn,
    direction = 'left',
    hideCloseIcon = false,
  } = props;

  const classes = useStyles(props);

  const handleClick = (event) => {
    if (clickBackground) {
      clickBackground(event);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      style={{ display: stateIn ? 'block' : 'none' }}
      ref={ref}
      className={classNames(classes.root, locked ? classes.edited : null)}>
      {stateIn && (
        <div className={classes.background} onClick={handleClick}></div>
      )}
      <Slide in={stateIn} direction={direction}>
        <div className={classes.container}>
          {!hideCloseIcon && (
            <Icon
              size={24}
              className={classes.closeIcon}
              onClick={handleClose}
            />
          )}
          {children}
        </div>
      </Slide>
    </div>,
    container
  );
});

Maximize.displayName = 'Maximize';

const useStyles = makeStyles((theme) => {
  const { colorsTheme } = theme;

  return {
    root: {
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: 9,
      left: 0,
      position: 'absolute',
      transition: 'top .4s linear',
    },

    background: {
      background: colorsTheme.bgGradient,
      height: '100%',
      width: '100%',
      position: 'absolute',
    },

    container: {
      margin: 16,
      marginTop: 155,
      marginLeft: 396,
      backgroundColor: colorsTheme.background,
      padding: 40,
      paddingRight: 55,
      borderRadius: 8,
      position: 'relative',
      height: 'calc(100% - 171px)',
    },

    edited: {
      top: 50,
    },

    closeIcon: {
      position: 'absolute',
      top: 12,
      right: 12,
      cursor: 'pointer',
      zIndex: 100,
      transition: 'color .2s ease-in-out',
      color: colorsTheme.grey,

      '&:hover': {
        color: colorsTheme.nodeColor,
      },
    },
  };
});
