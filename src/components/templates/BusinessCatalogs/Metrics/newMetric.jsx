import React, { useState, useEffect } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Checkbox from '@material-ui/core/Checkbox';
import { TableRow, TableCell, Icon, MultiSelect } from 'components';
import { handleWarn } from 'helpers';
import { useStyles } from './style';
import BusinessDict from '../../../../services/api/businessDict';
import { required } from '../../../../services/validation/index';

const initForm = {
  label: '',
  cats: [],
  value: '',
  isGlobal: true,
};

export const NewMetric = (props) => {
  const { fetch, setIsCreate, debounceFetch, checkValid } = props;
  const [form, setForm] = useState(initForm);
  const [categories, setСategories] = useState([]);

  const handleChange = (value, name) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    const res = await debounceFetch('');
    setСategories(res);
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
      await BusinessDict.metric.save({ data });
      setIsCreate(false);
      fetch();
    } catch (error) {
      handleWarn(error);
    }
  };

  const isValid = () =>
    Object.values(form).reduce((acc, cur) => {
      if (typeof cur === 'string') {
        return acc || !!required(cur.trim());
      }

      return acc || !!required(cur);
    }, false);

  const handleClose = () => {
    setIsCreate(false);
  };

  const getCategories = async (intSearch) => {
    if (!intSearch.trim()) {
      setСategories([]);
      return;
    }

    const res = await debounceFetch(intSearch);
    setСategories(res);
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
        <MultiSelect
          selected={form.cats}
          options={categories}
          onChange={(values) => handleChange(values, 'cats')}
          onSearch={getCategories}
          classes={{
            root: classes.multiSelectRoot,
          }}
          isAsync={true}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={form.isGlobal}
          onChange={(event) => handleChange(event.target.checked, 'isGlobal')}
          color='primary'
        />
      </TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
    </TableRow>
  );
};
