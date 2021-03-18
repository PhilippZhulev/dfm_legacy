import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * skeleton
 * @component
 * @public
 */
function SkeletonHeaderCenter({ classes, children, resource }) {
  const styles = useStyles({ classes });
  const [HeaderCenterLoading, setHeaderCenterLoading] = useState(true);

  useEffect(() => {
    if (resource) {
      setHeaderCenterLoading(false);
    }
  }, [resource]);

  return (
    <div className={styles.HeaderCenter}>
      {!HeaderCenterLoading && <div className={styles.inner}>{children}</div>}
    </div>
  );
}

SkeletonHeaderCenter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  classes: PropTypes.object,
  resource: PropTypes.bool,
};

SkeletonHeaderCenter.defaultProps = {};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    HeaderCenter: {
      height: 'auto',
      width: '100%',
      background: theme.colorsTheme.headerCenterBackground,
      zIndex: 10,
      position: 'relative',
      top: 0,
    },
    inner: {
      height: '100%',
      display: 'flex',
    },
  }),
  {
    name: 'HeaderCenter',
  }
);

export default SkeletonHeaderCenter;
