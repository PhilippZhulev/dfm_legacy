import React, { useCallback, useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { TextInput, Icon, StyledPopper, FormulaIcon } from 'components';
import { debounce, clamp } from 'helpers';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import { isFormula } from '../../../services/validation/formula';
import Margin from '../../ui/Margin';

/**
 * Проверка onKeyDown на валидные клавиши
 * @param {String} key `наименование клавиши`
 */
const checkKey = (key) =>
  key !== 'Alt' && key !== 'ArrowDown' && key !== 'ArrowUp' && key !== 'Tab';

/**
 * Проверка валидна вводимая строка
 * @param {String} value `наименование клавиши`
 */
export const checkRuleError = (value) =>
  !!value.match(/[^0-9a-zA-Z\s.,+-/*()_%]/gm);

/**
 * Редактирование метрик
 * @component
 * @public
 */
export const MetricEditor = React.memo((props) => {
  const {
    value,
    rule,
    listAutoComplete = [],
    lockedModel,
    formulaViewed,
    saveDump,
    dispatchModelChange,
  } = props;
  /** Состояние показа листа true/false */
  const [showList, setShowList] = useState(false);
  /** Состояние выбранного параметры из листа */
  const [selected, setSelected] = useState(0);
  /** Состояние правила */
  const [localRule, setLocalRule] = useState(rule);
  /** Реф на поле ввода */
  const ref = useRef(null);

  /** Состояние показа сообщения о необходимости сохранения модели для пересчета */
  const [changed, setChanged] = useState(false);

  /** Установка фокуса на поле ввода */
  const [open, setOpen] = useState(false);

  /** Состояние показа формулы */
  const [formulaDisplay, setFormulaDisplay] = useState(formulaViewed);

  /** Обновление состояний */
  useEffect(() => {
    setLocalRule(rule);
  }, [rule]);

  /** Статус отображения формул */
  useEffect(() => {
    setFormulaDisplay(formulaViewed);
  }, [formulaViewed]);

  /** Статус показа сообщения о необходимости сохранения для пересчета */
  useEffect(() => {
    setChanged(false);
  }, [value, lockedModel]);

  /**
   * ANCHOR: Задежка изменения
   * сосотяния показа листа
   */
  const debounceHideList = useCallback(
    debounce(() => {
      setShowList(false);
      setSelected(0);
    }, 3000),
    []
  );

  /**
   * Изменения состояние метрики
   * @param {SyntheticEvent} event `SyntheticEvent`
   */
  const handleChange = (event) => {
    const { target } = event;
    if (checkRuleError(target.value)) {
      return;
    }
    setLocalRule(target.value);
    saveDump(target.value);
    dispatchModelChange({ state: true });
    setChanged(true);
  };

  /**
   * Функция для события onKeyDown
   *
   * Управлением списком
   * @param {SyntheticEvent} event `SyntheticEvent`
   */
  const handleKeyDown = (event) => {
    const { key } = event;

    if (checkKey(key)) {
      return;
    }

    if (key === 'Alt' && !showList) {
      setShowList(true);
      debounceHideList();
      return;
    }

    if (showList) {
      debounceHideList.clear();

      if (key === 'ArrowDown') {
        setSelected(clamp(selected + 1, 0, listAutoComplete.length - 1));
      }

      if (key === 'ArrowUp') {
        setSelected(clamp(selected - 1, 0, listAutoComplete.length - 1));
      }

      debounceHideList();

      if (key === 'Tab') {
        setLocalRule(localRule + listAutoComplete[selected].value);
        saveDump(localRule + listAutoComplete[selected].value);
        debounceHideList.clear();
        setShowList(false);
        setSelected(0);
        event.preventDefault();
      }
    }
  };

  /**
   * Клик по элементу из списка
   * @param {Number} index `индекс в списке`
   */
  const handleClickElement = (_, index) => {
    setLocalRule(localRule + listAutoComplete[index].value);
    saveDump(localRule + listAutoComplete[index].value);
    setShowList(false);
    ref.current.focus();
  };

  /**
   * Принудительный показ формулы при установке фокуса на поле в режиме редактирования
   */
  const handleFocus = () => {
    setFormulaDisplay(true);
    setOpen(false);
  };

  const handleHover = () => {
    setOpen(true);
  };

  const handleBlur = () => {
    setOpen(false);
  };

  /**
   * Локальный переключатель отображения формулы
   */
  const handleChangeFormulaDisplayed = () => {
    setFormulaDisplay(!formulaDisplay);
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  /** Создание отступа от поля формулы для соответствующей иконки */
  const classRoot = isFormula(rule)
    ? classes.formulaInputRoot
    : classes.formulaInputRootWithoutFormula;

  const empty = Number(localRule) === 0 && Number(value) === 0;

  /** Рендер компонента */
  return (
    <>
      <div className={classes.row}>
        <span>Объем потребляемого ресурса</span>
        <StyledPopper
          placement='right'
          disablePortal={false}
          content={
            <div className={classes.info}>
              <div className={classes.infoText}>
                <span>Доступные знаки:</span>
                <span> - + * / % () 1-9 a-z A-Z .</span>
              </div>

              <div className={classes.infoBlock}>
                <span className={classes.btn}>Alt</span>/
                <span className={classes.btn}>Option</span>
                <span> Открыть меню выбора констант</span>
              </div>

              <div className={classes.infoBlock}>
                <span className={classes.btn}>Tab</span>
                <span> Дополнить константу</span>
              </div>
            </div>
          }>
          <Icon
            className={classes.icon}
            icon={'CIRCLE_EXC'}
            size={18}
            fillColor='transparent'
          />
        </StyledPopper>
      </div>
      <div className={classes.row}>
        <Tooltip
          title={
            <div className={classes.tooltipInner}>
              Задайте величину потребления в виде формулы или конкретных
              значений
            </div>
          }
          arrow
          classes={{
            tooltipArrow: classes.tooltipArrow,
          }}
          disableHoverListener={!empty}
          disableTouchListener
          open={open && empty}
          placement='top'>
          <div
            onMouseOut={handleBlur}
            onMouseOver={handleHover}
            className={classes.formulaInputWrap}>
            <TextInput
              value={formulaDisplay ? localRule : value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              classes={{
                root: classRoot,
                label: classes.formulaInputLabel,
                input: classes.formulaInput,
              }}
              disabled={!lockedModel}
              ref={ref}
            />
          </div>
        </Tooltip>

        {isFormula(localRule) ? <Margin left={5} inline={true}></Margin> : null}

        <FormulaIcon
          changeable={true}
          existed={isFormula(localRule)}
          displayed={formulaDisplay}
          changeFormulaDisplayed={() => handleChangeFormulaDisplayed()}
          className={classes.formulaIcon}
        />
      </div>

      {changed ? (
        <div className={classes.formulaChanged}>
          Внесены изменения. Для пересчета необходимо сохранить модель либо
          отменить изменения
        </div>
      ) : null}

      {showList && (
        <ul className={classes.list}>
          {listAutoComplete.map((el, index) => (
            <li
              className={classNames(classes.item, {
                active: selected === index,
              })}
              onClick={(event) => {
                handleClickElement(event, index);
              }}
              key={index}>
              <span>
                {el.name} ({el.amount})
              </span>
              <small className={classes.param}>{el.paramName}</small>
            </li>
          ))}
        </ul>
      )}
    </>
  );
});

/** Назначаем  displayName */
MetricEditor.displayName = 'MetricEditor';

/** Назначаем  propTypes */
MetricEditor.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rule: PropTypes.string,
  metric: PropTypes.object,
  listAutoComplete: PropTypes.array,
  lockedModel: PropTypes.bool.isRequired,
  formulaViewed: PropTypes.bool,
  saveDump: PropTypes.func,
  dispatchModelChange: PropTypes.func,
};

MetricEditor.defaultProps = {
  formulaViewed: true,
};

/** Основные стили */
const useStyles = makeStyles(
  (theme) => {
    const { colorsTheme } = theme;

    return {
      input: {
        backgroundColor: colorsTheme.background,
        height: 30,

        '&:focus': { border: 'none' },
        '&:disabled': { cursor: 'not-allowed' },
      },

      formulaInputWrap: {
        width: '100%',
      },

      formulaInputRoot: {
        width: '100%',
      },

      formulaInputRootWithoutFormula: {
        width: '100%',
      },

      formulaInputLabel: {
        opacity: 0,
        visibility: 'hidden',
        display: 'none',
        margin: 0,
      },

      formulaInput: {
        backgroundColor: colorsTheme.background,
        height: 30,
        borderRadius: 4,

        '&:focus': { border: 'none' },
        '&:disabled': { cursor: 'not-allowed' },
      },

      formulaIcon: {
        height: 30,
      },

      info: {
        display: 'flex',
        flexDirection: 'column',
      },

      infoText: {
        padding: '10px 0',
        color: colorsTheme.grey,
        fontSize: 12,
        '& span:last-child': {
          color: colorsTheme.nodeColor,
        },
      },
      infoBlock: {
        display: 'flex',
        color: colorsTheme.grey,
        padding: '5px 0',
        lineHeight: '16px',
        flexWrap: 'wrap',
        fontSize: 12,
      },

      btn: {
        background: colorsTheme.nodeBackground,
        borderRadius: 3,
        marginRight: 5,
        height: 16,
        padding: '0 4px',
        lineHeight: '16px',
        '&:nth-child(2)': {
          marginLeft: 5,
        },
      },

      list: {
        background: colorsTheme.listAutoCompleteBG,
        borderRadius: 6,
        padding: '15px 0',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
      },

      item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        color: colorsTheme.nodeColor,
        cursor: 'pointer',
        fontSize: 12,
        padding: '4px 15px',

        '&:hover': {
          background: fade(colorsTheme.nodeColor, 0.2),
        },
        '&.active': {
          background: fade(colorsTheme.nodeColor, 0.4),
        },
      },

      param: {
        fontWeight: 100,
        color: fade(colorsTheme.nodeColor, 0.5),
      },

      row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
        marginBottom: 6,
        fontSize: 14,
      },

      amount: {
        color: colorsTheme.nodeColor,
        justifyContent: 'flex-end',
        fontSize: 12,
      },

      delete: {
        fontSize: 12,
        cursor: 'pointer',
        float: 'right',
        marginBottom: 6,

        '&:hover': {
          color: colorsTheme.nodeColor,
        },
      },

      icon: {
        transition: 'all 200ms ease-in-out',
        cursor: 'pointer',

        '&:hover': {
          color: colorsTheme.nodeColor,
        },
      },

      formulaChanged: {
        color: colorsTheme.blue,
        fontSize: 12,
      },

      tooltipArrow: {
        fontSize: 14,
        lineHeight: '16px',
        color: theme.colorsTheme.text,
        background: theme.colorsTheme.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: 266,
        height: 53,
        boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.5)',

        '& .MuiTooltip-arrow': {
          color: theme.colorsTheme.background,
        },
      },

      tooltipInner: {},
    };
  },
  { name: 'MetricEditor', index: 1 }
);
