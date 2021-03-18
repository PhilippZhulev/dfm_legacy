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
function SkeletonUser({ classes, load, children }) {
  // Получить classes
  const styles = useStyles({ classes });

  return load ? (
    <>
      <SkeletonTheme
        color={colors.colorsTheme.input}
        highlightColor={colors.colorsTheme.layer}>
        <div className={styles.root}>
          <Margin right={70} top={15}>
            <FlexGrid>
              <FlexGridItem width={65}>
                <Skeleton circle height={44} width={44} />
              </FlexGridItem>
              <FlexGridItem width={calc}>
                <Margin top={4}>
                  <Skeleton height={16} width='120px' />
                </Margin>
                <Margin top={5}>
                  <Skeleton height={12} width='80px' />
                </Margin>
              </FlexGridItem>
            </FlexGrid>
          </Margin>
        </div>
      </SkeletonTheme>
    </>
  ) : (
    children
  );
}

SkeletonUser.propTypes = {
  load: PropTypes.bool,
  classes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

SkeletonUser.defaultProps = {
  load: false,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: theme.helper.inline,
      color: theme.colorsTheme.text,
      fontSize: 14,
      lineHeight: '16px',
      fontWeight: 300,
    },
  }),
  {
    name: 'SkeletonUser',
  }
);

export default SkeletonUser;
