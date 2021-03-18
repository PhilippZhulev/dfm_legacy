import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import { Icon } from 'components';
import { Metrics, Maximize } from 'containers';
import PeriodsDesign from './periods/periodsDesign';
import Categories from './categories';
import Parameters from './parameters/parameters';
import NodeParameters from './NodeParameters/nodeParameters';

/** Список справочников */
const items = [
  { label: 'Метрики', value: 'metricDictionary' },
  { label: 'Категории', value: 'resCategories' },
  { label: 'Периоды', value: 'period' },
  { label: 'Глобальные параметры', value: 'parameters' },
  { label: 'Параметры узла', value: 'nodeParameters' },
];

/**
 * Компонент Справочники
 * @component
 * @public
 */
export const ReferenceBook = React.memo((props) => {
  /** Состояние открытого справочника */
  const [openReferenceBook, setOpenReferenceBook] = useState(null);
  /** Контайнер для портала */
  const container = document.getElementById('portal-maximize');
  /**  Состояние блокирования модели */

  const { dispatchSave, allowed, resource } = props;

  /**
   * Изменение состояния открытого справочника
   * @param {Number} index - `Индекс справочника`
   */
  const handleClick = (index) => {
    setOpenReferenceBook(index);
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  /** Рендер компонента */
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
        hideCloseIcon={openReferenceBook === 2}
        onClose={() => setOpenReferenceBook(null)}
        clickBackground={() => setOpenReferenceBook(null)}
        stateIn={openReferenceBook !== null}
        classes={{
          root: classNames({ [classes.maximize]: openReferenceBook !== null }),
          container: classes.container,
          background: classes.background,
        }}
        container={container}>
        {openReferenceBook === 0 && (
          <Metrics
            title={items[openReferenceBook].label}
            modelElement={items[openReferenceBook].value}
            dispatchSave={dispatchSave}
            allowed={allowed}
          />
        )}
        {openReferenceBook === 1 && (
          <Categories
            title={items[openReferenceBook].label}
            modelElement={items[openReferenceBook].value}
            dispatchSave={dispatchSave}
            allowed={allowed}
          />
        )}
        {openReferenceBook === 2 && (
          <PeriodsDesign
            title={items[openReferenceBook].label}
            modelElement={items[openReferenceBook].value}
            dispatchSave={dispatchSave}
            dispatchClose={() => setOpenReferenceBook(null)}
            allowed={allowed}
          />
        )}
        {openReferenceBook === 3 && (
          <Parameters
            title={items[openReferenceBook].label}
            modelElement={items[openReferenceBook].value}
            dispatchSave={dispatchSave}
            allowed={allowed}
          />
        )}
        {openReferenceBook === 4 && (
          <NodeParameters
            title={items[openReferenceBook].label}
            modelElement={items[openReferenceBook].value}
            dispatchSave={dispatchSave}
            resource={resource}
            allowed={allowed}
          />
        )}
      </Maximize>
    </>
  );
});

/** Назначаем displayName */
ReferenceBook.displayName = 'ReferenceBook';

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

      container: {
        backgroundColor: colorsTheme.background,
        padding: 40,
        paddingRight: 40,
        borderRadius: 8,
        maxHeight: 'calc(100% - 182px)',
        maxWidth: '60%',
        color: colorsTheme.grey,
        overflow: 'hidden',
        margin: '0px auto',
        top: 155,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        transition: 'padding-top .4s linear',
      },

      edited: {
        paddingTop: 90,
      },
    };
  },
  { index: 2, name: 'ReferenceBook' }
);
