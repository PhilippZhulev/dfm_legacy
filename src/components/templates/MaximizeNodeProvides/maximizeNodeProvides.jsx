import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MoneyFormat, usePrevious } from 'helpers';
import classNames from 'classnames';
import {
  ProgressBar,
  Confrim,
  ConsumedResourcesIterable,
  ConsumedResources,
} from 'components';
import Scrollbar from 'react-scrollbars-custom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import MenuIcon from '../../svg/MenuIcon';
import { CardListMetric } from './cardListMetric';
import Middleware from '../../../services/middleware/index.js';
import { useStyles } from './style';

/** Индекс удаляемой метрики */
let checkedDelete = null;

/**
 * Компонент Узел предоставляет(полноэкранный режим)
 * @component
 * @public
 */
export const MaximizeNodeProvides = React.memo((props) => {
  const {
    resource,
    lockedModel,
    dispatchChangeResources,
    parentInfo,
    model,
    dispatchModelSelect,
    dispatchAddMetricResource,
    dispatchDeleteMetricResource,
    availableMetric,
  } = props;
  /** Состояние метрик */
  const [metricForm, setMetricForm] = useState(availableMetric);
  /** Состояние открытой панели */
  const [expanded, setExpanded] = useState(false);
  /** реф на Confrim */
  const modal = useRef(null);

  /** Прошлая пропса ресурса */
  const prevResource = usePrevious(resource);

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
   * @param {Number} indexElement `индекс панели`
   * @param {SyntheticEvent} event `SyntheticEvent`
   */
  const handleChangeCheckbox = (event, indexElement) => {
    const { checked } = event.target;

    if (!checked) {
      handleOpen(indexElement);
      return;
    }

    const newMetric = metricForm.map((el, index) => {
      if (indexElement === index) {
        return { ...el, state: checked };
      }

      return el;
    });

    setMetricForm(newMetric);
    dispatchAddMetricResource({
      params: {
        model: model.id,
        resource: resource.value,
        metric: newMetric[indexElement].value,
      },
    });
    dispatchChangeResources({ availableMetric: newMetric });
    Middleware.SaveDumpData(
      {
        newMetric,
        index: indexElement,
        resource: resource.value,
        period: resource.period,
      },
      'metric'
    );
  };

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
   * @param {SyntheticEvent} event `SyntheticEvent`
   * @param {Boolean} isExpanded `состояние панели`
   */
  const handleChangeExpanded = () => (_, isExpanded) => {
    setExpanded(isExpanded);
  };

  /**
   * Функция открытия модального окна confrim
   * @param {Number} index `индекс удаляемой метрики`
   */
  const handleOpen = (index) => {
    checkedDelete = index;
    modal.current.handleShow();
  };

  /** Функция подтвердить в конфрим */
  const handleAgree = () => {
    const newMetric = metricForm.map((el, index) => {
      if (checkedDelete === index) {
        return { ...el, state: false };
      }

      return el;
    });

    setMetricForm(newMetric);
    dispatchDeleteMetricResource({
      params: {
        model: model.id,
        resource: resource.value,
        metric: newMetric[checkedDelete].value,
      },
    });
    dispatchChangeResources({ availableMetric: newMetric });
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

  const requiredValues = useMemo(
    () =>
      availableMetric.reduce((acc, current) => {
        if (current.state) {
          return acc + current.requiredValue * current.tariffValue;
        }

        return acc;
      }, 0),
    [availableMetric]
  );

  const availableValues = useMemo(
    () =>
      availableMetric.reduce((acc, current) => {
        if (current.state) {
          return acc + current.availableValue * current.tariffValue;
        }

        return acc;
      }, 0),
    [availableMetric]
  );

  const metricsProgress = useMemo(() => {
    if (!availableValues) {
      return 0;
    }

    return (requiredValues / availableValues) * 100;
  }, [requiredValues, availableValues]);

  /** Инициализация стилей */
  const classes = useStyles();

  if (resource) {
    /** Рендер компонента */
    return (
      <>
        <h2 className={classes.title}>Узел предоставляет</h2>

        <div className={classes.progressBlock}>
          <div className={classes.progressValue}>
            <span className='title'>Распределено</span>
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

          <div className='bar'>
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
        </div>

        <Scrollbar
          trackYProps={{ style: { width: 4, right: -20 } }}
          thumbYProps={{
            style: {
              background: 'rgba(31, 142, 250, 0.4)',
              width: 4,
              borderRadius: 2,
              position: 'relative',
            },
          }}
          style={{ height: 'calc(100% - 110px)', marginTop: 34 }}>
          <ExpansionPanel
            square
            expanded={expanded}
            classes={{ root: classes.rootPanel }}
            onChange={handleChangeExpanded()}>
            <ExpansionPanelSummary
              expandIcon={<MenuIcon />}
              aria-controls='panel1a-content'
              classes={{ root: classes.rootSummary }}
              id='panel1a-header'>
              Метрики
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{ root: classes.rootDetails }}>
              {metricForm.map((metric, index) => (
                <div key={index} className={classes.blockLabel}>
                  <FormControlLabel
                    classes={{ root: classes.label }}
                    control={
                      <Checkbox
                        onChange={(event) => handleChangeCheckbox(event, index)}
                        checked={metric.state}
                        color='primary'
                        disabled={!lockedModel}
                      />
                    }
                    label={metric.label}
                  />
                </div>
              ))}
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <div className={classes.switchWrapper}>
            <Switch
              color='primary'
              onChange={handleChangeSwitch}
              checked={resource.fixedTariff}
              disabled={!lockedModel}
            />
            <span className={classes.labelSwitch}>Фиксированный тариф</span>
          </div>

          <div className={classes.cardWrapper}>
            <div className={classes.cardWrapperLeft}>
              <CardListMetric
                metric={metricForm}
                lockedModel={lockedModel}
                resource={resource}
                fixedTariff={resource.fixedTariff}
                parentInfo={parentInfo}
                link={resource.link}
                model={model}
                dispatchModelSelect={dispatchModelSelect}
              />
            </div>
            <div className={classes.cardWrapperRight}>
              <h2 className={classes.title}>Потребность от других узлов:</h2>
              <div className={classes.cardWrapperRightFlex}>
                <ConsumedResourcesIterable
                  data={
                    resource.availableMetric.find((el) => el.state === true)
                      ?.consumed
                  }
                  all={true}
                  content={(p) => <ConsumedResources {...p} invert />}
                />
              </div>
            </div>
          </div>
        </Scrollbar>

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
  }

  return null;
});

/** Назначаем  displayName */
MaximizeNodeProvides.displayName = 'MaximizeNodeProvides';

/** Назначаем  propTypes */
MaximizeNodeProvides.propTypes = {
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
};
