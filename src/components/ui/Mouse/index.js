import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MouseIcon from '../../svg/Mouse';
import Modal from '../Modal';
import MouseAnimation from '../../svg/MouseAnimation';

function Mouse({ classNames, showModal }) {
  const classes = useStyles({ classNames });

  const [mouseModalShow, setMouseModalShow] = useState(false);

  const cls = showModal ? classes.mouseIcon : classes.mouseIconDisabled;

  return (
    <>
      <div className={cls} onClick={() => setMouseModalShow(true)}>
        <MouseIcon />
      </div>
      {showModal ? (
        <div onKeyDown={() => setMouseModalShow(false)}>
          <Modal
            classes={{
              root: classes.dialogRoot,
              paper: classes.dialogPaper,
              content: classes.dialogContent,
            }}
            open={mouseModalShow}
            close={() => setMouseModalShow(false)}
            text={mouseModalShow ? <MouseAnimation /> : null}></Modal>
        </div>
      ) : null}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  ...theme.modal,
  mouseIcon: {
    cursor: 'pointer',
    opacity: 0.25,
  },
  mouseIconDisabled: {
    cursor: 'default',
  },
  dialogRoot: {
    padding: 0,
  },
  dialogPaper: {
    maxWidth: 600,
    maxHeight: 337,
    padding: 0,
    opacity: 0.85,
    overflow: 'hidden',
    boxShadow: 'none',
    border: '1px solid #6B7A8F',
  },
  dialogContent: {
    padding: 0,
    margin: '-1%',
  },
}));

Mouse.propTypes = {
  classNames: PropTypes.object,
  showModal: PropTypes.bool,
};

Mouse.defaultProps = {
  showModal: true,
};

export default Mouse;
