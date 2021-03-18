import React, { useState, useRef } from 'react';
import Chrome from 'react-color';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

export const ColorPicker = (props) => {
  const { color, onChange, disabled } = props;
  const [display, setDisplay] = useState(false);
  const ref = useRef(null);
  const handleChange = (curColor) => {
    if (onChange) {
      onChange(curColor);
    }
  };

  const handleClose = () => {
    setDisplay(false);
  };

  const classes = useStyles(props);

  return (
    <>
      <div
        ref={ref}
        className={classes.swatch}
        onClick={() => (disabled ? null : setDisplay(!display))}>
        <div className={classes.color} />
      </div>
      <Popover
        open={display}
        anchorEl={ref.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <Chrome
          color={color}
          disableAlpha={true}
          onChange={(evColor) => handleChange(evColor)}
        />
      </Popover>
    </>
  );
};

const useStyles = makeStyles((theme) => {
  const { colorsTheme } = theme;

  return {
    swatch: {
      padding: '5px',
      display: 'inline-block',
      cursor: 'pointer',
      width: 'calc(100%)',
    },
    color: {
      height: '16px',
      background: ({ color }) => color,
    },
    popover: {
      position: 'absolute',
      zIndex: '2',
    },
    cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
  };
});
