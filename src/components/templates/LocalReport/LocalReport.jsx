import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import { Maximize, AnalysisTSO, BusinessOverview } from 'containers';
import { Icon } from 'components';

/** Список отчетов */
const items = [
  { label: 'Структура модели', value: 'businessOverview' },
  { label: 'Структура ТСО', value: 'analyzeTSO' },
];

/**
 * Компонент блока отчетов в боковой панели модели
 * @component
 * @public
 */
export const LocalReport = (props) => {
  /** Состояние открытого справочника */
  const [openLocalReport, setOpenLocalReport] = useState(null);
  /** Контайнер для портала */
  const container = document.getElementById('portal-maximize');

  /**
   * Изменение состояния открытого справочника
   * @param {Number} index - `Индекс справочника`
   */
  const handleClick = (index) => {
    setOpenLocalReport(index);
  };

  /** Инициализация стилей */
  const classes = useStyles(props);
  return (
    <>
      <div className={classes.root}>
        {items.map((item, index) => (
          <div
            key={index}
            className={classes.item}
            onClick={() => handleClick(index)}>
            {item.label}
            <Icon icon='CHEVRON_RIGHT' size={24} fillColor='transparent' />
          </div>
        ))}
      </div>

      <Maximize
        onClose={() => setOpenLocalReport(null)}
        clickBackground={() => setOpenLocalReport(null)}
        stateIn={openLocalReport !== null}
        classes={{
          root: classNames({ [classes.maximize]: openLocalReport !== null }),
          container: classes.container,
          background: classes.background,
        }}
        container={container}>
        {openLocalReport === 0 && <BusinessOverview />}
        {openLocalReport === 1 && <AnalysisTSO />}
      </Maximize>
    </>
  );
};

/** Назначаем displayName */
LocalReport.displayName = 'LocalReport';

/** Основные стили */
const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        color: colorsTheme.grey,
        padding: '16px 0',
        width: '100%',
      },

      item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 42,
        width: '100%',
        transition: 'all .3s ease-in-out',
        cursor: 'pointer',
        padding: '0 24px',

        '&:hover': {
          color: colorsTheme.nodeColor,
        },
      },

      background: {
        background: fade(colorsTheme.dark, 0.4),
      },

      maximize: {
        zIndex: 10,
      },
    };
  },
  { index: 2, name: 'LocalReport' }
);
