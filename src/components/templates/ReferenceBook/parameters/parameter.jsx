import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { handleWarn, SciNotation } from 'helpers';
import { TableRow, TableCell, Icon, ModelRecalc } from 'components';
import { useStyles } from './parameters';
import { virualStore } from '../../../../virtualStore';
import { LocalParamsApi } from '../../../../services/api/globalLocalParams';
import {
  isNodeParametersNotValid,
  isParametersNotValid,
} from '../../../../services/validation/reference';

export const Parameter = (props) => {
  const {
    parameter,
    onCheckbox,
    deleteData,
    disabled = true,
    allowed = true,
    saveDump,
    onEdit,
    setParameters,
  } = props;
  /** Инициализация стилей */
  const classes = useStyles(props);
  const [form, setForm] = useState(parameter);
  const [recalcView, setRecalcView] = useState(false);

  const handleChange = (value, name) => {
    let findValue = value;

    if (name === 'volume') {
      findValue = value.match(/-?\d+(\.\d{0,})?/g);
      findValue = findValue ? findValue[0] : '';
    }

    setForm((prev) => ({
      ...prev,
      [name]: findValue,
    }));
  };

  const handleSave = async () => {
    const { model } = virualStore;

    try {
      const msg = isParametersNotValid(form);
      if (msg) {
        throw new Error(msg);
      }
      const data = [{ ...form }];
      const res = await LocalParamsApi.Edit({
        modelId: model.value,
        data,
      });
      onEdit(null);

      const parametersData = res.data.map((param) => ({
        ...param,
        volume: SciNotation.toFixed(param.volume),
      }));
      saveDump(parametersData);
      setParameters(parametersData);
      setRecalcView(false);
    } catch (error) {
      handleWarn(error);
      // setForm(parameter);
    }
  };

  const handleCancel = () => {
    onEdit(null);
    setForm(parameter);

    setRecalcView(false);
  };

  const handleModalRecalcOpen = () => {
    setRecalcView(true);
  };

  const handleModalRecalcCancel = () => {
    setRecalcView(false);
  };

  return (
    <>
      <TableRow>
        <TableCell checkbox>
          {!parameter.isGlobal && allowed && (
            <Checkbox
              onChange={(event) => onCheckbox(event, parameter.id)}
              checked={deleteData.has(parameter.id)}
              color='primary'
            />
          )}
        </TableCell>
        <TableCell>
          {disabled && !parameter.isGlobal && allowed && (
            <Icon
              icon='EDIT_FORM'
              size={20}
              className={classes.edit}
              fillColor='transparent'
              onClick={() => onEdit(parameter)}
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
                onClick={
                  isNodeParametersNotValid(form)
                    ? handleSave
                    : handleModalRecalcOpen
                }
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
            value={form.description}
            className={classes.textArea}
            spellCheck='false'
            disabled={disabled}
            onChange={(event) =>
              handleChange(event.target.value, 'description')
            }
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
      </TableRow>

      <ModelRecalc
        show={recalcView}
        onSave={handleSave}
        onCancel={handleModalRecalcCancel}></ModelRecalc>
    </>
  );
};
