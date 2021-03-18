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
/**
 * Добавить ресурс (модальное окно)
 * @component
 * @public
 */
function AddResource({ callback, category, model, period, resource }) {
  /** ANCHOR: Изменение состояния полей */
  const [state, setState] = useState({
    name: '',
    category: {
      label: '',
      value: '',
    },
  });

  /**
   * ANCHOR: Изменение состояния полей
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
        period,
        resource,
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
            label={'Категория'}
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
  period: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
};

export default AddResource;
