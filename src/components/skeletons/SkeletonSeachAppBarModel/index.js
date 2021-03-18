import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import { Margin } from 'components';
import colors from '../../theme/colors';

/**
 * skeleton
 * @component
 * @public
 */
function SkeletonSeachAppBarModel({ classes, load, children }) {
  // Получить classes
  const styles = useStyles({ classes });

  return load ? (
    <>
      <div className={styles.root}>
        <SkeletonTheme
          color={colors.colorsTheme.input}
          highlightColor={colors.colorsTheme.layer}>
          <Margin top={25} left={35}>
            <Skeleton height={34} width={'100%'} />
          </Margin>
        </SkeletonTheme>
      </div>
    </>
  ) : (
    children
  );
}

SkeletonSeachAppBarModel.propTypes = {
  load: PropTypes.bool,
  classes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

SkeletonSeachAppBarModel.defaultProps = {
  load: false,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      maxWidth: '583px',
    },
  }),
  {
    name: 'SkeletonSeachAppBarModel',
  }
);

export default SkeletonSeachAppBarModel;
