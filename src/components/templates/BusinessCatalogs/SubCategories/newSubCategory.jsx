import React, { useState } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { TableRow, TableCell, Icon } from 'components';
import { handleWarn } from 'helpers';
import { useStyles } from './style';
import BusinessDict from '../../../../services/api/businessDict';
import { required } from '../../../../services/validation';

const initForm = {
  label: '',
  value: '',
};

export const NewSubCategory = (props) => {
  const { fetch, setIsCreate, checkValid } = props;
  const [form, setForm] = useState(initForm);

  const handleChange = (value, name) => {
    setForm((prev) => ({ ...prev, [name]: value }));
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
      await BusinessDict.subCategory.save({ data });
      setIsCreate(false);
      fetch();
    } catch (error) {
      handleWarn(error);
    }
  };

  const isValid = () =>
    Object.values(form).reduce((_, cur) => !!required(cur.trim()), false);

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
    </TableRow>
  );
};
