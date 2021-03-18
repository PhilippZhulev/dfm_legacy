import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { InfoPopUp } from 'components';
import { Transition } from 'react-transition-group';

/**
 * Кнопка
 * @component
 * @public
 */
function ModelTileProgress({ stageDict, classes, stage }) {
  // Получить classes
  const styles = useStyles({ classes });

  const [anim, setAnim] = useState(false);

  useEffect(() => {
    setAnim(true);
  }, []);

  return (
    <div data-testid='root' className={styles.progressInfo}>
      {stageDict.map((item, ind) => (
        <Transition key={ind} in={anim} timeout={ind * 300}>
          {(state) => (
            <div
              className={`${styles.progressPoint} ${
                ind + 1 <= stage && state === 'entered'
                  ? styles.progressPoint_completed
                  : ''
              }`}>
              <InfoPopUp
                right={false}
                classes={{ root: styles.infoPopupRoot }}
                content={
                  <div className={styles.progressPoint_info}>{item.label}</div>
                }
              />
            </div>
          )}
        </Transition>
      ))}
    </div>
  );
}

ModelTileProgress.propTypes = {
  stageDict: PropTypes.array,
  classes: PropTypes.object,
  stage: PropTypes.number,
};

ModelTileProgress.defaultProps = {
  stageDict: [],
  classes: {},
  stage: 0,
};

// Приватные стили
const useStyles = makeStyles((theme) => ({
  progressInfo: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column-reverse',
    width: 8,
    height: 153,
    top: -22,
    right: -30,
    zIndex: 2,
  },
  progressPoint_info: {
    fontSize: 12,
    color: theme.colorsTheme.text,
  },
  progressPoint: {
    borderRadius: 2,
    position: 'relative',
    backgroundColor: theme.colorsTheme.progressPoint,
    transition: 'all 300ms ease-in-out',
    marginBottom: 2.54,
    width: '100%',
    height: 'calc((100% - 12.6px) / 6)',
    '&:first-child': { marginBottom: 0 },
    '& > div': {
      width: '100%',
      height: '100%',
    },
  },
  infoPopupRoot: { width: 'fit-content' },
  progressPoint_completed: {
    backgroundColor: theme.colorsTheme.progressPointCompleted,
    boxShadow: theme.colorsTheme.progressPointCompletedShadow,
  },
}));

export default ModelTileProgress;
