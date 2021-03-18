import React, { useState } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Checkbox from '@material-ui/core/Checkbox';
import { TableRow, TableCell, Icon } from 'components';
import { handleWarn } from 'helpers';
import { useStyles } from './style';
import NodeParameters from '../../../../services/api/nodeParameters';
import { virualStore } from '../../../../virtualStore';
import { isNodeParametersNotValid } from '../../../../services/validation/reference';

const initForm = {
  value: '',
  label: '',
  volume: '',
  description: '',
};

export const NewNodeParameter = (props) => {
  const classes = useStyles(props);
  const [form, setForm] = useState(initForm);
  const { setIsCreate, resource, setParameters, saveDump } = props;

  const handleChange = (value, name) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      const msg = isNodeParametersNotValid(form);
      if (msg) {
        throw new Error(msg);
      }

      const { model } = virualStore;
      const res = await NodeParameters.createParameterInNode({
        modelId: model.value,
        nodeId: resource,
        data: form,
      });
      // TODO Костыль по умолчанию должно быть [] а не null
      setParameters(res.data.nodeParameters || []);
      saveDump(res.data.nodeParameters || []);
      setIsCreate(false);
    } catch (error) {
      handleWarn(error);
    }
  };

  const handleCancel = () => setIsCreate(false);

  return (
    <TableRow className={classes.active}>
      <TableCell>
        <Icon
          size={24}
          icon='CHECK'
          className={classes.edit}
          fillColor='transparent'
          onClick={handleSaveEdit}
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
    </TableRow>
  );
};
