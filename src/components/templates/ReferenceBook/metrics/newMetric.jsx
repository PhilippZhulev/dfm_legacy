import React, { useState } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { TableRow, TableCell, Icon, MultiSelect } from 'components';
import { handleWarn } from 'helpers';
import { useStyles } from '../metrics';

import Metric from '../../../../services/api/metric';
import { required } from '../../../../services/validation';
import { virualStore } from '../../../../virtualStore';

const initForm = {
  label: '',
  cats: [],
  value: '',
};

export const NewMetric = (props) => {
  const { saveDump, setIsCreate, categories, setMetrics } = props;
  const [form, setForm] = useState(initForm);

  const handleChange = (value, name) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const save = async () => {
    const { model } = virualStore;
    try {
      if (isValid()) {
        handleWarn({
          message: 'Заполните все поля корректно',
        });
        return;
      }
      const data = [{ ...form, cats: form.cats.map((cat) => cat.value) }];
      const res = await Metric.AddMetrics({ modelId: model.value, data });
      saveDump(res.data);
      setMetrics(res.data);
      setIsCreate(false);
    } catch (error) {
      handleWarn(error);
    }
  };

  const isValid = () =>
    Object.values(form).reduce((_, cur) => {
      if (typeof cur === 'string') {
        return !!required(cur.trim());
      }

      return !!required(cur);
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
        <MultiSelect
          selected={form.cats}
          options={categories}
          onChange={(values) => handleChange(values, 'cats')}
          classes={{
            root: classes.multiSelectRoot,
          }}
        />
      </TableCell>
    </TableRow>
  );
};
