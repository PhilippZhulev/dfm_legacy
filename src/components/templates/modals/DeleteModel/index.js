import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Margin, FlexGrid, FlexGridItem } from 'components';
import { handleError } from 'helpers';

/**
 * @param  {} callback
 */
function DeleteModel({ callback }) {
  const [state, setState] = useState({ value: '' });

  /**
   * @param  {} event
   */
  const _handleChange = async (event) => {
    try {
      setState({
        ...state,
        value: event.target.value,
      });
      callback({ value: event.target.value });
    } catch (e) {
      handleError('@DeleteModel/_handleChange', e);
    }
  };

  return (
    <Margin bottom={25} top={-15}>
      <FlexGrid style={{ width: 350 }}>
        <FlexGridItem width={'100%'}>
          <TextInput
            label={'Название модели'}
            type={'text'}
            onChange={(e) => _handleChange(e)}
            value={state.value}
          />
        </FlexGridItem>
      </FlexGrid>
    </Margin>
  );
}

DeleteModel.propTypes = { callback: PropTypes.func.isRequired };

export default DeleteModel;
