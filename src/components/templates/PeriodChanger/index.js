import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  AppBarCol,
  HorizontalChanger,
  SingleSelect,
  PeriodSelect,
} from 'components';
import Tooltip from '@material-ui/core/Tooltip';
import { typesList } from '../../../static/period';
import Target from '../../svg/Target';

/**
 * Переключатель периодов
 *
 * @component
 * @param {object} classes - классы стилей
 * @param {string} periodType - тип периода ('Y', 'Q', 'M')
 * @param {array} allowPeriodTypes - массив доступных для вобора типов (['Y', 'M'])
 * @param {boolean} doubleChanger - признак двойного выбора периода (сроавнение)
 * @param {object} periodList - массив объектов по всем доступным периодам в зависимости от типа [ { value: 'Y', label: 'Год'}, { value: 'Q', label: 'Квартал'}]
 * @param {array} currents - массив "текущих" периодов
 */
function PeriodChanger({
  classes,
  periodType,
  allowPeriodTypes,
  doubleChanger,
  periodList,
  currents,
  onChange,
}) {
  const styles = useStyles({ classes });

  const [periods, sePeriods] = useState(periodList);

  const [data, setData] = useState({
    periodType,
    currents,
  });

  // Изменение значений типа и значения периода
  useEffect(() => {
    sePeriods(periodList.filter(({ type }) => type === periodType));
    setData({ periodType, currents });
  }, [periodType, currents]);

  /** Изменение периода */
  const onCurrentChange = (item, index) => {
    const curs = data.currents.slice();
    curs[index] = item;

    const index2 = Number(!index);

    if (doubleChanger && curs[index].value === data.currents[index2].value) {
      const el2 = periods.find((el) => el.value !== curs[index].value);
      curs[index2] = el2;
    }

    setData({ ...data, currents: curs });
    onChange({ ...data, currents: curs });
  };

  /** Изменение типа периода */
  const onChangeType = (result) => {
    // Новый список периодов в зависимости от типа
    const newListPeriod = periodList.filter(({ type }) => type === result);

    // Смена выбранного периода
    const changedCurrents = [newListPeriod[0]];

    // Парный выбираемый период
    if (doubleChanger) {
      changedCurrents.push(newListPeriod[Number(newListPeriod.length > 1)]);
    }

    setData({
      ...data,
      periodType: result,
      currents: changedCurrents,
    });
    onChange({
      ...data,
      periodType: result,
      currents: changedCurrents,
    });
  };

  const label = doubleChanger ? 'периоды сравнения' : 'период';

  /** Показ визуального признака целевого периода */
  const target = doubleChanger && (
    <div className={styles.target}>
      <Tooltip
        title={<div className={classes.tooltipInner}>целевой период</div>}
        arrow
        classes={{
          tooltipArrow: classes.tooltipArrow,
        }}
        disableFocusListener
        disableTouchListener
        placement='top'>
        <div className={styles.targetRef}>
          <Target />
        </div>
      </Tooltip>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{label}:</div>
      {target}

      <div className={styles.periods}>
        {currents.map((item, index) => (
          <PeriodSelect key={index}>
            <SingleSelect
              options={periods}
              selected={data.currents[index]}
              onChange={(result) => onCurrentChange(result, index)}
            />
          </PeriodSelect>
        ))}
      </div>

      <HorizontalChanger
        onChange={(result) => onChangeType(result)}
        current={data.periodType}
        items={typesList}
        allowItems={allowPeriodTypes}
      />
    </div>
  );
}

PeriodChanger.propTypes = {
  classes: PropTypes.object,
  periodType: PropTypes.string.isRequired,
  allowPeriodTypes: PropTypes.array.isRequired,
  doubleChanger: PropTypes.bool,
  periodList: PropTypes.array.isRequired,
  currents: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

PeriodChanger.defaultProps = {
  classes: {},
  periodType: '',
  allowPeriodTypes: [],
  doubleChanger: false,
  periodList: [],
  currents: [],
  onChange: null,
};

// Приватные стили
const useStyles = makeStyles(
  (theme) => ({
    wrapper: {
      display: 'inline-flex',
      paddingLeft: 15,
    },
    label: {
      color: theme.colorsTheme.disabled,
      fontSize: 14,
      lineHeight: '16px',
      display: 'flex',
      alignItems: 'center',
    },
    target: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 24.66,
      cursor: 'pointer',
    },
    targetRef: {
      height: 16,
    },
    periods: {
      color: theme.colorsTheme.disabled,
      display: 'flex',
      marginRight: 26,
    },
  }),
  {
    name: 'PeriodChanger',
  }
);

export default PeriodChanger;
