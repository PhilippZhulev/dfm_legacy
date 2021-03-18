
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

function FlexGridItem({
  classes,
  children,
  width,
  height,
  padding,
  margin,
  separator,
  className,
}) {
  // Стили
  const styles = makeStyles((theme) => ({
    root: {
      padding,
      width,
      height,
      margin,
      borderRight: separator ? '1px solid rgba(101, 125, 149, 0.4)' : 0,
    },
  }))({ classes });

  // Представление
  return <div className={classNames(styles.root, className)}>{children}</div>;
}

// Типы props
FlexGridItem.propTypes = {
  classes: PropTypes.object,
  padding: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  keight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // TODO: это следует удалить?
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  separator: PropTypes.bool,
  className: PropTypes.string,
};

export default FlexGridItem;
