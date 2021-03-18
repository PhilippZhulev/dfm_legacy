import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ProgressBar,
  TextInput,
  Separator,
  Confrim,
  Icon,
  Button,
  TagsMetricForm,
  ConsumedResources,
  ConsumedResourcesIterable,
  ClonePeriod,
} from 'components';
import { useHistory } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Switch from '@material-ui/core/Switch';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { MoneyFormat, usePrevious, TariffValueFormat } from 'helpers';
import MenuIcon from '../../svg/MenuIcon';
import Middleware from '../../../services/middleware/index.js';
import { useStyles } from './styles';
import ParentNode from '../../svg/ParentNode';
import { virualStore } from '../../../virtualStore';
import { paramsMetric } from './paramsMetric';
/** Индекс удаляемой метрики */
let checkedDelete = null;

/**
 * Компонент Узел предоставляет(неполноэкранный режим)
 * @component
 * @public
 */
export const MinimizeNodeProvides = React.memo((props) => {
  const {
    resource,
    lockedModel,
    dispatchChangeResources,
    dispatchModelSelect,
    dispatchAddMetricResource,
    dispatchDeleteMetricResource,
    dispatchFilter,
    dispatchGraph,
    dispatchModelChange,
    parentInfo,
    model,
    availableMetric,
  } = props;

  /** Состояние метрик */
  const [metricForm, setMetricForm] = useState(availableMetric);

  /** Состояние открытой панели */
  const [expanded, setExpanded] = useState(null);
  const [consumedFull, setConsumedFull] = useState(false);

  /** реф на Confrim */
  const modal = useRef(null);
  /** Прошлая пропса ресурса */
  const prevResource = usePrevious(resource);
  const history = useHistory();

  /**
   * Обновляем состояние метрик,
   * если ресурсы обновились
   */
  useEffect(() => {
    if (
      prevResource?.value !== resource.value ||
      prevResource?.period !== resource.period
    ) {
      setMetricForm(availableMetric);
    }
  }, [resource]);

  useEffect(() => {
    setMetricForm(availableMetric);
  }, [availableMetric]);

  /**
   * Смена состояния чекбоксов метрик
   * @param {Number} index индекс панели
   * @param {SyntheticEvent} event `SyntheticEvent`
   */
  const handleChangeCheckbox = (event, index) => {
    const { checked } = event.target;

    if (!checked) {
      handleOpen(index);
      return;
    }

    const newMetric = changeMetric(index, checked, 'state');

    setMetricForm(newMetric);
    dispatchChangeResources({ availableMetric: newMetric });
    dispatchAddMetricResource({
      params: {
        model: model.id,
        resource: resource.value,
        metric: newMetric[index].value,
        period: resource.period,
      },
    });
    Middleware.SaveDumpData(
      { newMetric, index, resource: resource.value, period: resource.period },
      'metric'
    );
  };

  /**
   * Удаление тега метрики
   * @param {Number} index индекс панели
   * @param {SyntheticEvent} event `SyntheticEvent`
   */
  const handleDeleteMetricTag = (value) => {
    const index = metricForm.findIndex((item) => item.value === value);
    if (index >= 0) handleOpen(index);
  };

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
   * Изменения состояние метрики
   * @param {SyntheticEvent} event `SyntheticEvent`
   * @param {Number} indexElement `индекс метрики в списке`
   * @param {String} property `наименование измененного параметра`
   */
  const handleChange = (event, property, index) => {
    let findValue = '';
    findValue = event.target.value.match(/-?\d+(\.\d{0,})?/g);

    if (property === 'proportionsValue') {
      findValue = event.target.value.match(/^0+(\.\d{0,})?|1/g);
    }

    const value = findValue ? findValue[0] : '';
    const newMetric = changeMetric(index, value, property);
    setMetricForm(newMetric);
    saveDump(newMetric[index], index, property);
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
   * Копирование род. тарифа
   * @param {Number} value `значение`
   * @param {Number} index `индекс метрики в списке`
   */
  const copyTariff = (value, index) => {
    const newMetric = changeMetric(index, value, 'tariffValue');
    setMetricForm(newMetric);
    saveDump(newMetric[index], index, 'tariffValue');
  };

  /**
   * Изменения метрики
   * @param {String} value `значение`
   * @param {Number} indexElement `индекс метрики в списке`
   * @param {String} property `наименование измененного параметра`
   */
  const changeMetric = (indexElement, value, params) =>
    metricForm.map((el, index) => {
      if (indexElement === index) {
        return { ...el, [params]: value };
      }
      return el;
    });

  /**
   * Смена состояния фиксированный тариф
   * @param {SyntheticEvent} event `SyntheticEvent`
   */
  const handleChangeSwitch = (event) => {
    const { checked } = event.target;

    Middleware.SaveDumpData(
      { checked, resource: resource.value, period: resource.period },
      'metricFixedTarrif'
    );

    /* dispatchChangeFixedTariff(); */
  };

  /**
   * Переключатель панелей
   * @param {Number} index индекс панели
   * @param {SyntheticEvent} event `SyntheticEvent`
   * @param {Boolean} isExpanded состояние панели
   */
  const handleChangeExpanded = (index) => (_, isExpanded) => {
    setExpanded(isExpanded ? index : null);
  };

  /**
   * Функция открытия модального окна confrim
   * @param {Number} index индекс удаляемой метрики
   */
  const handleOpen = (index) => {
    checkedDelete = index;
    modal.current.handleShow();
  };

  /** Функция подтвердить в конфрим */
  const handleAgree = () => {
    const newMetric = changeMetric(checkedDelete, false, 'state');

    setMetricForm(newMetric);
    dispatchChangeResources({ availableMetric: newMetric });
    dispatchDeleteMetricResource({
      params: {
        model: model.id,
        resource: resource.value,
        metric: newMetric[checkedDelete].value,
        period: resource.period,
      },
    });
    Middleware.SaveDumpData(
      {
        newMetric,
        index: checkedDelete,
        resource: resource.value,
        period: resource.period,
      },
      'metric'
    );
    modal.current.handleHide();
  };

  /** Функция отменить в конфрим */
  const handleDisagree = () => {
    modal.current.handleHide();
  };

  /** Переход к род. узлу */
  const toGoParentNode = () => {
    const { resourceId, modelId } = resource.link;
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

  /** Функция для дизэйбла поля ввода */
  const disabledInput = (param) => {
    if (!lockedModel) {
      return true;
    }

    if (param.paramName === 'tariffValue' && !resource.fixedTariff) {
      return true;
    }

    if (param.paramName === 'requiredValue') {
      return true;
    }

    return false;
  };

  const requiredValues = useMemo(
    () =>
      metricForm.reduce((acc, current) => {
        if (current.state) {
          return acc + current.requiredValue * current.tariffValue;
        }

        return acc;
      }, 0),
    [metricForm]
  );

  const availableValues = useMemo(
    () =>
      metricForm.reduce((acc, current) => {
        if (current.state) {
          return acc + current.availableValue * current.tariffValue;
        }

        return acc;
      }, 0),
    [metricForm]
  );

  const metricsProgress = useMemo(() => {
    if (!availableValues) {
      return 0;
    }

    return (requiredValues / availableValues) * 100;
  }, [requiredValues, availableValues]);

  const getValueTariff = (value) => {
    if ((resource.fixedTariff && !lockedModel) || !resource.fixedTariff) {
      return TariffValueFormat(String(value));
    }

    return value;
  };

  /**
   * Вычисление выбранных метрик
   * @param {Array} data - `список доступных метрик`
   */
  const metricsSelected = (metrics) => metrics.filter((item) => item.state);

  /** Инициализация стилей */
  const classes = useStyles(props);

  /** Диспатчер переключателя показа формул */
  const handleClonePeriodCompleted = () => {
    const params = {
      model: virualStore.model.value,
      resource: resource.value,
      period: resource.period,
    };
    /** Делаем диспатч состояния филтра в сагу и получаем новые данные */
    dispatchFilter({ params });
    /** Получаем новые данные графа */
    dispatchGraph({ params });
    /** Обновить состояние модели */
    dispatchModelChange({ state: true });
  };

  /** Рендер компонента */
  return (
    <>
      <div className={classes.cloneBlock}>
        <ClonePeriod
          onCompleted={handleClonePeriodCompleted}
          type={'metric'}
          locked={lockedModel}
          period={resource.period}
          resource={resource.value}
          model={virualStore.model}
          periods={virualStore.model.periodDictionary}
        />
      </div>
      {metricsSelected(metricForm).length ? (
        <div className={classes.progressBlock}>
          <div className={classes.progressValue}>
            <span className='title'>Распределено ресурсов</span>
            <div className='value'>
              <span
                className={classNames({
                  [classes.textUnpopular]: metricsProgress < 50,
                  [classes.textPopular]: metricsProgress > 50,
                  [classes.textShortage]: metricsProgress > 100,
                })}>
                {MoneyFormat(requiredValues)} руб.
              </span>{' '}
              из {MoneyFormat(availableValues)} руб.
            </div>
          </div>
          <ProgressBar
            value={metricsProgress}
            classes={{
              color: classNames({
                [classes.unpopular]: metricsProgress < 50,
                [classes.popular]: metricsProgress > 50,
                [classes.shortage]: metricsProgress > 100,
              }),
            }}
          />
        </div>
      ) : null}

      <div className={classes.listMetricCheck}>
        <span className='title'>Предоставляемые ресурсы</span>

        <TagsMetricForm
          lockedModel={lockedModel}
          metricForm={metricForm}
          tagsMetric={metricsSelected(metricForm)}
          changeMetric={(event, index) => handleChangeCheckbox(event, index)}
          deleteMetric={(value) => handleDeleteMetricTag(value)}
        />

        <div className={classes.row}>
          Фиксированный тариф
          <Switch
            color='primary'
            onChange={handleChangeSwitch}
            checked={resource.fixedTariff}
            disabled={!lockedModel}
          />
        </div>
      </div>

      {metricForm.filter((metric) => metric.state).length ? (
        <>
          <Separator />

          <div className='metricPanel'>
            {metricForm.map((metric, index) => {
              const difference =
                metric.tariffValue !== parentInfo?.tariffs[metric.value];
              if (metric.state) {
                return (
                  <React.Fragment key={index}>
                    <ExpansionPanel
                      square
                      expanded={expanded === index}
                      classes={{ root: classes.rootPanel }}
                      onChange={handleChangeExpanded(index)}>
                      <ExpansionPanelSummary
                        expandIcon={<MenuIcon />}
                        aria-controls='panel1a-content'
                        classes={{
                          root: classes.rootSummary,
                        }}
                        id='panel1a-header'>
                        {metric.label}, {metric.value}
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <div className={classes.paramsMetric}>
                          {paramsMetric.map((param, indexParam) => (
                            <React.Fragment key={indexParam}>
                              <TextInput
                                value={
                                  param.paramName !== 'tariffValue'
                                    ? metric[param.paramName]
                                    : getValueTariff(metric[param.paramName])
                                }
                                label={param.label}
                                classes={{
                                  root: classes.rootInput,
                                  input: classes.input,
                                }}
                                onChange={(event) =>
                                  handleChange(event, param.paramName, index)
                                }
                                onBlur={() =>
                                  handleBlur(param.paramName, index)
                                }
                                disabled={disabledInput(param)}
                              />
                              {indexParam === 0 ? (
                                <div key={indexParam} className={classes.well}>
                                  <ConsumedResourcesIterable
                                    data={metric.consumed}
                                    all={consumedFull}
                                    content={(p) => (
                                      <ConsumedResources {...p} />
                                    )}
                                  />
                                  {metric.consumed.length > 3 ? (
                                    <div
                                      className={classes.consumedBtn}
                                      onClick={() =>
                                        setConsumedFull(!consumedFull)
                                      }>
                                      {!consumedFull
                                        ? 'Показать еще'
                                        : 'Скрыть узлы'}
                                    </div>
                                  ) : null}
                                </div>
                              ) : null}
                            </React.Fragment>
                          ))}

                          {parentInfo?.tariffs[metric.value] !== undefined && (
                            <>
                              {parentInfo.tariffs[metric.value] !==
                                metric.tariffValue && (
                                <div
                                  className={classes.row}
                                  style={{ alignItems: 'flex-start' }}>
                                  <Icon
                                    fillColor='transparent'
                                    size={20}
                                    icon='TRIANGLE_EXC'
                                    className={classes.icon}
                                  />

                                  <div className={classes.wrapper}>
                                    <span className={classes.labelNode}>
                                      Тариф родительского узла{' '}
                                      {difference && 'не'} совпадает с текущим:
                                    </span>
                                    <span>
                                      {parentInfo.tariffs[metric.value]}{' '}
                                      руб./tps
                                    </span>
                                  </div>
                                </div>
                              )}

                              <div
                                className={classes.row}
                                style={{ alignItems: 'flex-start' }}>
                                <ParentNode />
                                <div className={classes.wrapper}>
                                  <span className={classes.labelNode}>
                                    Родительский узел:
                                  </span>
                                  <span>{parentInfo.label}</span>

                                  {/* TODO Имя модели с бэка */}
                                  <span
                                    className={classes.labelNode}
                                    style={{ marginTop: 8 }}>
                                    Модель:
                                  </span>
                                  <span>{resource.link?.modelId}</span>
                                </div>
                              </div>

                              <div className={classes.actions}>
                                <Button
                                  classes={{ root: classes.button }}
                                  position={'right'}
                                  text={'СКОПИРОВАТЬ ТАРИФ'}
                                  // TODO copyTariff func
                                  onClick={() =>
                                    copyTariff(
                                      parentInfo.tariffs[metric.value],
                                      index
                                    )
                                  }
                                  disabled={
                                    !difference ||
                                    !lockedModel ||
                                    !resource.fixedTariff
                                  }
                                />
                                <small
                                  className={classes.small}
                                  onClick={toGoParentNode}>
                                  Перейти в родительский узел
                                </small>
                              </div>
                            </>
                          )}
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </React.Fragment>
                );
              }

              return null;
            })}
          </div>
        </>
      ) : null}
      <Confrim
        ref={modal}
        title='Вы действительно хотите удалить эту метрику?'
        footer={{
          agree: {
            label: 'Удалить',
            callback: handleAgree,
          },
          disagree: {
            label: 'Отмена',
            callback: handleDisagree,
          },
        }}
      />
    </>
  );
});

/** Назначаем  displayName */
MinimizeNodeProvides.displayName = 'MinimizeNodeProvides';

/** Назначаем  propTypes */
MinimizeNodeProvides.propTypes = {
  resource: PropTypes.object.isRequired,
  lockedModel: PropTypes.bool.isRequired,
  dispatchChangeResources: PropTypes.func.isRequired,
  parentInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.instanceOf(null),
  ]),
  model: PropTypes.object.isRequired,
  dispatchModelSelect: PropTypes.func.isRequired,
  dispatchAddMetricResource: PropTypes.func.isRequired,
  dispatchDeleteMetricResource: PropTypes.func.isRequired,
  availableMetric: PropTypes.array,
  dispatchFilter: PropTypes.func.isRequired,
  dispatchGraph: PropTypes.func.isRequired,
  dispatchModelChange: PropTypes.func.isRequired,
};
