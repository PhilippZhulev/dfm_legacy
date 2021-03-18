import React, { useState, useEffect, useMemo } from 'react';
import { TableRow, TableCell, Icon, SingleSelect } from 'components';
import { handleWarn } from 'helpers';
import { periodDataClean } from 'helpers/dataClean';
import { periodLabelConstruct } from 'helpers/dataConstruct';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import ruLocale from 'date-fns/locale/ru';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import format from 'date-fns/format';
import { useStyles } from './style';
import BusinessDict from '../../../../services/api/businessDict';
import { required } from '../../../../services/validation';
import { checkPeriodAdd } from '../../../../services/validation/periods';
import { typesList, quarterList, monthList } from '../../../../static/period';

/**
 * Вспомогательный класс для форматирования датапикера
 */
class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, 'yyyy', { locale: this.locale });
  }
}

const currentYear = new Date().getFullYear();

/**
 * Добавление нового периода
 * @param props
 * @returns {*}
 * @constructor
 */
export const NewPeriod = (props) => {
  const { fetch, setIsCreate } = props;

  /**
   * Инициализация формы добавления периода
   */
  const [form, setForm] = useState({
    label: '',
    type: typesList[0],
    year: currentYear,
    quarter: '',
    month: '',
  });

  /**
   * Перегенерация названия
   */
  const updateLabel = () => {
    const label = periodLabelConstruct(form, quarterList, monthList);
    setForm((prev) => ({ ...prev, label }));
  };

  /**
   * Перегенерация объекта периода
   */
  const updateByType = () => {
    if (form.type.value === 'Y') {
      setForm((prev) => ({ ...prev, month: '', quarter: '' }));
    }

    if (form.type.value === 'Q') {
      setForm((prev) => ({ ...prev, month: '', quarter: quarterList[0] }));
    }

    if (form.type.value === 'M') {
      setForm((prev) => ({ ...prev, month: monthList[0], quarter: '' }));
    }
  };

  useEffect(() => {
    updateLabel();
  }, [form.type, form.year, form.quarter, form.month]);

  useEffect(() => {
    updateByType();
  }, [form.type]);

  /**
   * Изменение формы
   * @param item
   * @param name
   */
  const handleChange = (item, name) => {
    setForm((prev) => ({ ...prev, [name]: item }));
  };

  /**
   * Сохранение данных с валидацией
   * @returns {Promise<void>}
   */
  const save = async () => {
    try {
      if (checkPeriodAdd(form)) {
        handleWarn({
          message: 'Заполните все поля корректно',
        });
        return;
      }

      const data = periodDataClean(form);
      await BusinessDict.period.save({ data });

      setIsCreate(false);
      fetch();
    } catch (error) {
      handleWarn(error);
    }
  };

  const handleClose = () => {
    setIsCreate(false);
  };

  const classes = useStyles(props);

  return (
    <TableRow className={classes.active}>
      <TableCell checkbox />
      <TableCell>
        <Icon
          size={24}
          icon='CHECK'
          className={classes.edit}
          fillColor='transparent'
          onClick={save}
          inline
        />
        <Icon
          size={24}
          className={classes.edit}
          fillColor='transparent'
          onClick={handleClose}
          inline
        />
      </TableCell>
      <TableCell>
        <SingleSelect
          label=''
          width={'100%'}
          options={typesList}
          selected={!required(form.type) ? form.type : typesList[0]}
          onChange={(item) => handleChange(item, 'type')}
        />
      </TableCell>
      <TableCell>{form.label}</TableCell>
      <TableCell>
        <MuiPickersUtilsProvider utils={LocalizedUtils} locale={ruLocale}>
          <KeyboardDatePicker
            classes={{ root: 'pickerRoot' }}
            views={['year']}
            minDate={'2000'}
            maxDate={'2300'}
            disableToolbar={true}
            value={String(form.year)}
            autoOk={true}
            variant={'inline'}
            InputProps={{
              classes: {
                root: classes.yearPickerRoot,
              },
            }}
            PopoverProps={{
              classes: {
                paper: classes.popoverPaper,
              },
            }}
            onChange={(date, value) => handleChange(value, 'year')}
          />
        </MuiPickersUtilsProvider>
      </TableCell>
      <TableCell>
        {form.type.value !== 'M' && form.type.value !== 'Y' && (
          <SingleSelect
            label=''
            width={'100%'}
            options={quarterList}
            selected={form.quarter || quarterList[0]}
            onChange={(item) => handleChange(item, 'quarter')}
          />
        )}
      </TableCell>
      <TableCell>
        {form.type.value !== 'Q' && form.type.value !== 'Y' && (
          <SingleSelect
            label=''
            width={'100%'}
            options={monthList}
            selected={form.month || monthList[0]}
            onChange={(item) => handleChange(item, 'month')}
          />
        )}
      </TableCell>
    </TableRow>
  );
};
