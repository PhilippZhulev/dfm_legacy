import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import colors from '../../theme/colors';
import AppBarCol from '../../ui/AppBarCol';

/**
 * skeleton
 * @component
 * @public
 */
function SkeletonHeaderBottom({ classes, children, resource }) {
  // Получить classes
  const styles = useStyles({ classes });
  const [headerBottomLoading, setHeaderBottomLoading] = useState(true);

  useEffect(() => {
    if (resource) {
      setHeaderBottomLoading(false);
    }
  }, [resource]);

  return headerBottomLoading ? (
    <>
      <div className={styles.headerBottom}>
        <SkeletonTheme
          color={colors.colorsTheme.input}
          highlightColor={colors.colorsTheme.layer}>
          <div className={styles.root}>
            <AppBarCol>
              <Skeleton width={239} height={22} />
            </AppBarCol>
            <AppBarCol>
              <Skeleton width={204} height={22} />
            </AppBarCol>
          </div>
        </SkeletonTheme>
      </div>
    </>
  ) : (
    <div className={styles.headerBottom}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}

SkeletonHeaderBottom.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  classes: PropTypes.object,
  resource: PropTypes.bool,
};

SkeletonHeaderBottom.defaultProps = {};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    headerBottom: {
      height: 50,
      width: '100%',
      background: theme.colorsTheme.layer,
      borderTop: `2px solid ${theme.colorsTheme.input}`,
      zIndex: 10,
      position: 'relative',
      top: 0,
    },
    inner: {
      padding: '0 25px',
      height: '100%',
      display: 'flex',
    },
  }),
  {
    name: 'HeaderBottom',
  }
);

export default SkeletonHeaderBottom;
