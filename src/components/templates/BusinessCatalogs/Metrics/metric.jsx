import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Checkbox from '@material-ui/core/Checkbox';
import { TableRow, TableCell, Icon, MultiSelect } from 'components';
import { handleWarn } from 'helpers';
import { useStyles } from './style';
import BusinessDict from '../../../../services/api/businessDict';

export const Metric = (props) => {
  const {
    metric,
    deleteData,
    onCheckbox,
    disabled,
    onEdit,
    setMetrics,
    debounceFetch,
    checkValid,
  } = props;
  const [form, setForm] = useState(metric);
  const [categories, setСategories] = useState([]);

  const handleChange = (value, name) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getAllCategories();
  }, [disabled]);

  const getAllCategories = async () => {
    const res = await debounceFetch('');
    setСategories(res);
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
      const res = await BusinessDict.metric.edit({ data });
      setMetrics(res.data);
      onEdit(null);
    } catch (error) {
      handleWarn(error);
      setForm(metric);
    }
  };

  const getCategories = async (intSearch) => {
    if (!intSearch.trim()) {
      setСategories([]);
      return;
    }

    const res = await debounceFetch(intSearch);
    setСategories(res);
  };

  const handleCancel = () => {
    onEdit(null);
    setForm(metric);
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  return (
    <TableRow
      className={classNames({
        [classes.active]: !disabled,
        [classes.delete]: deleteData.has(metric.id),
      })}>
      <TableCell checkbox>
        <Checkbox
          onChange={(event) => onCheckbox(event, metric.id)}
          checked={deleteData.has(metric.id)}
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
            onClick={() => onEdit(metric)}
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
        <MultiSelect
          selected={form.cats}
          options={categories}
          isDisabled={disabled}
          onChange={(values) => handleChange(values, 'cats')}
          onSearch={getCategories}
          classes={{
            root: classes.multiSelectRoot,
            selectedValue: classNames({ disabled }),
          }}
          isAsync={true}
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
      <TableCell>{metric.authorFullName}</TableCell>
      <TableCell>{metric.author}</TableCell>
      <TableCell>{metric.modelName}</TableCell>
    </TableRow>
  );
};
