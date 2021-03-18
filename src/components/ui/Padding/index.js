// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function Padding({ children, top, bottom, left, right, inline, data }) {
  // Стили
  const classes = makeStyles((theme) =>
    ({
      root: {
        display: inline ? 'inline-flex' : 'block',
        padding:
        data ||
        `${top}${typeof top === 'number' ? 'px' : ''} ${right}${
          typeof right === 'number' ? 'px' : ''
        } ${bottom}${typeof bottom === 'number' ? 'px' : ''} ${left}${
          typeof left === 'number' ? 'px' : ''
        }`,
      },
    }))();

  // Представление
  return <div className={classes.root}>{children}</div>;
}

// Типы props
Padding.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.string,
  inline: PropTypes.bool,
};

Padding.defaultProps = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  inline: false,
  data: null,
};

export default Padding;
