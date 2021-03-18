// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function IconColor({ children, color, type, classes, styles }) {
  // Стили
  const style = makeStyles(() =>
    ({
      root: {
        ...styles,
        '& svg path': { [type]: color },
        '& svg circle': { [type]: color },
      },
    }))({ classes });

  // Представление
  return <div className={style.root}>{children}</div>;
}

// Типы props
IconColor.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string,
  type: PropTypes.string,
  styles: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

IconColor.defaultProps = {
  color: '#fff',
  type: 'fill',
  styles: {},
};

export default IconColor;
