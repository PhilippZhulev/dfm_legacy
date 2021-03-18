import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Margin } from 'components';

/**
 * Кнопка
 * @component
 * @public
 */
function Preload({ classes, state, background }) {
  /** ANCHOR: Получить classes */
  const styles = useStyles({ classes });

  return state ? (
    <div
      data-testid='root'
      className={`${styles.root} ${!state.bg ? styles.rootModBackGround : ''}`}>
      <div data-testid='wrapper' className={styles.wrapper}>
        <Margin data={'22px 0 22px 22px'}>
          <CircularProgress disableShrink color='primary' />
        </Margin>
        <Margin data={'auto 0 auto 25px'}>
          <div data-testid='text' className={styles.text}>
            {state.message}
          </div>
        </Margin>
      </div>
    </div>
  ) : null;
}

Preload.propTypes = {
  classes: PropTypes.object,
  state: PropTypes.object,
  background: PropTypes.bool,
};

Preload.defaultProps = {
  classes: {},
  background: false,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      overflow: 'hidden',
      zIndex: 200,
      background: theme.colorsTheme.modalBackground(0.3),
    },
    rootModBackGround: {
      background: 'none',
    },
    wrapper: {
      minWidth: 250,
      height: 80,
      background: theme.colorsTheme.layer,
      position: 'absolute',
      bottom: 30,
      display: 'flex',
      flexWrap: 'nowrap',
      borderRadius: 8,
      alignContent: 'center',
      right: 30,
      overflow: 'hidden',
      boxShadow: `0px 11px 15px -7px rgba(0,0,0,0.2),
        0px 24px 38px 3px rgba(0,0,0,0.14),
        0px 9px 46px 8px rgba(0,0,0,0.12);`,
    },
    text: {
      color: theme.colorsTheme.text,
      fontSize: 12,
    },
  }),
  {
    name: 'Button',
  }
);

export default Preload;
