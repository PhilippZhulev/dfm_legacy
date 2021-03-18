import React, { useState, useEffect } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Checkbox from '@material-ui/core/Checkbox';
import {
  TableRow,
  TableCell,
  ColorPicker,
  Icon,
  MultiSelect,
} from 'components';
import { handleWarn } from 'helpers';
import { useStyles } from './style';
import BusinessDict from '../../../../services/api/businessDict';
import { required } from '../../../../services/validation';
import { variantСalc } from './category';

const initForm = {
  color: '#EF5350',
  description: '',
  isGlobal: true,
  label: '',
  subCategories: [],
  value: '',
  calcTypes: ['tariff'],
};

export const NewCategory = (props) => {
  const { fetch, setIsCreate, debounceFetch, checkValid } = props;
  const [form, setForm] = useState(initForm);
  const [subCategories, setSubCategories] = useState([]);

  const handleChange = (value, name) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeCalc = (values) => {
    if (!values.length) {
      handleWarn({
        message: 'Должен быть выбран хотя бы один вариант расчета',
      });
      return;
    }
    handleChange(
      values.map((el) => el.value),
      'calcTypes'
    );
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    const res = await debounceFetch('');
    setSubCategories(res);
  };

  const save = async () => {
    try {
      const validation = checkValid(form);
      if (validation.status) {
        handleWarn({
          message: `Не заполнено значение "${validation.field}"`,
        });
        return;
      }
      const data = { ...form };
      await BusinessDict.category.save({ data });
      setIsCreate(false);
      fetch();
    } catch (error) {
      handleWarn(error);
    }
  };

  const getSubCategories = async (intSearch) => {
    if (!intSearch.trim()) {
      setSubCategories([]);
      return;
    }

    const res = await debounceFetch(intSearch);
    setSubCategories(res);
  };

  const isValid = () =>
    Object.values(form).reduce((acc, cur) => {
      if (typeof cur === 'string') {
        return !!required(cur.trim());
      }

      return acc;
    }, false);

  const handleClose = () => {
    setIsCreate(false);
  };

  /** Инициализация стилей */
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
        <TextareaAutosize
          value={form.value}
          className={classes.textArea}
          spellCheck='false'
          onChange={(event) => handleChange(event.target.value, 'value')}
        />
      </TableCell>
      <TableCell>
        <TextareaAutosize
          value={form.label}
          className={classes.textArea}
          spellCheck='false'
          onChange={(event) => handleChange(event.target.value, 'label')}
        />
      </TableCell>
      <TableCell>
        <ColorPicker
          color={form.color}
          onChange={(color) => handleChange(color.hex, 'color')}
        />
      </TableCell>
      <TableCell>
        <TextareaAutosize
          value={form.description}
          className={classes.textArea}
          spellCheck='false'
          onChange={(event) => handleChange(event.target.value, 'description')}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={form?.isGlobal}
          onChange={(event) => handleChange(event.target.checked, 'isGlobal')}
          color='primary'
        />
      </TableCell>
      <TableCell>
        <MultiSelect
          selected={form.subCategories}
          options={subCategories}
          onChange={(values) => handleChange(values, 'subCategories')}
          classes={{ root: classes.multiSelectRoot }}
          onSearch={getSubCategories}
        />
      </TableCell>
      <TableCell>
        {/* ! МОК */}
        <MultiSelect
          selected={form.calcTypes?.map((el) =>
            variantСalc.find((cur) => cur.value === el)
          )}
          options={variantСalc}
          onChange={handleChangeCalc}
          classes={{
            root: classes.multiSelectRoot,
          }}
        />
      </TableCell>
    </TableRow>
  );
};
