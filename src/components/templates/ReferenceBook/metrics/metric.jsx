import React, { useState } from 'react';
import classNames from 'classnames';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Checkbox from '@material-ui/core/Checkbox';
import { TableRow, TableCell, Icon, MultiSelect } from 'components';
import { handleWarn } from 'helpers';
import { useStyles } from '../metrics';
import * as APIMetric from '../../../../services/api/metric';
import { virualStore } from '../../../../virtualStore';

export const Metric = (props) => {
  const {
    metric,
    deleteData,
    onCheckbox,
    disabled = true,
    allowed = true,
    categories,
    onEdit,
    id,
    mapCat,
    saveDump,
    setMetrics,
  } = props;
  const [form, setForm] = useState(metric);

  const handleChange = (value, name) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handeSaveEdit = async () => {
    const { model } = virualStore;

    try {
      const data = [{ ...form }];
      const res = await APIMetric.default.EditMetrics({
        modelId: model.value,
        data,
      });
      onEdit(null);
      saveDump(res.data);
      setMetrics(res.data);
    } catch (error) {
      handleWarn(error);
      setForm(metric);
    }
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
        [classes.delete]: deleteData.has(id),
      })}>
      <TableCell checkbox>
        {!metric.isGlobal && allowed && (
          <Checkbox
            onChange={(event) => onCheckbox(event, id)}
            checked={deleteData.has(id)}
            color='primary'
          />
        )}
      </TableCell>
      <TableCell>
        {disabled && !metric.isGlobal && allowed && (
          <Icon
            icon='EDIT_FORM'
            size={20}
            className={classes.edit}
            fillColor='transparent'
            onClick={() => onEdit(metric)}
            inline
          />
        )}
        {!disabled && (
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
          selected={form.cats.map((cat) => mapCat[cat])}
          options={categories}
          isDisabled={disabled}
          onChange={(values) =>
            handleChange(
              values.map((cat) => cat.value),
              'cats'
            )
          }
          classes={{
            root: classes.multiSelectRoot,
            selectedValue: classNames({ disabled }),
          }}
        />
      </TableCell>
    </TableRow>
  );
};
