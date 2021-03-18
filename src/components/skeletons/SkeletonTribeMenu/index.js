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
function SkeletonTribeMenu({ classes, load, children }) {
  // Получить classes
  const styles = useStyles({ classes });

  return load ? (
    <>
      <div className={styles.root}>
        <SkeletonTheme
          color={colors.colorsTheme.layer}
          highlightColor={colors.colorsTheme.input}>
          <Margin top={0}>
            <Skeleton circle={true} height={34} />
          </Margin>
          <Margin top={25}>
            <FlexGrid style={{ marginBottom: 25, marginLeft: -5 }}>
              <FlexGridItem width={65}>
                <Skeleton circle={true} height={50} width={50} />
              </FlexGridItem>
              <FlexGridItem width={calc}>
                <Margin top={15}>
                  <Skeleton height={18} width='80%' />
                </Margin>
              </FlexGridItem>
            </FlexGrid>

            <FlexGrid style={{ marginBottom: 25, marginLeft: -5 }}>
              <FlexGridItem width={65}>
                <Skeleton circle={true} height={50} width={50} />
              </FlexGridItem>
              <FlexGridItem width={calc}>
                <Margin top={15}>
                  <Skeleton height={18} width='70%' />
                </Margin>
              </FlexGridItem>
            </FlexGrid>

            <Margin top={30} bottom={25} left={-5}>
              <Skeleton height={18} width='30%' />
            </Margin>

            <FlexGrid style={{ marginBottom: 25, marginLeft: -5 }}>
              <FlexGridItem width={65}>
                <Skeleton circle={true} height={50} width={50} />
              </FlexGridItem>
              <FlexGridItem width={calc}>
                <Margin top={15}>
                  <Skeleton height={18} width='70%' />
                </Margin>
              </FlexGridItem>
            </FlexGrid>

            <Margin top={30} bottom={25} left={-5}>
              <Skeleton height={18} width='25%' />
            </Margin>

            <FlexGrid style={{ marginBottom: 25, marginLeft: -5 }}>
              <FlexGridItem width={65}>
                <Skeleton circle={true} height={50} width={50} />
              </FlexGridItem>
              <FlexGridItem width={calc}>
                <Margin top={15}>
                  <Skeleton height={18} width='80%' />
                </Margin>
              </FlexGridItem>
            </FlexGrid>

            <FlexGrid style={{ marginBottom: 25, marginLeft: -5 }}>
              <FlexGridItem width={65}>
                <Skeleton circle={true} height={50} width={50} />
              </FlexGridItem>
              <FlexGridItem width={calc}>
                <Margin top={15}>
                  <Skeleton height={18} width='70%' />
                </Margin>
              </FlexGridItem>
            </FlexGrid>

            <FlexGrid style={{ marginBottom: 25, marginLeft: -5 }}>
              <FlexGridItem width={65}>
                <Skeleton circle={true} height={50} width={50} />
              </FlexGridItem>
              <FlexGridItem width={calc}>
                <Margin top={15}>
                  <Skeleton height={18} width='70%' />
                </Margin>
              </FlexGridItem>
            </FlexGrid>

            <Margin top={30} bottom={25} left={-5}>
              <Skeleton height={18} width='25%' />
            </Margin>

            <FlexGrid style={{ marginBottom: 25, marginLeft: -5 }}>
              <FlexGridItem width={65}>
                <Skeleton circle={true} height={50} width={50} />
              </FlexGridItem>
              <FlexGridItem width={calc}>
                <Margin top={15}>
                  <Skeleton height={18} width='80%' />
                </Margin>
              </FlexGridItem>
            </FlexGrid>

            <FlexGrid style={{ marginBottom: 25, marginLeft: -5 }}>
              <FlexGridItem width={65}>
                <Skeleton circle={true} height={50} width={50} />
              </FlexGridItem>
              <FlexGridItem width={calc}>
                <Margin top={15}>
                  <Skeleton height={18} width='80%' />
                </Margin>
              </FlexGridItem>
            </FlexGrid>
          </Margin>
        </SkeletonTheme>
        ;
      </div>
    </>
  ) : (
    children
  );
}

SkeletonTribeMenu.propTypes = {
  load: PropTypes.bool,
  classes: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

SkeletonTribeMenu.defaultProps = {
  load: false,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: 304,
      minWidth: 304,
      position: 'absolute',
      padding: '52px 32px',
      paddingBottom: 0,
      height: 'calc(100% - 85px)',
      top: 80,
      backgroundColor: theme.colorsTheme.tribeMenuBackground,
      zIndex: 2,
      boxSizing: 'border-box',
    },
  }),
  {
    name: 'SkeletonTribeMenu',
  }
);

export default SkeletonTribeMenu;
