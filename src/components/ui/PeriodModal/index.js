import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { LinkButton, SingleSelect, AppBarCol } from 'components';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Popover from '@material-ui/core/Popover';
import Plus from '../../svg/Plus';
import { typesList, quarterList, monthList } from '../../../static/period';
import { required } from '../../../services/validation';

/**
 * Вспомогательный класс для форматирования датапикера
 */
class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, 'yyyy', { locale: this.locale });
  }
}
const currentYear = new Date().getFullYear();

function PeriodModal({ classes, type, linkLabel, onSave }) {
  const [form, setForm] = useState({
    label: '',
    type: typesList.filter((item) => item.value === type)[0],
    year: currentYear,
    quarter: type === 'Q' ? quarterList[0] : '',
    month: type === 'M' ? monthList[0] : '',
    checked: true,
  });

  useEffect(() => {
    const label = periodLabelGenerate();
    setForm({ ...form, label });
  }, [form.type, form.year, form.quarter, form.month]);

  const handleChange = (value, name) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const periodLabelGenerate = () => {
    let label = '';

    if (form.type.value === 'Y') {
      label = form.year || '';
    }

    if (form.type.value === 'Q') {
      label = `${form.quarter?.value || quarterList[0].value} ${
        form.year || ''
      }`;
    }

    if (form.type.value === 'M') {
      label = `${form.month?.value || monthList[0].value}.${form.year || ''}`;
    }

    return String(label);
  };

  const handleAdd = () => {
    onSave(form);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const styles = useStyles({ classes });

  return (
    <>
      <LinkButton
        classes={{ root: styles.addPeriod }}
        icon={<Plus width='10' height='10' />}
        onClick={handleClick}
        text={linkLabel}
        clicked
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        classes={{ paper: styles.paper }}>
        {form.type.value === 'Q' && (
          <AppBarCol>
            <SingleSelect
              classes={{ select: styles.select }}
              label=''
              options={quarterList}
              selected={!required(form.quarter) ? form.quarter : quarterList[0]}
              onChange={(item) => handleChange(item, 'quarter')}
            />
          </AppBarCol>
        )}

        {form.type.value === 'M' && (
          <AppBarCol>
            <SingleSelect
              classes={{ select: styles.select }}
              label=''
              options={monthList}
              selected={!required(form.month) ? form.month : monthList[0]}
              onChange={(item) => handleChange(item, 'month')}
            />
          </AppBarCol>
        )}
        <AppBarCol>
          <MuiPickersUtilsProvider utils={LocalizedUtils} locale={ruLocale}>
            <KeyboardDatePicker
              views={['year']}
              minDate={'2000'}
              maxDate={'2300'}
              disableToolbar={true}
              value={String(form.year || currentYear)}
              autoOk={true}
              variant={'inline'}
              InputProps={{
                classes: {
                  root: styles.yearPickerRoot,
                },
              }}
              PopoverProps={{
                classes: {
                  paper: styles.popoverPaper,
                },
              }}
              onChange={(date, value) => handleChange(value, 'year')}
            />
          </MuiPickersUtilsProvider>
        </AppBarCol>
        <AppBarCol>
          <LinkButton
            classes={{ root: styles.save }}
            onClick={handleAdd}
            width={'fit-content'}
            text={'Добавить'}
            clicked
          />
        </AppBarCol>
      </Popover>
    </>
  );
}

PeriodModal.propTypes = {
  classes: PropTypes.object,
  linkLabel: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onSave: PropTypes.func,
};

PeriodModal.defaultProps = {
  classes: {},
  linkLabel: 'Добавить период',
  type: 'Y',
};

const useStyles = makeStyles((theme) => ({
  ...theme.modal,

  addPeriod: {
    marginLeft: 20,

    '& span': {
      paddingLeft: 15,
      fontSize: 14,
      lineHeight: '17px',
      fontWeight: 400,
    },
    '& svg': {
      marginTop: 3,
    },
  },

  select: {
    display: 'inline-flex!important',
  },

  paper: {
    background: theme.colorsTheme.layer,
    color: '#FFF',
    marginTop: 10,
    padding: 15,
    boxShadow: '0px 12px 74px rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    fontWeight: 300,
  },

  yearPickerRoot: {
    color: theme.colorsTheme.grey,
    background: theme.colorsTheme.nodeBackground,
    fontSize: 16,
    textOverflow: 'ellipsis',
    fontWeight: 300,
    padding: '3px 0 3px 10px',
    borderRadius: 8,
    fontFamily: 'Open Sans',
    width: 110,

    '&:before, &:hover:before, &:focus:before, &:hover:after, &:focus:after': {
      border: '0px none',
      display: 'none',
      visibility: 'hidden',
      outline: 'none',
    },

    '&:before': {
      color: theme.colorsTheme.text,
      fontSize: 12,
    },

    '& .MuiSvgIcon-root': {
      fill: theme.colorsTheme.grey,
    },
  },

  popoverPaper: {
    background: theme.colorsTheme.nodeBackground,
    width: 200,

    '& .MuiPickersBasePicker-pickerView': {
      width: '100%',
      minWidth: '100%',
    },

    '& .MuiPickersYearSelection-container': {
      width: '100%',
      minWidth: '100%',
      overflowY: 'visible',
    },

    '& .MuiTypography-subtitle1': {
      color: theme.colorsTheme.text,
    },
  },

  save: {
    marginLeft: 0,
    fontSize: 14,
    lineHeight: '16px',
    alignSelf: 'center',
    borderRadius: 8,
    color: `${theme.colorsTheme.control}!important`,
    padding: '8px 16px!important',
    border: `1px solid ${theme.colorsTheme.control}!important`,

    '& span': {
      padding: 0,
    },

    '&:hover': {
      background: `${theme.colorsTheme.control}!important`,
    },

    '&:hover span': {
      color: '#fff',
    },
  },
}));

export default PeriodModal;
