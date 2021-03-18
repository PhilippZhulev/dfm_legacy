import React, { useState } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Checkbox from '@material-ui/core/Checkbox';
import { TableRow, TableCell, Icon } from 'components';
import { handleWarn } from 'helpers';
import { useStyles } from './style';
import BusinessDict from '../../../../services/api/businessDict';
import { required } from '../../../../services/validation';

const initForm = {
  value: '',
  label: '',
  volume: '',
  description: '',
  isGlobal: true,
};

export const NewParameter = (props) => {
  const { fetch, setIsCreate, checkValid } = props;
  const classes = useStyles(props);
  const [form, setForm] = useState(initForm);

  const handleChange = (value, name) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = () =>
    Object.keys(form).reduce((acc, cur) => {
      if (cur === 'volume' && Number.isNaN(Number(form[cur]))) {
        return true;
      }

      if (typeof form[cur] === 'string') {
        return acc || !!required(cur.trim());
      }

      return acc || !!required(cur);
    }, false);

  const handeSaveEdit = async () => {
    try {
      const validation = checkValid(form);
      if (validation) {
        handleWarn({
          message: validation,
        });
        return;
      }
      const data = { ...form };
      await BusinessDict.parameters.save({ data });
      setIsCreate(false);
      fetch();
    } catch (error) {
      handleWarn(error);
    }
  };

  const handleCancel = () => {
    setIsCreate(false);
  };

  return (
    <TableRow className={classes.active}>
      <TableCell checkbox />
      <TableCell>
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
          value={form.volume}
          className={classes.textArea}
          spellCheck='false'
          onChange={(event) => handleChange(event.target.value, 'volume')}
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
          checked={form.isGlobal}
          onChange={(event) => handleChange(event.target.checked, 'isGlobal')}
          color='primary'
        />
      </TableCell>
      <TableCell />
      <TableCell />
    </TableRow>
  );
};
