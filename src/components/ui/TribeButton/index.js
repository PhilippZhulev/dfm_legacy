import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TribeIcon from '../../svg/TribeIcon';

function TribeButtons({ classes, color, children, label, selected, onClick }) {
  const styles = useStyles({ classes });

  const [hover, setHover] = useState(false);

  return (
    <div
      data-testid='root'
      className={styles.root}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      onClick={() => onClick()}>
      <div
        data-testid='icon'
        className={`${styles.icon} ${
          hover || selected ? styles.icon_hovered : ''
        }`}
        style={{ fill: color }}>
        {children || <TribeIcon />}
      </div>
      <div
        data-testid='label'
        className={`${styles.label} ${
          hover || selected ? styles.label_hovered : ''
        }`}>
        {label}
      </div>
    </div>
  );
}

TribeButtons.propTypes = {
  color: PropTypes.string,
  classes: PropTypes.object,
  selected: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

TribeButtons.defaultProps = {
  classes: {},
  color: '#DCE775',
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    width: 'max-content',
    marginBottom: 30,
    display: 'flex',
    '&:hover': { cursor: 'pointer' },
  },
  icon: {
    width: 49,
    height: 49,
    borderRadius: 24.5,
    backgroundColor: theme.colorsTheme.background,
    display: 'flex',
    margin: 'auto 0',
    '& svg': {
      fill: theme.colorsTheme.disabled,
      margin: 'auto',
      display: 'block',
      transition: 'all 300ms ease-in-out',
    },
  },
  icon_hovered: { '& svg': { fill: 'inherit!important' } },
  label: {
    maxWidth: 'calc(100% - 49px)',
    padding: '7.5px 18px',
    paddingRight: 0,
    lineHeight: '24.5px',
    overflow: 'hidden',
    wordBreak: 'break-word',
    color: theme.colorsTheme.disabled,
    transition: 'all 300ms ease-in-out',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  label_hovered: { color: theme.colorsTheme.text },
}));

export default TribeButtons;
