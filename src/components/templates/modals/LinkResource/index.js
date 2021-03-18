import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Margin, FlexGrid, FlexGridItem, SingleSelect } from 'components';
import { handleError } from 'helpers';

function LinkResource({
  callback,
  models,
  resources,
  dispatchModelList,
  dispatchResourceList,
  select,
}) {
  const [state, setState] = useState({
    model: {
      label: '',
      value: '',
    },
    resource: {
      label: '',
      value: '',
    },
  });

  useEffect(() => {
    dispatchModelList({});
  }, []);

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
        select,
      });

      if (type === 'model') {
        dispatchResourceList({ params: { model: value.value } });
      }
    } catch (e) {
      handleError('@AddResource/_handleChange', e);
    }
  };

  return (
    <Margin bottom={25} top={-15}>
      <FlexGrid style={{ width: 420 }}>
        <FlexGridItem padding={'0 15px 0 0'} width={'50%'}>
          <SingleSelect
            label={'Модель-источник'}
            width={'100%'}
            options={models}
            selected={state.model}
            onChange={(val) => _handleChange('model', val)}
          />
        </FlexGridItem>
        <FlexGridItem width={'50%'}>
          <SingleSelect
            label={'Родительский узел'}
            width={'100%'}
            noOptionsMessage={
              state.model.value === ''
                ? 'Нужно выбрать Модель-источник'
                : 'Выбирете ресурс'
            }
            options={resources}
            selected={state.resource}
            onChange={(val) => _handleChange('resource', val)}
          />
        </FlexGridItem>
      </FlexGrid>
    </Margin>
  );
}

LinkResource.propTypes = {
  callback: PropTypes.func.isRequired,
  models: PropTypes.array.isRequired,
  resources: PropTypes.array.isRequired,
  dispatchModelList: PropTypes.func.isRequired,
  dispatchResourceList: PropTypes.func.isRequired,
  select: PropTypes.string.isRequired,
};

export default LinkResource;
