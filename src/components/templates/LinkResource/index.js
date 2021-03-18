import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Margin, FlexGrid, FlexGridItem, SingleSelect } from 'components';
import { handleError } from 'helpers';

/**
 * Линковать ресурс
 * @component
 * @public
 */
const LinkResource = React.memo(
  ({
    callback,
    models,
    resources,
    dispatchModelList,
    dispatchResourceList,
    select,
    period,
    resource,
    model,
    linkModel,
    linkResource,
  }) => {
    /** ANCHOR: Состояния */
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

    /** ANCHOR: Получить список моделей */
    useEffect(() => {
      dispatchModelList({});
    }, []);

    /** ANCHOR: Выбираем значение для модели по умолчанию */
    useEffect(() => {
      if (linkModel) {
        _handleChange('model', linkModel);
      }
    }, [linkModel]);

    /** ANCHOR: Выбираем значение для узла по умолчанию */
    useEffect(() => {
      if (linkResource) {
        _handleChange('resource', linkResource);
      }
    }, [linkResource]);

    /**
     * ANCHOR: Изменение состояния полей
     * @param  {string} type
     * @param  {object} value
     * @public
     */
    const _handleChange = async (type, value) => {
      try {
        /** Записать состояния полей в state и callback */
        setState((prevState) => ({
          ...prevState,
          [type]: value,
        }));

        callback({
          ...state,
          [type]: value,
          select,
          period,
          thisResource: resource,
          thisModel: model,
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
);

LinkResource.displayName = 'LinkResource';

LinkResource.propTypes = {
  callback: PropTypes.func.isRequired,
  models: PropTypes.array.isRequired,
  resources: PropTypes.array.isRequired,
  dispatchModelList: PropTypes.func.isRequired,
  dispatchResourceList: PropTypes.func.isRequired,
  select: PropTypes.string.isRequired,
  period: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  model: PropTypes.string.isRequired,
  linkModel: PropTypes.object,
  linkResource: PropTypes.object,
};

export default LinkResource;
