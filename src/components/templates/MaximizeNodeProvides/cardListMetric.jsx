import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon, TextInput, Button, StyledPopper } from 'components';
import { MoneyFormat, TariffValueFormat } from 'helpers';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { paramsMetric } from '../MinimizeNodeProvides/paramsMetric';
import Middleware from '../../../services/middleware';
import { useStyles } from './styleCardListMetric';

/**
 * Компонент листа с метриками
 * @component
 * @public
 */
export const CardListMetric = React.memo(
  ({
    metric,
    lockedModel,
    fixedTariff,
    resource,
    parentInfo,
    link,
    model,
    dispatchModelSelect,
  }) => {
    /** Состояние списка метрик */
    const [metricForm, setMetricForm] = useState(metric || []);

    const history = useHistory();

    /**
     * Обносления состояние метрик,
     * если ссылка на metric поменялась
     */
    useEffect(() => {
      setMetricForm(metric);
    }, [metric]);

    /**
     * ANCHOR: Задежка ввода
     * @param  {void} func
     * @public
     */
    const deBoundFields = async (func) => {
      clearTimeout(window.metricProvidesCounter);
      window.metricProvidesCounter = setTimeout(() => {
        func();
      }, 300);
    };

    /**
     * Сохранение изменения метрик
     * @param {Object} value `метрика`
     * @param {Number} index `индекс метрики в списке`
     * @param {String} property `наименование измененного параметра`
     */
    const saveDump = (value, index, property) => {
      deBoundFields(() => {
        Middleware.SaveDumpData(
          {
            metricIndex: index,
            property,
            resource: resource.value,
            period: resource.period,
            value,
          },
          'metricProvides'
        );
      });
    };

    /**
     * Изменения метрики
     * @param {SyntheticEvent} event `SyntheticEvent`
     * @param {Number} indexElement `индекс метрики в списке`
     * @param {String} property `наименование измененного параметра`
     */
    const handleChange = (event, property, indexElement) => {
      let findValue = '';
      findValue = event.target.value.match(/-?\d+(\.\d{0,})?/g);

      if (property === 'proportionsValue') {
        findValue = event.target.value.match(/^0+(\.\d{0,})?|1/g);
      }

      const value = findValue ? findValue[0] : '';
      if (findValue !== metricForm[indexElement][property]) {
        const newMetric = metricForm.map((el, index) => {
          if (indexElement === index) {
            return { ...el, [property]: value };
          }

          return el;
        });

        saveDump(newMetric[indexElement], indexElement, property);
        setMetricForm(newMetric);
      }
    };

    /**
     * Изменения состояние метрики послне снятия фокуса
     * @param {Number} index `индекс метрики в списке`
     * @param {String} property `наименование измененного параметра`
     */
    const handleBlur = (property, index) => {
      if (metricForm[index][property] === '') {
        metricForm[index][property] = 0;
        setMetricForm([...metricForm]);
        saveDump(metricForm[index], index, property);
      }
    };

    /**
     * Рендер warn да/нет
     * @param {Object} curMetric `метрика`
     * @param {String} param `наименование параметра`
     * @returns {Boolean} true or false
     */
    const renderIcon = (param, curMetric) =>
      param.paramName === 'tariffValue' &&
      parentInfo?.tariffs[curMetric.value] !== undefined;

    /**
     * Копирование род. тарифа
     * @param {Number} value `значение`
     * @param {Number} indexElement `индекс метрики в списке`
     */
    const copyTariff = (value, indexElement) => {
      const newMetric = metricForm.map((el, index) => {
        if (indexElement === index) {
          return { ...el, tariffValue: value };
        }
        return el;
      });
      setMetricForm(newMetric);
      saveDump(newMetric[indexElement], indexElement, 'tariffValue');
    };

    /** Переход к род. узлу */
    const toGoParentNode = () => {
      const { resourceId, modelId } = link;
      if (model.id === modelId) {
        document.dispatchEvent(
          new CustomEvent('app.graph.activeNode', {
            detail: {
              value: parentInfo.value,
              label: parentInfo.label,
            },
          })
        );
        window.ActiveNode(parentInfo.value);
      } else {
        dispatchModelSelect({
          params: { model: modelId, resource: resourceId },
          route: history,
        });
      }
    };

    /** Тултип */
    const renderTooltip = (curMetric, index) => {
      const difference =
        curMetric.tariffValue !== parentInfo.tariffs[curMetric.value];
      return (
        <div className={classes.tooltip}>
          <>
            Тариф родительского узла <br />
            {difference && 'не'} совпадает с текущим:
            <br />
            <div className={classes.value}>
              {parentInfo.tariffs[curMetric.value]} руб./tps
            </div>
          </>
          <div className={classes.info}>
            Род. узел: <span className={classes.value}>{parentInfo.label}</span>
            <br />
            Модель: <span className={classes.value}>{link.modelId}</span>
            <br />
          </div>
          <div className={classes.actions}>
            <Button
              classes={{ root: classes.button }}
              position={'right'}
              text={'СКОПИРОВАТЬ ТАРИФ'}
              onClick={() =>
                copyTariff(parentInfo.tariffs[curMetric.value], index)
              }
              disabled={!difference || !lockedModel || !fixedTariff}
            />
            <small className={classes.small} onClick={toGoParentNode}>
              Перейти в родительский узел
            </small>
          </div>
        </div>
      );
    };

    /**
     * Состояние выбранной хоть какой-либо метрики
     * true/false
     */
    const isEmpty = !metricForm.find((el) => el.state);

    const getValueTariff = (value) => {
      if ((resource.fixedTariff && !lockedModel) || !resource.fixedTariff) {
        return TariffValueFormat(String(value));
      }

      return value;
    };

    /** Инициализация стилей */
    const classes = useStyles();

    /** Рендер компонента */
    return (
      <div className={classes.root}>
        {metricForm.map((curMetric, index) => {
          if (curMetric.state) {
            return (
              <div key={curMetric.value} className={classes.listItem}>
                <div className={classes.card}>
                  <div className={classes.cardTitle}>
                    {curMetric.label}, {curMetric.value}
                  </div>

                  <div className={classes.cardBody}>
                    <div className={classes.paramsMetric}>
                      {paramsMetric.map((param, indexParam) => {
                        if (param.paramName === 'requiredValue') {
                          return (
                            <React.Fragment key={indexParam}>
                              <div className={classes.row}>
                                <span className={classes.nameMetric}>
                                  Потребность
                                  <br /> от других узлов, ед.:
                                </span>
                                <span className={classes.metricValue}>
                                  {curMetric[param.paramName]}
                                </span>
                              </div>
                            </React.Fragment>
                          );
                        }
                        return (
                          <div className={classes.container} key={indexParam}>
                            <TextInput
                              value={
                                param.paramName !== 'tariffValue'
                                  ? curMetric[param.paramName]
                                  : getValueTariff(curMetric[param.paramName])
                              }
                              label={param.label}
                              classes={{
                                root: classes.rootInput,
                                input: classes.input,
                              }}
                              onChange={(event) =>
                                handleChange(event, param.paramName, index)
                              }
                              onBlur={() => handleBlur(param.paramName, index)}
                              disabled={
                                !lockedModel ||
                                (param.paramName === 'tariffValue' &&
                                  !fixedTariff)
                              }
                            />
                            {renderIcon(param, curMetric) && (
                              <StyledPopper
                                disablePortal={false}
                                placement='right'
                                content={renderTooltip(curMetric, index)}>
                                <Icon
                                  fillColor='transparent'
                                  className={classNames(classes.icon, {
                                    active:
                                      curMetric.tariffValue !==
                                      parentInfo.tariffs[curMetric.value],
                                  })}
                                  size={20}
                                  icon='TRIANGLE_EXC'
                                />
                              </StyledPopper>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return null;
        })}

        {isEmpty && (
          <div className={classes.isEmpty}>Не выбрано ни одной метрики</div>
        )}
      </div>
    );
  }
);

/** Назначаем  displayName */
CardListMetric.displayName = 'CardListMetric';

/** Назначаем  propTypes */
CardListMetric.propTypes = {
  resource: PropTypes.object.isRequired,
  lockedModel: PropTypes.bool.isRequired,
  fixedTariff: PropTypes.bool.isRequired,
  metric: PropTypes.array.isRequired,
  parentInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.instanceOf(null),
  ]),
  link: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  dispatchModelSelect: PropTypes.func.isRequired,
};
