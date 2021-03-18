import React, { useState, useEffect } from 'react';
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
 * Модалка копировать узел
 * @component
 * @public
 */
function CopyResource({
  callback,
  models,
  resources,
  resource,
  period,
  model,
  dispatchModelList,
  dispatchResourceList,
  resourcesListSuccesed,
  cat,
}) {
  const [state, setState] = useState({
    name: '',
    model: {
      label: '',
      value: '',
    },
    resource: {
      label: '',
      value: '',
    },
  });

  /** ANCHOR: Варианты выбора согласно категории */
  const options = resources.filter((curResource) =>
    curResource.category?.includes(cat)
  );

  /** ANCHOR: Текст сообщения */
  const text = options.length
    ? 'Выберите ресурс'
    : 'Нет узлов для данной категории';

  /** ANCHOR: Получить список моделей */
  useEffect(() => {
    dispatchModelList({});
    resourcesListSuccesed({ resources: [] });
  }, []);

  /**
   * ANCHOR: Изменение состояния полей
   * @param  {string} type
   * @param  {object} value
   * @public
   */
  const _handleChange = async (type, value) => {
    try {
      const stateParams = {
        ...state,
        [type]: value,
      };

      /** Получить название ресурса */
      if (type === 'resource') {
        stateParams.name = value.label;
      }

      /** Записать состояния полей в state и callback */
      setState(stateParams);

      callback({
        ...stateParams,
        thisModel: model,
        thisResource: resource,
        period,
      });

      /** Получить список ресурсов */
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
            label={'Копируемый узел'}
            width={'100%'}
            noOptionsMessage={
              state.model.value === '' ? 'Нужно выбрать Модель-источник' : text
            }
            options={options}
            selected={state.resource}
            onChange={(val) => _handleChange('resource', val)}
          />
        </FlexGridItem>
        <FlexGridItem padding={'15px 15px 0 0'} width={'50%'}>
          <TextInput
            label={'Новое название узла'}
            type={'text'}
            onChange={(e) => _handleChange('name', e.target.value)}
            value={state.name}
          />
        </FlexGridItem>
      </FlexGrid>
    </Margin>
  );
}

CopyResource.propTypes = {
  callback: PropTypes.func.isRequired,
  models: PropTypes.array.isRequired,
  resources: PropTypes.array.isRequired,
  dispatchModelList: PropTypes.func.isRequired,
  dispatchResourceList: PropTypes.func.isRequired,
  resourcesListSuccesed: PropTypes.func.isRequired,
  resource: PropTypes.object.isRequired,
  period: PropTypes.object.isRequired,
  model: PropTypes.string.isRequired,
  cat: PropTypes.string.isRequired,
};

export default CopyResource;
