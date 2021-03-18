import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { TableRow, TableCell, Icon, ModelRecalc } from 'components';
import { handleWarn } from 'helpers';
import { useStyles } from './style';
import NodeParameters from '../../../../services/api/nodeParameters';
import { virualStore } from '../../../../virtualStore';
import { isNodeParametersNotValid } from '../../../../services/validation/reference';

// TODO: Добавить возможность редактирования полей после изменения запроса

export const NodeParameter = (props) => {
  const {
    parameter,
    disabled,
    onCheckbox,
    deleteData,
    onEdit,
    resource,
    setParameters,
    saveDump,
    allowed,
    cancel,
  } = props;
  const [form, setForm] = useState(parameter);
  const [cancelled, setCancelled] = useState(cancel);
  const [recalcView, setRecalcView] = useState(false);

  /** Инициализация стилей */
  const classes = useStyles(props);

  const handleChange = (value, name) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setCancelled(cancel);
    onEdit(null);
    setForm(parameter);

    setRecalcView(false);
  };

  useEffect(() => {
    if (disabled && cancelled !== cancel) {
      setCancelled(cancel);
      setForm(parameter);
      setRecalcView(false);
    }
  }, [disabled]);

  const handleSave = async () => {
    try {
      const msg = isNodeParametersNotValid(form);
      if (msg) {
        throw new Error(msg);
      }

      const { model } = virualStore;
      const res = await NodeParameters.updateVolume({
        modelId: model.value,
        nodeId: resource,
        data: form,
      });
      // TODO Костыль При редактировании параметра узла возвращать список параметров узлов или сам узел
      const node = model.resources.find(({ value }) => value === resource);
      if (node.nodeParameters) {
        node.nodeParameters.forEach((param, index) => {
          if (param.value === res.data.value) {
            node.nodeParameters[index] = res.data;
          }
        });
      }
      // TODO Костыль по умолчанию должно быть [] а не null
      setParameters(node.nodeParameters || []);
      saveDump(node.nodeParameters || []);
      onEdit(null);
      setRecalcView(false);
    } catch (error) {
      handleWarn(error);
      // setForm(parameter);
    }
  };

  const handleDelete = async () => {
    const { model } = virualStore;
    try {
      const res = await NodeParameters.deleteParameterFromNode({
        modelId: model.value,
        nodeId: resource,
        parameter: parameter.value,
      });
      setParameters(res.data.nodeParameters || []);
      saveDump(res.data.nodeParameters || []);
    } catch (error) {
      handleWarn(error);
    }
  };

  const handleModalRecalcOpen = () => {
    setRecalcView(true);
  };

  const handleModalRecalcCancel = () => {
    setRecalcView(false);
  };

  return (
    <>
      <TableRow
        className={classNames({
          [classes.active]: !disabled,
          [classes.delete]: deleteData.has(parameter.id),
        })}>
        <TableCell>
          {disabled ? (
            <>
              {allowed && (
                <>
                  <Icon
                    icon='EDIT_FORM'
                    size={20}
                    className={classes.edit}
                    fillColor='transparent'
                    onClick={() => onEdit(parameter)}
                    inline
                  />
                  <Icon
                    icon='DELETE_2'
                    size={20}
                    className={classes.edit}
                    fillColor='transparent'
                    onClick={() => handleDelete()}
                    inline
                  />
                </>
              )}
            </>
          ) : (
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
          {/* <TextareaAutosize
          value={form.value}
          className={classes.textArea}
          spellCheck='false'
          disabled={true}
          onChange={(event) => handleChange(event.target.value, 'value')}
        /> */}
          {form.value}
        </TableCell>
        <TableCell>
          {/* <TextareaAutosize
          value={form.label}
          className={classes.textArea}
          spellCheck='false'
          disabled={true}
          onChange={(event) => handleChange(event.target.value, 'label')}
        /> */}
          {form.label}
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
          {/* <TextareaAutosize
          value={form.description}
          className={classes.textArea}
          spellCheck='false'
          disabled={true}
          onChange={(event) => handleChange(event.target.value, 'description')}
        /> */}
          {form.description}
        </TableCell>
      </TableRow>

      <ModelRecalc
        show={recalcView}
        onSave={handleSave}
        onCancel={handleModalRecalcCancel}></ModelRecalc>
    </>
  );
};
