import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Margin,
  FlexGrid,
  FlexGridItem,
  MultiSelect,
  TextInput,
} from 'components';
import { handleError } from 'helpers';

/**
 * Группировать ресурсы
 * @component
 * @public
 */
function GroupResource({
  callback,
  resources,
  dispatchResourceList,
  model,
  period,
  selectResource,
  select,
}) {
  const [state, setState] = useState({
    name: '',
    resources: [],
  });

  /** ANCHOR: Получить список ресурсов */
  useEffect(() => {
    dispatchResourceList({ params: { model } });
  }, []);

  /** ANCHOR: Выводить список ресурсов агрегированных в группе */
  useEffect(() => {
    setState({ ...state, resources: [...select] });
  }, [select]);

  /**
   * ANCHOR: Изменение состояния полей
   * @param type
   * @param value
   * @returns {Promise<void>}
   * @private
   */
  const _handleChange = async (type, value) => {
    try {
      /** Записать состояния полей в state и callback */
      setState({
        ...state,
        [type]: value,
      });
      callback({
        ...state,
        [type]: value,
        model,
        select: selectResource.group === true ? selectResource.value : null,
        thisResource: {
          value: selectResource.value,
          label: selectResource.label,
        },
        period,
      });
    } catch (e) {
      handleError('@AddResource/_handleChange', e);
    }
  };

  return (
    <Margin bottom={25} top={-15}>
      <FlexGrid style={{ width: 420 }}>
        {selectResource.group === false && (
          <FlexGridItem padding={'0 15px 0 0'} width={'50%'}>
            <TextInput
              label={'Название группы'}
              type={'text'}
              onChange={(e) => _handleChange('name', e.target.value)}
              value={state.name}
            />
          </FlexGridItem>
        )}
        <FlexGridItem width={selectResource.group === false ? '50%' : '100%'}>
          <MultiSelect
            label={'Добавить ресурсы'}
            width={'100%'}
            noOptionsMessage={'Выбирете ресурс'}
            options={resources}
            selected={state.resources}
            onChange={(val) => _handleChange('resources', val)}
          />
        </FlexGridItem>
      </FlexGrid>
    </Margin>
  );
}

GroupResource.propTypes = {
  callback: PropTypes.func.isRequired,
  resources: PropTypes.array.isRequired,
  dispatchResourceList: PropTypes.func.isRequired,
  model: PropTypes.string.isRequired,
  select: PropTypes.array.isRequired,
  selectResource: PropTypes.object.isRequired,
  period: PropTypes.object.isRequired,
};

export default GroupResource;
