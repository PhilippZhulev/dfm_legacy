import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  Margin,
  FlexGrid,
  FlexGridItem,
  SingleSelect,
} from 'components';
import { handleError } from 'helpers';

function AddResource({ callback, category, model }) {
  const [state, setState] = useState({
    name: '',
    category: {
      label: '',
      value: '',
    },
  });

  /**
   * Изменение состояния полей
   * @param  {object} event
   * @public
   */
  const _handleChange = async (type, value) => {
    try {
      setState({
        ...state,
        [type]: value,
      });
      callback({
        ...state,
        [type]: value,
        model,
      });
    } catch (e) {
      handleError('@AddResource/_handleChange', e);
    }
  };

  return (
    <Margin bottom={25} top={-15}>
      <FlexGrid style={{ width: 420 }}>
        <FlexGridItem padding={'0 15px 0 0'} width={'50%'}>
          <TextInput
            label={'Название узла'}
            type={'text'}
            onChange={(e) => _handleChange('name', e.target.value)}
            value={state.name}
          />
        </FlexGridItem>
        <FlexGridItem width={'50%'}>
          <SingleSelect
            label={'Блок'}
            width={'100%'}
            options={category}
            selected={state.category}
            onChange={(val) => _handleChange('category', val)}
          />
        </FlexGridItem>
      </FlexGrid>
    </Margin>
  );
}

AddResource.propTypes = {
  callback: PropTypes.func.isRequired,
  category: PropTypes.array.isRequired,
  model: PropTypes.string.isRequired,
};

export default AddResource;
