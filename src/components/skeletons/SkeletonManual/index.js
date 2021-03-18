import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import { Margin, FlexGrid, FlexGridItem } from 'components';
import colors from '../../theme/colors';

const calc = 'calc(100% - 65px)';
/**
 * skeleton
 * @component
 * @public
 */
function SkeletonManual({ classes, load, children }) {
  // Получить classes
  const styles = useStyles({ classes });

  return load ? (
    <>
      <SkeletonTheme
        color={colors.colorsTheme.input}
        highlightColor={colors.colorsTheme.layer}>
        <div className={styles.icon}>
          <Skeleton height={20} width={16} />
        </div>
      </SkeletonTheme>
    </>
  ) : (
    children
  );
}

SkeletonManual.propTypes = {
  load: PropTypes.bool,
  classes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

SkeletonManual.defaultProps = {
  load: false,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    icon: {
      display: 'inline-flex',
      height: '100%',
      '& > *': {
        margin: 'auto 0',
      },
    },
  }),
  {
    name: 'SkeletonUser',
  }
);

export default SkeletonManual;
