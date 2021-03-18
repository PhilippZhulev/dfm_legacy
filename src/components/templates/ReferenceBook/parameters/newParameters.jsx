import React, { useState, useCallback, useEffect } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { TableRow, TableCell, Icon } from 'components';
import { handleWarn, SciNotation } from 'helpers';
import { useStyles } from './parameters';
import { virualStore } from '../../../../virtualStore';
import { isParametersNotValid } from '../../../../services/validation/reference';
import { LocalParamsApi } from '../../../../services/api/globalLocalParams';

const initForm = {
  label: '',
  volume: '',
  value: '',
  description: '',
};

export const NewParameters = (props) => {
  /** Инициализация стилей */
  const classes = useStyles(props);
  const { saveDump, setIsCreate, setParameters, onEdit } = props;

  const [form, setForm] = useState(initForm);

  useEffect(() => {
    onEdit(null);
  }, []);

  const handleChange = (value, name) => {
    let findValue = value;

    if (name === 'volume') {
      findValue = value.match(/-?\d+(\.\d{0,})?/g);
      findValue = findValue ? findValue[0] : '';
    }
    setForm((prev) => ({ ...prev, [name]: findValue }));
  };

  const save = async () => {
    const { model } = virualStore;
    try {
      const msg = isParametersNotValid(form);
      if (msg) {
        throw new Error(msg);
      }
      const data = [{ ...form }];
      const res = await LocalParamsApi.Add({
        modelId: model.value,
        data,
      });
      const parametersData = res.data.map((param) => ({
        ...param,
        volume: SciNotation.toFixed(param.volume),
      }));
      saveDump(parametersData);
      setParameters(parametersData);
      setIsCreate(false);
    } catch (error) {
      handleWarn(error);
    }
  };

  const handleClose = useCallback(() => {
    setIsCreate(false);
  }, []);

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
        <TextareaAutosize
          value={form.description}
          className={classes.textArea}
          spellCheck='false'
          onChange={(event) => handleChange(event.target.value, 'description')}
        />
      </TableCell>
      <TableCell>
        <TextareaAutosize
          value={form.volume}
          className={classes.textArea}
          spellCheck='false'
          onChange={(event) => handleChange(event.target.value, 'volume')}
        />
      </TableCell>
    </TableRow>
  );
};
