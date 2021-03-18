import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Checkbox from '@material-ui/core/Checkbox';
import {
  TableRow,
  TableCell,
  Icon,
  MultiSelect,
  ColorPicker,
} from 'components';
import { handleWarn } from 'helpers';
import { useStyles } from './style';
import BusinessDict from '../../../../services/api/businessDict';

export const variantСalc = [
  { value: 'tariff', label: 'По тарифам' },
  { value: 'payment', label: 'По платам' },
];

export const Category = (props) => {
  const {
    category,
    deleteData,
    onCheckbox,
    disabled,
    onEdit,
    setCategories,
    debounceFetch,
    checkValid,
  } = props;
  const [form, setForm] = useState(category);
  const [subLocalCategories, setLocalSubCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, [disabled]);

  const getAllCategories = async () => {
    const res = await debounceFetch('');
    setLocalSubCategories(res);
  };

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

  const handeSaveEdit = async () => {
    try {
      const validation = checkValid(form);
      if (validation.status) {
        handleWarn({
          message: `Не заполнено значение "${validation.field}"`,
        });
        return;
      }
      const data = { ...form };
      const res = await BusinessDict.category.edit({ data });
      setCategories(res.data);
      onEdit(null);
    } catch (error) {
      handleWarn(error);
      setForm(category);
    }
  };

  const getSubCategories = async (intSearch) => {
    if (!intSearch.trim()) {
      setLocalSubCategories([]);
      return;
    }

    const res = await debounceFetch(intSearch);
    setLocalSubCategories(res);
  };

  const handleCancel = () => {
    onEdit(null);
    setForm(category);
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  return (
    <TableRow
      className={classNames({
        [classes.active]: !disabled,
        [classes.delete]: deleteData.has(category.id),
      })}>
      <TableCell checkbox>
        <Checkbox
          onChange={(event) => onCheckbox(event, category.id)}
          checked={deleteData.has(category.id)}
          color='primary'
        />
      </TableCell>
      <TableCell>
        {disabled ? (
          <Icon
            icon='EDIT_FORM'
            size={20}
            className={classes.edit}
            fillColor='transparent'
            onClick={() => onEdit(category)}
            inline
          />
        ) : (
          <>
            <Icon
              size={24}
              icon='CHECK'
              className={classes.edit}
              fillColor='transparent'
              onClick={handeSaveEdit}
              inline
            />
            <Icon
              size={24}
              className={classes.edit}
              fillColor='transparent'
              onClick={handleCancel}
              inline
            />
          </>
        )}
      </TableCell>
      <TableCell>
        <TextareaAutosize
          value={form.value}
          className={classes.textArea}
          spellCheck='false'
          disabled={disabled}
          onChange={(event) => handleChange(event.target.value, 'value')}
        />
      </TableCell>
      <TableCell>
        <TextareaAutosize
          value={form.label}
          className={classes.textArea}
          spellCheck='false'
          disabled={disabled}
          onChange={(event) => handleChange(event.target.value, 'label')}
        />
      </TableCell>
      <TableCell>
        <ColorPicker
          color={form.color}
          onChange={(color) => handleChange(color.hex, 'color')}
          disabled={disabled}
        />
      </TableCell>
      <TableCell>
        <TextareaAutosize
          value={form.description}
          className={classes.textArea}
          spellCheck='false'
          disabled={disabled}
          onChange={(event) => handleChange(event.target.value, 'description')}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={form.isGlobal}
          onChange={(event) => handleChange(event.target.checked, 'isGlobal')}
          disabled={disabled}
          color='primary'
        />
      </TableCell>
      <TableCell>
        <MultiSelect
          selected={form.subCategories}
          options={subLocalCategories}
          isDisabled={disabled}
          onChange={(values) => handleChange(values, 'subCategories')}
          onSearch={getSubCategories}
          classes={{
            root: classes.multiSelectRoot,
            selectedValue: classNames({ disabled }),
          }}
          isAsync={true}
        />
      </TableCell>
      <TableCell>
        {/* ! МОК */}
        <MultiSelect
          selected={
            form.calcTypes?.map((el) =>
              variantСalc.find((cur) => cur.value === el)
            ) || []
          }
          options={variantСalc}
          isDisabled={disabled}
          onChange={handleChangeCalc}
          classes={{
            root: classes.multiSelectRoot,
            selectedValue: classNames({ disabled }),
          }}
        />
      </TableCell>
    </TableRow>
  );
};
