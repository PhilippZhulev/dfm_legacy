import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Title, Margin, Button, AbsolutePosition } from 'components';
import DoneAll from '@material-ui/icons/DoneAll';

/**
 * Прогресс сохранение
 * @component
 * @public
 */
function SaveStatus({ classes, status, message, err, state, dispatchRecalc }) {
  // Получить classes
  const styles = useStyles({ classes });

  useEffect(() => {
    if (status >= 100) {
      handleClose();
    }
  }, [status]);

  /**
   * ANCHOR: Закрытие окна сохранения (recalc/close)
   * @param  {object} event
   * @public
   */
  const handleClose = () => {
    setTimeout(() => {
      document.dispatchEvent(
        new CustomEvent('app.save.status', {
          detail: {
            state: false,
            message: '',
            status: 0,
            err: null,
          },
        })
      );

      window.savePropgess = 0;

      if (!err) {
        dispatchRecalc({});
      }
    }, 1200);
  };

  return (
    state && (
      <div className={styles.root}>
        <div className={styles.window}>
          <Margin bottom={30}>
            <Title text='Сохранение модели' />
          </Margin>
          <div className={styles.status}>
            <div
              style={{
                width: `${status}%`,
                background: status >= 100 ? '#05C985' : undefined,
              }}
              className={classNames(styles.statusInner, {
                [styles.errorStatusInner]: !!err,
              })}>
              {status >= 100 && (
                <AbsolutePosition top={5} right={15}>
                  <DoneAll />
                </AbsolutePosition>
              )}
            </div>
          </div>
          <div
            className={classNames(styles.message, {
              [styles.errorMessage]: !!err,
            })}>
            {!err ? message : err.text}
          </div>
          {err && (
            <Margin top={25}>
              <Button
                onClick={handleClose}
                top={1}
                position='left'
                text={'Закрыть'}
              />
            </Margin>
          )}
        </div>
      </div>
    )
  );
}

SaveStatus.propTypes = {
  status: PropTypes.number,
  state: PropTypes.bool,
  message: PropTypes.string,
  classes: PropTypes.object,
  err: PropTypes.object,
  dispatchRecalc: PropTypes.func.isRequired,
};

SaveStatus.defaultProps = {
  classes: {},
  state: false,
  progress: 0,
  status: 0,
  message: 'Сохранение категорий',
  err: null,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    root: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: theme.colorsTheme.modalBackground(0.77),
      zIndex: 200,
    },
    window: {
      width: 500,
      background: theme.colorsTheme.layer,
      borderRadius: '6px',
      padding: 25,
      margin: '10% auto',
      boxShadow: `0px 11px 15px -7px rgba(0,0,0,0.2),
        0px 24px 38px 3px rgba(0,0,0,0.14),
        0px 9px 46px 8px rgba(0,0,0,0.12);`,
    },
    status: {
      width: '100%',
      height: 35,
      background: theme.colorsTheme.input,
      borderRadius: '6px',
      overflow: 'hidden',
    },
    statusInner: {
      transition: 'all 300ms ease-in-out',
      width: '0%',
      height: '100%',
      position: 'relative',
      background: theme.palette.primary.main,
      '& path': {
        fill: theme.colorsTheme.text,
      },
    },
    errorStatusInner: {
      background: theme.colorsTheme.shortage,
    },
    message: {
      fontSize: 12,
      color: theme.colorsTheme.grey,
      marginTop: 6,
      marginLeft: 2,
    },
    errorMessage: {
      color: theme.colorsTheme.shortage,
    },
  }),
  {
    name: 'SaveStatus',
  }
);

export default SaveStatus;
