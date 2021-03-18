
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

function FlexGrid({ classes, children, style, className }) {
  // Стили
  const styles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      ...style,
    },
  }))({ classes });

  // Представление
  return <div className={classNames(styles.root, className)}>{children}</div>;
}

// Типы props
FlexGrid.propTypes = {
  classes: PropTypes.object,
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  className: PropTypes.string,
};

export default FlexGrid;
