import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Margin, FlexGrid, FlexGridItem } from 'components';
import { handleError } from 'helpers';

function RemoveResource({ callback, resource, model }) {
  const [state, setState] = useState({ value: '' });

  /**
   * Изменение состояния поля
   * @param  {object} event
   * @public
   */
  const _handleChange = async (event) => {
    try {
      setState({
        ...state,
        value: event.target.value,
      });
      callback({
        value: event.target.value,
        resource,
        model,
      });
    } catch (e) {
      handleError('@RemoveResource/_handleChange', e);
    }
  };

  return (
    <Margin bottom={25} top={-15}>
      <FlexGrid style={{ width: 350 }}>
        <FlexGridItem width={'100%'}>
          <TextInput
            label={'Введите название узла'}
            type={'text'}
            onChange={(e) => _handleChange(e)}
            value={state.value}
          />
        </FlexGridItem>
      </FlexGrid>
    </Margin>
  );
}

RemoveResource.propTypes = {
  callback: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
};

export default RemoveResource;
