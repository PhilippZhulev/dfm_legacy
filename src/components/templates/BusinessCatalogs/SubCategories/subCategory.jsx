import React, { useState } from 'react';
import classNames from 'classnames';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Checkbox from '@material-ui/core/Checkbox';
import { TableRow, TableCell, Icon } from 'components';
import { handleWarn } from 'helpers';
import { useStyles } from './style';
import BusinessDict from '../../../../services/api/businessDict';

export const SubCategory = (props) => {
  const {
    subCategory,
    deleteData,
    onCheckbox,
    disabled,
    onEdit,
    setSubCategories,
    checkValid,
  } = props;
  const [form, setForm] = useState(subCategory);

  const handleChange = (value, name) => {
    setForm((prev) => ({ ...prev, [name]: value }));
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
      const res = await BusinessDict.subCategory.edit({ data });
      setSubCategories(res.data);
      onEdit(null);
    } catch (error) {
      handleWarn(error);
      setForm(subCategory);
    }
  };

  const handleCancel = () => {
    onEdit(null);
    setForm(subCategory);
  };

  /** Инициализация стилей */
  const classes = useStyles(props);

  return (
    <TableRow
      className={classNames({
        [classes.active]: !disabled,
        [classes.delete]: deleteData.has(subCategory.id),
      })}>
      <TableCell checkbox>
        <Checkbox
          onChange={(event) => onCheckbox(event, subCategory.id)}
          checked={deleteData.has(subCategory.id)}
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
            onClick={() => onEdit(subCategory)}
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
    </TableRow>
  );
};
