import React, { useState, useEffect } from 'react';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'max-content',
  },
  popper: {
    zIndex: 2,
    '&[x-placement*="bottom"] .arrow': {
      top: 0,
      left: 0,
      marginTop: '-1.4em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1.5em 1.5em 1.5em',
        borderColor: 'transparent transparent #2F3B52 transparent',
      },
    },
    '&[x-placement*="top"] ,arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-1.4em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1.5em 1.5em 0 1.5em',
        borderColor: '#2F3B52 transparent transparent transparent',
      },
    },
    '&[x-placement*="right"] .arrow': {
      left: 0,
      marginLeft: '-1.4em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1.5em 1.5em 1.5em 0',
        borderColor: 'transparent #2F3B52 transparent transparent',
      },
    },
    '&[x-placement*="left"] .arrow': {
      right: 0,
      marginRight: '-1.4em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1.5em 0 1.5em 1.5em',
        borderColor: 'transparent transparent transparent #2F3B52',
      },
    },

    '& .popper-content': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2F3B52',
      color: '#fff',
      minHeight: '3em',
      minWidth: '3em',
      boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.5)',
      borderRadius: '8px',
      padding: '10px 20px',
      boxSizing: 'border-box',
    },

    '& .arrow': {
      position: 'absolute',
      fontSize: '7px',
      width: '6em',
      height: '6em',

      '&::before': {
        content: "''",
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
      },
    },
  },
}));

export const StyledPopper = (props) => {
  const [open, setOpen] = useState(false);
  const [arrow, setArrow] = useState(null);
  const [anchorEl, set] = useState(null);

  const classes = useStyles(props);

  useEffect(() => {
    document.addEventListener('click', close);

    return () => {
      document.removeEventListener('click', close);
    };
  }, [props]);

  useEffect(() => {
    if (props.open !== open) {
      setOpen(props.open);
    }
  }, [props.open]);

  const close = () => {
    setOpen(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const openOrClose = (event) => {
    if (props.disabled) {
      return;
    }

    stopPropagation(event);
    setOpen(!open);
    props.onOpen(!open);
  };

  return (
    <>
      <div
        data-testid='root'
        ref={set}
        onClick={(event) => openOrClose(event)}
        className={classes.root}>
        {props.children}
      </div>
      <Popper
        className={classes.popper}
        anchorEl={anchorEl}
        open={open}
        disablePortal={props.disablePortal}
        placement={props.placement}
        modifiers={{
          arrow: {
            enabled: true,
            element: arrow,
          },
          preventOverflow: {
            enabled: false,
            rootBoundary: 'document',
          },
          hide: {
            enabled: false,
          },
        }}>
        <span className='arrow' ref={setArrow} />
        <div
          onClick={(event) => stopPropagation(event)}
          className={'popper-content'}>
          {props.content}
        </div>
      </Popper>
    </>
  );
};

StyledPopper.defaultProps = {
  open: false,
  onOpen: () => {},
};
