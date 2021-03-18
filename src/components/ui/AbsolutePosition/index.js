import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function AbsolutePosition({
  children,
  top,
  bottom,
  left,
  right,
  zIndex,
  classes,
  style,
  ...other
}) {
  // Стили
  const styles = makeStyles((theme) => ({
    root: {
      position: 'absolute',
      top,
      bottom,
      left,
      right,
      zIndex,
      ...style,
    },
  }))({ classes });

  // Представление
  return (
    <div className={styles.root} {...other}>
      {children}
    </div>
  );
}

// Типы props
AbsolutePosition.propTypes = {
  classes: PropTypes.object,
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  zIndex: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

export default AbsolutePosition;
