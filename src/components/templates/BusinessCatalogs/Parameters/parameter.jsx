import React, { useState } from 'react';
import classNames from 'classnames';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Checkbox from '@material-ui/core/Checkbox';
import { TableRow, TableCell, Icon } from 'components';
import { handleWarn } from 'helpers';
import { useStyles } from './style';
import BusinessDict from '../../../../services/api/businessDict';

export const Parameter = (props) => {
  const {
    parameter,
    disabled,
    onCheckbox,
    deleteData,
    onEdit,
    setParameters,
    checkValid,
  } = props;
  const [form, setForm] = useState(parameter);
  /** Инициализация стилей */
  const classes = useStyles(props);

  const handleChange = (value, name) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    onEdit(null);
    setForm(parameter);
  };

  const handleSave = async () => {
    try {
      const validation = checkValid(form);
      if (validation) {
        handleWarn({
          message: validation,
        });
        return;
      }
      const data = { ...form };
      const res = await BusinessDict.parameters.edit({ data });
      setParameters(res.data);
      onEdit(null);
    } catch (error) {
      handleWarn(error);
      setForm(parameter);
    }
  };

  return (
    <TableRow
      className={classNames({
        [classes.active]: !disabled,
        [classes.delete]: deleteData.has(parameter.id),
      })}>
      <TableCell checkbox>
        <Checkbox
          onChange={(event) => onCheckbox(event, parameter.id)}
          checked={deleteData.has(parameter.id)}
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
            onClick={() => onEdit(parameter)}
            inline
          />
        ) : (
          <>
            <Icon
              size={24}
              icon='CHECK'
              className={classes.edit}
              fillColor='transparent'
              onClick={handleSave}
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
        <TextareaAutosize
          value={form.volume}
          className={classes.textArea}
          spellCheck='false'
          disabled={disabled}
          onChange={(event) => handleChange(event.target.value, 'volume')}
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
      <TableCell>{parameter.authorFullName}</TableCell>
      <TableCell>{parameter.modelName}</TableCell>
    </TableRow>
  );
};
