import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import OpenedLock from '../../svg/OpenedLock';
import Lock from '../../svg/Lock';

/**
 * Кнопка
 * @component
 * @public
 */
function Locked({ locked, classes }) {
  // Получить classes
  const styles = useStyles({ classes });
  return (
    <>
      {typeof locked !== 'undefined' && locked !== null ? (
        <div>
          <div className={`${locked ? styles.locked : styles.unlocked}`}>
            {locked ? <Lock /> : <OpenedLock />}
          </div>
        </div>
      ) : null}
    </>
  );
}

Locked.propTypes = {
  classes: PropTypes.object,
  locked: PropTypes.bool,
};

Locked.defaultProps = {
  locked: false,
  classes: {},
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    locked: { '& path': { fill: theme.colorsTheme.red } },
    unlocked: { '& path': { fill: theme.colorsTheme.blue } },
    value: {
      color: theme.colorsTheme.disabled,
      fontSize: 14,
      marginLeft: 8,
    },
  }),
  {
    name: 'Locked',
  }
);

export default Locked;
