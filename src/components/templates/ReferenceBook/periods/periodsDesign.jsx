import React, {
  useEffect,
  useState,
  useImperativeHandle,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { TabContext, TabPanel } from '@material-ui/lab';
import { Paper, Checkbox, FormControlLabel } from '@material-ui/core';
import { PeriodModal, LinkButton, AppBarCol } from 'components';
import { useStyles } from './styles';
import { Container } from '../container';
import { PeriodTabs, PeriodTab } from '../../../mods/PeriodTab';
import { virualStore } from '../../../../virtualStore';
import Middleware from '../../../../services/middleware';
import BusinessDict from '../../../../services/api/businessDict';
import Period from '../../../../services/api/period';
import { monthList } from '../../../../static/period';
import handleError from '../../../../helpers/handleError';
import { periodsSort } from '../../../../helpers/dataSort';
import { periodDataClean, periodPreSaved } from '../../../../helpers/dataClean';
import handleWarn from '../../../../helpers/handleWarn';

/**
 * Компонент с таблицей спавочника метрик
 * @component
 * @public
 */
const PeriodsDesign = React.forwardRef((props, ref) => {
  const { allowed, saveDump, dispatchClose } = props;

  /** Состояние списка метрик */
  const [periods, setPeriods] = useState([]);

  /** Состояние списка метрик */
  const [tab, setTab] = useState('1');

  /** Получаем данные */
  useEffect(() => {
    fetch();
  }, []);

  /** Функция для получения данных */
  const fetch = async () => {
    try {
      const { model } = virualStore;
      const res = await Middleware.GetDumpData(
        model,
        { type: 'period' },
        'referenceCompile'
      );

      if (res.completed) {
        const data = res.data.map((item) => {
          item.checked = true;
          return item;
        });

        data.sort(periodsSort);
        setPeriods(data);
      }
    } catch (error) {
      handleError('@ReferenceBookPeriods/fetch', error);
    }
  };

  /**
   * Смена вкладки
   * @param event
   * @param newValue - новое значение
   */
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleChangeCheckbox = (label) => {
    const np = periods.map((period, ind) => {
      period.checked =
        period.label === label ? !period.checked : !!period.checked;
      return period;
    });

    setPeriods(np);
  };

  /**
   * Добавление периода в список
   * @param form - данные из формы добавления
   */
  const handleAdd = async (form) => {
    try {
      const one = periods.find((item) => item.label === form.label);

      if (one) {
        const np = periods.map((period) => {
          period.checked =
            period.label === form.label ? true : !!period.checked;
          return period;
        });
        np.sort(periodsSort);
        setPeriods(np);
      } else {
        const clean = periodDataClean(form);
        const query = {
          page: 0,
          size: 1,
          search: form.label,
        };

        const finder = await BusinessDict.period.getAll({ query });
        if (finder.data[0]) {
          clean.id = finder.data[0].id;
        }

        clean.new = true;

        setPeriods((prev) => prev.concat(clean).sort(periodsSort));
      }
    } catch (error) {
      handleWarn(error);
    }
  };

  /**
   * Сохранение данных
   */
  const handleSave = async () => {
    try {
      const { model } = virualStore;

      let fetching = false;
      let res = [];

      /** Сначала удаляем ненужные периоды */
      const deletedData = periods
        .filter((item) => !item.checked && !item.new)
        .map((pre) => periodPreSaved(pre));
      if (deletedData.length > 0) {
        res = await Period.DeletePeriods({
          modelId: model.value,
          data: deletedData,
        });
        fetching = true;
      }

      /** Затем добавим новые */
      const addData = periods
        .filter((item) => item.checked && item.new)
        .map((pre) => periodPreSaved(pre));
      if (addData.length > 0) {
        res = await Period.AddPeriods({
          modelId: model.value,
          data: addData,
        });
        fetching = true;
      }

      if (fetching) {
        const data = res.data.map((item) => {
          item.checked = true;
          return item;
        });

        data.sort(periodsSort);
        saveDump(data, 'guides.period');
        setPeriods(data);
      }

      handleWarn({ message: 'Периоды обновлены' });
    } catch (error) {
      handleWarn(error);
    }
  };

  /** Передаем реф */
  useImperativeHandle(ref, () => ({
    ...ref,
  }));

  /**
   * Отдельный чекбокс с периодом
   * @param item - элемент
   * @param index - индекс
   * @returns {*}
   */
  const period = (item, index) => (
    <div key={index} className={classes.blockLabel}>
      <FormControlLabel
        classes={{ root: classes.checkBoxRoot, label: classes.checkBoxLabel }}
        control={
          <Checkbox
            onChange={(event) => handleChangeCheckbox(item.label)}
            checked={item.checked || false}
            disabled={!allowed}
            color='primary'
          />
        }
        label={
          item.type === 'M'
            ? `${monthList[Number(item.month) - 1].label} ${item.year}`
            : item.label
        }
      />
    </div>
  );

  /**
   * Отфильтрованный список периодов
   * @param periodsType - тип периода
   * @param periodsChecked - статус выбора
   * @returns {*}
   */
  const filteredPeriod = (periodsType, periodsChecked) =>
    useMemo(
      () =>
        periods.filter(
          (item) =>
            item.type === periodsType &&
            (typeof periodsChecked === 'undefined' ||
              item.checked === periodsChecked)
        ),
      [periods, periodsType, periodsChecked]
    );

  /**
   * Декоратор шапки вкладки периодов
   * @param label
   * @param periodsList
   * @param mapType
   * @returns {*}
   */
  const periodTabLabel = (label, periodsList, mapType = '') =>
    useMemo(() => {
      let mapper = [];
      switch (mapType) {
        case 'monthlist':
          mapper = periodsList.map(
            (elem) => `${monthList[Number(elem.month) - 1].label} ${elem.year}`
          );
          break;
        case 'uppercase':
          mapper = periodsList.map((elem) => elem.label.toUpperCase());
          break;
        default:
          mapper = periodsList.map((elem) => elem.label);
      }

      return (
        <>
          <span>
            <span>{label}</span> <span>{periodsList.length || ''}</span>
          </span>
          <span>{mapper.join(', ') || 'не выбрано'}</span>
        </>
      );
    }, [label, periodsList, mapType]);

  /** Инициализация стилей */
  const classes = useStyles(props);

  /** Рендер компонента */
  return (
    <TabContext value={tab}>
      <Paper square className={classes.root}>
        <PeriodTabs
          value={tab}
          onChange={handleChange}
          variant='fullWidth'
          aria-label='tabs example'>
          <PeriodTab
            disableRipple
            label={periodTabLabel('Год', filteredPeriod('Y', true))}
            value='1'
          />
          <PeriodTab
            disableRipple
            label={periodTabLabel(
              'Квартал',
              filteredPeriod('Q', true),
              'uppercase'
            )}
            value='2'
          />
          <PeriodTab
            disableRipple
            label={periodTabLabel(
              'Месяц',
              filteredPeriod('M', true),
              'monthlist'
            )}
            value='3'
          />
        </PeriodTabs>
        <div className={classes.tabsPanel}>
          <TabPanel value='1'>
            <AppBarCol classes={{ headerItemCol: classes.checkboxCol }}>
              {filteredPeriod('Y').map((item, index) => period(item, index))}
            </AppBarCol>
            {allowed && (
              <PeriodModal type='Y' onSave={(form) => handleAdd(form)} />
            )}
          </TabPanel>
          <TabPanel value='2'>
            <AppBarCol classes={{ headerItemCol: classes.checkboxCol }}>
              {filteredPeriod('Q').map((item, index) => period(item, index))}
            </AppBarCol>
            {allowed && (
              <PeriodModal type='Q' onSave={(form) => handleAdd(form)} />
            )}
          </TabPanel>
          <TabPanel value='3'>
            <AppBarCol classes={{ headerItemCol: classes.checkboxCol }}>
              {filteredPeriod('M').map((item, index) => period(item, index))}
            </AppBarCol>
            {allowed && (
              <PeriodModal type='M' onSave={(form) => handleAdd(form)} />
            )}
          </TabPanel>
        </div>
      </Paper>
      <div className={classes.buttons}>
        <LinkButton
          classes={{ root: classes.cancel }}
          onClick={dispatchClose}
          width={'fit-content'}
          text={'Выйти'}
          clicked
        />
        {allowed && (
          <LinkButton
            classes={{ root: classes.save }}
            onClick={handleSave}
            width={'fit-content'}
            text={'Сохранить'}
            clicked
          />
        )}
      </div>
    </TabContext>
  );
});

/** Назначаем displayName */
PeriodsDesign.displayName = 'PeriodsDesign';

/** Назначаем propTypes */
PeriodsDesign.propTypes = {
  deleteData: PropTypes.instanceOf(Set).isRequired,
  onCheckbox: PropTypes.func.isRequired,
  saveDump: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  allowed: PropTypes.bool,
  dispatchClose: PropTypes.func,
};

export default Container(PeriodsDesign);
