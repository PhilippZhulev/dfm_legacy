import React, { useState, useMemo } from 'react';
import { Button, ModFullButton, StyledPopper } from 'components';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ClonePeriod from './logic';

const ru = {
  btnText: 'КОПИРОВАТЬ ЗНАЧЕНИЕ',
  copyText: 'Копировать данные из периода:',
  emptyText: 'Нет доступных периодов',
  infoText:
    'Произойдет копирование всех значений по данному узлу из выбранного периода модели',
};

/**
 * Инициализация компонента
 * Клонирование периода
 * @class
 * @public
 */
class ClonePeriodInit extends ClonePeriod {
  Main = React.memo(
    ({
      classes,
      periods,
      period,
      locked,
      model,
      onCompleted,
      resource,
      type,
    }) => {
      const styles = useStyles({ classes });
      const [openPopover, setOpenPopover] = useState(false);

      useMemo(() => {
        /** Создать выьранный период */
        this.SetPresently = { periods, period };
        this.SetModel = model;
      }, [period, resource]);

      return (
        <div data-testid='root' className={styles.root}>
          <StyledPopper
            classes={{
              root: styles.popoverRoot,
            }}
            open={openPopover}
            onOpen={(val) => setOpenPopover(val)}
            placement={'right'}
            content={
              <div className={styles.popoverMenu}>
                <div className={styles.popoverTitle}>{ru.copyText}</div>
                <div className={styles.popoverItems}>
                  {this.CreaateItems(
                    { periods, period },
                    (label, id) => (
                      <div
                        onClick={() => {
                          this.CloneData(id, resource, type, onCompleted);
                          setOpenPopover(false);
                        }}
                        key={id}
                        className={styles.popoverItem}>
                        {label}
                      </div>
                    ),
                    () => (
                      <div className={styles.popoverEmpty}>{ru.emptyText}</div>
                    )
                  )}
                </div>
              </div>
            }>
            <div data-testid='wrap' className={styles.buttonWrapper}>
              <ModFullButton>
                <Button
                  disabled={this.ComponentState({ periods, period, locked })}
                  text={ru.btnText}
                />
              </ModFullButton>
            </div>
          </StyledPopper>
          <div data-testid='text' className={styles.text}>
            {ru.infoText}
          </div>
        </div>
      );
    }
  );
}

const clonePeriod = new ClonePeriodInit();

clonePeriod.Main.propTypes = {
  classes: PropTypes.object,
  periods: PropTypes.array,
  period: PropTypes.number,
  locked: PropTypes.bool,
  model: PropTypes.object,
  onCompleted: PropTypes.func,
  resource: PropTypes.string,
  type: PropTypes.string,
};

clonePeriod.Main.defaultProps = {
  periods: [],
};

const useStyles = makeStyles(
  () => ({
    root: {},
    buttonWrapper: {
      marginTop: 22,
      padding: '0 22px 0 22px',
    },
    popoverMenu: {
      width: 154,
    },
    text: {
      color: '#98A7B9',
      lineHeight: '16px',
      fontSize: 12,
      marginTop: 10,
      padding: '0 22px 0 22px',
    },
    popoverRoot: {
      width: '100%',
    },
    popoverTitle: {
      color: '#869AAC',
      fontSize: 14,
      lineHeight: '17px',
    },
    popoverItems: {
      fontSize: 14,
      marginTop: 15,
      color: '#869AAC',
      lineHeight: '17px',
    },
    popoverEmpty: {
      color: '#98A7B9',
      lineHeight: '16px',
      fontSize: 12,
      marginTop: 15,
    },
    popoverItem: {
      padding: '10px 20px',
      margin: '0 -20px',
      transition: 'all 300ms ease-in-out',
      cursor: 'pointer',
      '&:hover': {
        background: '#2d384e',
        color: '#fff',
      },
    },
  }),
  { index: 2 }
);

export default clonePeriod.Main;
