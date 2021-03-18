import React, {
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { SliderEditor } from 'containers';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  Icon,
  StyledPopper,
  Separator,
  SingleSelect,
  FormulaIcon,
  Tag,
} from 'components';
import { MoneyFormat } from 'helpers';
import { Metric } from './metric';
import Middleware from '../../../services/middleware/index.js';
import { isFormula } from '../../../services/validation/formula';
import { useStyles } from './style';

/**
 * Компонент пенели узла потребляет
 * @component
 * @public
 */
export const PanelNodeConsumption = React.forwardRef((props, ref) => {
  const { consumption, period, lockedModel, formulaViewed } = props;
  /** Состояние панели */
  const [expanded, setExpanded] = useState(false);
  /** Состояние триггера для анимации */
  const [trigger, setTrigger] = useState(false);
  /** Реф на пенель */
  const elementRef = useRef(null);

  const [state, setState] = useState(0);

  /** Запуск анимации */
  useEffect(() => {
    if (trigger) {
      setTimeout(() => {
        setTrigger(false);
      }, 500);
    }
  }, [trigger]);

  const labelTag = useMemo(
    () =>
      consumption.subCategories.find((el) => el.value === consumption.type)
        ?.label,
    [consumption.type]
  );

  /** Передаем реф из компонента */
  useImperativeHandle(
    ref,
    () => ({
      elementRef,
      setExpanded,
      setTrigger,
      expanded,
    }),
    [expanded]
  );

  /**
   * Переключатель панелей
   * @param {SyntheticEvent} event `SyntheticEvent`
   * @param {Boolean} isExpanded состояние панели
   */
  const handleChangeExpanded = () => (_, isExpanded) => {
    setExpanded(isExpanded);
  };
  /** Перерасчет всей суммы */
  const setMainValue = (metrics) => {
    let value = 0;
    metrics.forEach((item) => (value += item.mainValue));
    return MoneyFormat(value);
  };

  /** Удаление метрики */
  const handleDeletedMetric = (e) => {
    e.stopPropagation();
    if (lockedModel) {
      Middleware.SaveDumpData(
        {
          checked: false,
          resourceId: consumption.id,
          resource: period.resource,
          period: period.period,
        },
        'categoryManagment'
      );
    }
  };

  /** Смена тип узла */
  const handleChangeTypeNode = (value) => {
    if (lockedModel) {
      Middleware.SaveDumpData(
        {
          type: value,
          resourceId: consumption.id,
          resource: period.resource,
          period: period.period,
        },
        'changeType'
      );
    }
  };

  /** Смена тип расчета */
  const handleChangeCalcType = (value) => {
    if (lockedModel) {
      Middleware.SaveDumpData(
        {
          calcType: value,
          resourceId: consumption.id,
          resource: period.resource,
          period: period.period,
        },
        'changeCalcType'
      );
    }
  };

  /** Переход к узлу */
  const handleTransition = () => {
    window.ActiveNode(consumption.id);
    document.dispatchEvent(
      new CustomEvent('app.graph.activeNode', {
        detail: {
          value: consumption.id,
          label: consumption.label,
        },
      })
    );
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  /** Проверка наличия формул среди входящих метрик */
  const formulaCheck = (metrics) =>
    metrics.some((metric) => isFormula(metric.rule));

  /** Рендер компонента */
  return (
    <div className={classes.root} ref={elementRef}>
      <ExpansionPanel
        square
        expanded={expanded}
        onChange={handleChangeExpanded()}
        classes={{
          root: classes.rootPanel,
        }}>
        <ExpansionPanelSummary
          aria-controls='panel1a-content'
          classes={{
            root: classNames(classes.rootSummary, {
              [classes.blinkAnimation]: trigger,
            }),
          }}
          id='panel1a-header'>
          <div className={classes.summary}>
            <div className={classes.row}>
              <div className={classes.title}>{consumption.name}</div>
              <StyledPopper
                placement='right'
                disablePortal={false}
                content={
                  <div className='more'>
                    <div
                      onClick={handleDeletedMetric}
                      className={classNames(classes.action, {
                        disabled: !lockedModel,
                      })}>
                      <Icon
                        size={18}
                        icon='CIRCLE_CLOSE'
                        fillColor='transparent'
                      />

                      <span>Удалить</span>
                    </div>

                    <div className={classes.action} onClick={handleTransition}>
                      <Icon
                        size={18}
                        icon='TRANSITION2'
                        fillColor='transparent'
                      />

                      <span>Перейти в узел</span>
                    </div>
                  </div>
                }>
                <Icon
                  className={classes.iconMore}
                  icon='MORE_VERTICAL'
                  size={22}
                />
              </StyledPopper>
            </div>
            <div className={classes.row}>
              <span className={classes.sumWrapper}>
                <span className={classes.sumLabel}>
                  {consumption.calcType.value === 'tariff'
                    ? setMainValue(consumption.metrics)
                    : MoneyFormat(consumption.paymentCalc.result)}
                </span>
                {!expanded ? (
                  <FormulaIcon
                    changeable={false}
                    existed={formulaCheck(consumption.metrics)}
                    className={classes.formulaIcon}
                    info={'Значение рассчитано по формуле'}
                  />
                ) : null}
              </span>

              <Icon
                className={classNames(classes.iconDown, {
                  [classes.iconDownExpanded]: expanded,
                })}
                icon='CHEVRON_DOWN'
                size={22}
                fillColor='transparent'
              />
            </div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {!consumption.type ? (
            <SingleSelect
              label='Тип узла'
              classes={{ root: classes.selectRoot, select: classes.select }}
              options={consumption.subCategories}
              onChange={(subCategory) =>
                handleChangeTypeNode(subCategory.value)
              }
              noOptionsMessage='У категории не заданы подкатегории'
              noOptionsMessageSelect='Тип узла не выбран'
              isDisabled={!lockedModel}
            />
          ) : (
            <Tag
              label={labelTag}
              color={consumption.color}
              onDelete={lockedModel ? () => handleChangeTypeNode(null) : null}
              classes={{ label: classes.label }}
            />
          )}
          <SingleSelect
            label='Вариант расчета'
            classes={{ root: classes.selectRoot, select: classes.select }}
            selected={consumption.calcType}
            options={consumption.calcTypes}
            onChange={(calcType) => handleChangeCalcType(calcType.value)}
            noOptionsMessage='Нет доступных вариантов расчёта'
            noOptionsMessageSelect='Тип расчета не выбран'
            isDisabled={!lockedModel}
          />
          {consumption.calcType.value === 'tariff' &&
            consumption.metrics.map((metric, index, arr) => (
              <React.Fragment key={index}>
                <Metric
                  period={period}
                  id={consumption.id}
                  metric={metric}
                  lockedModel={lockedModel}
                  formulaViewed={formulaViewed}
                />

                {arr.length > 1 && index < arr.length - 1 && (
                  <Separator
                    classes={{
                      horizontalSeparator: classes.horizontalSeparator,
                    }}
                  />
                )}
              </React.Fragment>
            ))}

          {consumption.calcType.value === 'payment' && (
            <SliderEditor
              period={period}
              id={consumption.id}
              value={consumption.paymentCalc.fraction}
              balance={consumption.balance}
              step={0.01}
              min={0}
              max={100}
              lockedModel={lockedModel}
              // valueLabelDisplay='auto'
              aria-labelledby='track-inverted-range-slider'
            />
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
});

/** Назначаем displayName */
PanelNodeConsumption.displayName = 'PanelNodeConsumption';

/** Назначаем propTypes */
PanelNodeConsumption.propTypes = {
  lockedModel: PropTypes.bool.isRequired,
  consumption: PropTypes.object.isRequired,
  period: PropTypes.object.isRequired,
  formulaViewed: PropTypes.bool,
};
