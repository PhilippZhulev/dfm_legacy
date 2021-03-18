import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import { Margin, FlexGrid, FlexGridItem, AbsolutePosition } from 'components';
import colors from '../../theme/colors';

/**
 * skeleton
 * @component
 * @public
 */
function SkeletonModelFrame({ classes, load, children }) {
  // Получить classes
  const styles = useStyles({ classes });

  return load ? (
    <>
      <div className={styles.root}>
        <AbsolutePosition left={32}>
          <SkeletonTheme
            color={colors.colorsTheme.layer}
            highlightColor={colors.colorsTheme.input}>
            <FlexGrid style={{ marginTop: 30 }}>
              <Margin key={1} data={'22px 38px'}>
                <Skeleton height={28} width={163} />
              </Margin>
              <Margin key={2} data={'22px 38px'}>
                <Skeleton height={28} width={208} />
              </Margin>
              <Margin key={3} data={'22px 38px'}>
                <Skeleton height={28} width={82} />
              </Margin>
            </FlexGrid>

            <AbsolutePosition right={'60px'} top='125px' zIndex={10}>
              <Skeleton height={40} width={150} />
            </AbsolutePosition>
            <Margin top={50}>
              <Skeleton height={26} width={300} />
            </Margin>
            <FlexGrid style={{ marginTop: 45 }}>
              {Array.from(Array(11)).map((item, i) => (
                <Margin key={i} right={24} bottom={24}>
                  <Skeleton height={153} width={300} />
                </Margin>
              ))}
            </FlexGrid>
          </SkeletonTheme>
        </AbsolutePosition>
      </div>
    </>
  ) : (
    children
  );
}

SkeletonModelFrame.propTypes = {
  load: PropTypes.bool,
  classes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

SkeletonModelFrame.defaultProps = {
  load: false,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: 'calc(100% - 304px)',
      height: 'calc(100% - 85px)',
      padding: '0 32px 0 0',
      boxSizing: 'border-box',
      margin: '0 0 0 auto',
      bottom: 0,
      left: 0,
      right: 0,
      position: 'absolute',
    },
  }),
  {
    name: 'SkeletonModelFrame',
  }
);

export default SkeletonModelFrame;
