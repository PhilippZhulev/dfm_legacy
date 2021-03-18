import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextInput, ClonePeriod } from 'components';
import Middleware from '../../../services/middleware/index.js';
import { virualStore } from '../../../virtualStore';

export const DirectExpenses = React.memo((props) => {
  const {
    fixedCosts,
    availableMetric,
    lockedModel,
    period,
    dispatchFilter,
    dispatchGraph,
    dispatchModelChange,
  } = props;
  const [fixed, setFixed] = useState(fixedCosts);
  const [fixedAvailableMetric, setFixedAvailableMetric] = useState(
    availableMetric
  );

  useEffect(() => {
    setFixed(fixedCosts);
    setFixedAvailableMetric(availableMetric);
  }, [fixedCosts, availableMetric]);

  const deBoundFields = async (func) => {
    clearTimeout(window.directExpenses);
    window.directExpenses = setTimeout(() => {
      func();
    }, 300);
  };

  const handleFixed = (event, index) => {
    const value = Number(event.target.value.replace(/\D/g, ''));
    const newFixed = fixed.map((el, ind) => {
      if (index === ind) {
        el.price = value;
      }
      return el;
    });

    deBoundFields(() => {
      Middleware.SaveDumpData(
        {
          value: newFixed,
          resource: period.resource,
          period: period.period,
        },
        'directСost'
      );
    });

    setFixed(newFixed);
  };

  const handleFixedAvailableMetric = (event, valueMetric, index) => {
    const value = Number(event.target.value.replace(/\D/g, ''));
    const newFixed = fixedAvailableMetric
      .filter(({ state }) => state === true)
      .map((el) => {
        if (el.value === valueMetric) {
          el.variable.rates[index].price = value;
        }

        return el;
      });

    deBoundFields(() => {
      Middleware.SaveDumpData(
        {
          value: newFixed,
          resource: period.resource,
          period: period.period,
        },
        'directСostVar'
      );
    });

    setFixedAvailableMetric(newFixed);
  };

  /** Диспатчер переключателя показа формул */
  const handleClonePeriodCompleted = () => {
    const params = {
      model: virualStore.model.value,
      resource: period.resource,
      period: period.period,
    };
    /** Делаем диспатч состояния филтра в сагу и получаем новые данные */
    dispatchFilter({ params });
    /** Получаем новые данные графа */
    dispatchGraph({ params });
    /** Обновить состояние модели */
    dispatchModelChange({ state: true });
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  return (
    <>
      <div className={classes.cloneBlock}>
        <ClonePeriod
          onCompleted={handleClonePeriodCompleted}
          locked={lockedModel}
          type={'direct'}
          period={period.period}
          resource={period.resource}
          model={virualStore.model}
          periods={virualStore.model.periodDictionary}
        />
      </div>
      <div className={classes.block}>
        <div>Фиксированные (в год)</div>
        {fixed.map((el, index) => (
          <TextInput
            key={index}
            value={el.price}
            label={el.costName}
            classes={{
              root: classes.rootInput,
              input: classes.input,
            }}
            onChange={(event) => handleFixed(event, index)}
            disabled={!lockedModel}
          />
        ))}
      </div>

      <div className={classes.block}>
        Переменные
        {availableMetric.map((metric, index) =>
          metric.state === true ? (
            <React.Fragment key={index}>
              <div className={classes.title}>- за {metric.label} в год</div>
              {metric.variable.rates.map((el, indexFixed) => (
                <TextInput
                  key={indexFixed}
                  value={el.price}
                  label={el.costId.toUpperCase()}
                  classes={{
                    root: classes.rootInput,
                    input: classes.input,
                  }}
                  onChange={(event) =>
                    handleFixedAvailableMetric(event, metric.value, indexFixed)
                  }
                  disabled={!lockedModel}
                />
              ))}
            </React.Fragment>
          ) : null
        )}
      </div>
    </>
  );
});

DirectExpenses.displayName = 'DirectExpenses';

/** Основные стили */
const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      block: {
        width: '100%',
        padding: 20,
        borderRadius: 8,
        color: colorsTheme.grey,
        backgroundColor: colorsTheme.nodeBackground,
        margin: '8px 0',
      },

      cloneBlock: {
        margin: '0 -20px 15px -20px ',
      },

      input: {
        backgroundColor: colorsTheme.background,
        height: 30,

        '&:focus': {
          border: 'none',
        },
        '&:disabled': { cursor: 'not-allowed' },
      },

      rootInput: {
        '&:not(:first-child)': {
          marginTop: 16,
        },
      },

      title: {
        margin: '16px 0',
      },
    };
  },
  { index: 1 }
);
