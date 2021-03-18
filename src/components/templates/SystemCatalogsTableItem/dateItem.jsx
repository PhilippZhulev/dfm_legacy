/* eslint-disable max-lines */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'moment/locale/ru';
import 'moment-timezone';
import color from 'color';

const timezone = 'Europe/Moscow';

moment.tz(timezone).locale('ru');

/**
 * Преобразование даты в строку
 * @param {object} date - объект даты
 * @returns {string} - преобразованная строка для записи в данные
 */
function parseDate(date) {
  return date.format().split('T')[0];
}

const date = moment.tz('2020-01-01', timezone);

/**
 * Элемент таблицы системых справочников
 * @component
 * @public
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
function DateItem({ classes, value, onChange, disabled }) {
  const [error, setError] = useState(false);
  const styles = useStyles({ classes });

  const _handleDateChange = (e) => {
    if (!e?.isValid() || !e) {
      setError(true);
    } else {
      setError(false);
      onChange(parseDate(e));
    }
  };

  return (
    <MuiPickersUtilsProvider
      libInstance={moment}
      utils={MomentUtils}
      locale={'ru'}>
      <KeyboardDatePicker
        className={classNames(styles.datePicker, {
          [styles.datePickerError]: error,
        })}
        disabled={disabled}
        maxDate={moment.tz('9999-12-31', timezone)}
        maxDateMessage={'Достигнуто наибольшее значение'}
        minDateMessage={'Достигнуто наименьшее значение'}
        invalidLabel={'Неверное значение даты'}
        margin='normal'
        format='YYYY-MM-DD'
        value={moment.tz(value, timezone)}
        onChange={_handleDateChange}
        cancelLabel={'отмена'}
        DialogProps={{ classes: { dialog: styles.modal } }}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

DateItem.defaultProps = {
  value: moment.tz(timezone),
  onChange: () => {},
  disabled: true,
};

DateItem.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles(
  (theme) => ({
    datePicker: {
      '& .MuiInputBase-input': {
        zIndex: 5,
        background: 'rgba(0,0,0,0)',
        color: theme.colorsTheme.grey,
        outline: 'none',
        resize: 'none',
        padding: '10px 15px',
        width: '100%',
        height: '100%',
        border: '1px solid rgba(0,0,0,0)',
        lineHeight: '18px',
        margin: 'auto 0',
        fontSize: 12,
        '& path': {
          fill: theme.colorsTheme.grey,
        },
      },
      '& .MuiInputBase-root': {
        '& .MuiSvgIcon-root': {
          fill: theme.colorsTheme.grey,
        },
      },
      '& .MuiInput-underline': {
        '&:before': {
          borderBottom: '1px solid transparent!important',
        },
        '&:after': {
          borderBottom: '1px solid transparent!important',
        },
      },
    },
    datePickerError: {
      '& .MuiInputBase-input': {
        color: theme.colorsTheme.err,
      },
    },
    inputWrapper_focused: {
      color: 'unset',
    },
    itemText: {
      color: theme.colorsTheme.grey,
      margin: 'auto 0',
      wordBreak: 'break-word',
    },
    inputWrapper: {
      border: '1px solid rgba(0,0,0,0)',
      height: 62,
      '&$inputWrapper_focused': {
        border: '1px solid rgba(31, 142, 250, 0.7)',
      },
    },
    input: {
      zIndex: 5,
      background: 'rgba(0,0,0,0)',
      color: theme.colorsTheme.text,
      outline: 'none',
      resize: 'none',
      padding: '10px 15px',
      width: '100%',
      height: '100%',
      border: '1px solid rgba(0,0,0,0)',
      lineHeight: '18px',
      margin: 'auto 0',
      fontSize: 12,
    },
    itemTextWrapper: {
      padding: '10px 15px',
      lineHeight: '12px',
    },
    hiddenSpan: {
      visibility: 'hidden',
      fontSize: 12,
      padding: '10px 15px',
    },
    modal: {
      background: theme.colorsTheme.categoryBackground,
      '& .MuiPickersBasePicker-pickerView': {
        background: theme.colorsTheme.categoryBackground,
      },
      '& .MuiIconButton-root': {
        background: 'transparent',
      },
      '& .MuiSvgIcon-root path:first-child': {
        fill: theme.colorsTheme.text,
      },
      '& .MuiTypography-root': {
        color: theme.colorsTheme.text,
      },
      '& .MuiPickersDay-daySelected': {
        background: `rgba(${
          color(theme.colorsTheme.tabButtonSelection).rgb().color
        },0.4)`,
      },
      '& .MuiPickersDatePickerRoot-toolbar': {
        background: `rgba(${
          color(theme.colorsTheme.tabButtonSelection).rgb().color
        },0.4)`,
      },
      '& .MuiButton-label': {
        color: theme.colorsTheme.text,
      },
      '& .MuiButton-textPrimary': {
        color: 'red',
      },
    },
    paper: {
      '& .MuiDialogActions-root': {
        background: theme.colorsTheme.categoryBackground,
      },
    },
  }),
  { name: 'DateItem', index: 1 }
);

DateItem.defaultProps = {
  noLeft: true,
  column: null,
  row: 0,
  enableEdit: false,
  checked: false,
  options: {},
  type: null,
};

DateItem.propTypes = {
  classes: PropTypes.object,
  noLeft: PropTypes.bool,
  column: PropTypes.string,
  row: PropTypes.number,
  enableEdit: PropTypes.bool,
  checked: PropTypes.bool,
  options: PropTypes.object,
  type: PropTypes.string,
  catalog: PropTypes.object,
  data: PropTypes.array,
  update: PropTypes.object,
  setUpdate: PropTypes.func,
};

export default DateItem;
