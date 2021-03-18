import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Margin, FlexGrid, FlexGridItem } from 'components';
import { handleError } from 'helpers';

/**
 * Модалка удалить узел
 * @component
 * @public
 */
function DeleteModel({ callback }) {
  const [state, setState] = useState({ value: '' });

  /**
   * ANCHOR: Изменение состояния полей
   * @param  {} event
   * @public
   */
  const _handleChange = async (event) => {
    try {
      /** Записать состояния полей в state и callback */
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
