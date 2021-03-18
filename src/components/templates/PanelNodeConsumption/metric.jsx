import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MoneyFormat } from 'helpers';
import { MetricEditor } from 'containers';
import Middleware from '../../../services/middleware/index.js';

/** Список с параметрами */
const list = [
  { name: 'Стоимость за ед.', param: 'tariff' },
  /* { name: 'Доступно', param: 'available' }, */
];

/**
 * Компонент метрики для копонента PanelNodeConsumption
 * @component
 * @public
 */
export const Metric = React.memo((props) => {
  const { metric, period, id, lockedModel, formulaViewed } = props;

  /**
   * ANCHOR: Задежка изменения
   * @param {Function} func - `функция`
   */
  const deBoundFields = async (func) => {
    clearTimeout(window.metricCounter);
    window.metricCounter = setTimeout(() => {
      func();
    }, 300);
  };

  /**
   * Сохранение изменения правила метрики
   * @param {String} value `значение`
   */
  const saveDump = (value) => {
    deBoundFields(() => {
      Middleware.SaveDumpData(
        {
          id,
          metric: metric.metricId,
          resource: period.resource,
          period: period.period,
          value,
        },
        'categoryMetric'
      );
    });
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  /** Рендер компонента */
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {metric.label} ({metric.metricId})
      </div>

      <ul className={classes.list}>
        {list.map((el, index) => (
          <li key={index} className={classes.li}>
            <span className='name'>{el.name}:</span>
            <span className={classes.value}>
              {MoneyFormat(metric[el.param])}
            </span>
          </li>
        ))}
      </ul>

      <MetricEditor
        value={metric.volume.toString()}
        rule={metric.rule}
        formulaViewed={formulaViewed}
        lockedModel={lockedModel}
        saveDump={saveDump}
      />
    </div>
  );
});

/** Назначаем displayName */
Metric.displayName = 'Metric';

/** Назначаем propTypes */
Metric.propTypes = {
  id: PropTypes.string.isRequired,
  lockedModel: PropTypes.bool.isRequired,
  metric: PropTypes.object.isRequired,
  period: PropTypes.object.isRequired,
  formulaViewed: PropTypes.bool,
};

/** Основные стили */
const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      root: {
        padding: '0 8px',
        width: '100%',
        marginTop: 16,
      },

      title: {
        color: colorsTheme.nodeColor,
        fontSize: 14,
        marginBottom: 12,
      },

      list: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
        fontSize: 14,
        width: '100%',
      },

      li: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        lineHeight: '28px',
      },

      value: {
        color: colorsTheme.nodeColor,
      },

      add: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 12,
        cursor: 'pointer',
        width: 80,
        margin: '16px 0',
        color: colorsTheme.groupTitle,

        '&:hover': {
          color: colorsTheme.nodeColor,
        },
      },

      input: {
        backgroundColor: colorsTheme.background,
        height: 30,

        '&:focus': {
          border: 'none',
        },
      },

      paper: {
        background: colorsTheme.layer,
      },

      menuItem: {
        color: colorsTheme.grey,
        fontSize: 14,
        padding: '15px 50px 15px 20px',
        '&:not(:last-child)': {
          borderBottom: `1px solid  ${colorsTheme.separator}`,
        },
        transition: 'all .3s ease-in-out',
        '&:hover': {
          color: colorsTheme.nodeColor,
        },
      },
    };
  },
  { index: 1, name: 'Metric' }
);
