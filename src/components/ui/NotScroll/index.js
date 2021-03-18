// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function NotScroll({ children, classes, type, margin }) {
  // Стили
  const styles = makeStyles(() => ({
    root: {
      position: 'relative',
      margin,
      overflow: type === 'x' ? 'auto hidden' : 'hidden auto',
    },
  }))({ classes });

  // Представление
  return (
    <div data-testid='root' className={styles.root}>
      {children}
    </div>
  );
}

// Типы props
NotScroll.propTypes = {
  classes: PropTypes.object,
  type: PropTypes.string,
  margin: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

NotScroll.defaultProps = { type: 'x', margin: '0px' };

export default NotScroll;
