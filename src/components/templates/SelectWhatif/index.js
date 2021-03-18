import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Margin, FlexGrid, FlexGridItem, SingleSelect } from 'components';
import { handleError } from 'helpers';

/**
 * Выбрать модель Whatif (модальное окно)
 * @component
 * @public
 */
function SelectWhatif({ callback, variants }) {
  const [selectList, setSelectList] = useState([]);
  const [selected, setSelected] = useState({ value: '', label: '' });

  /**
   * ANCHOR: Изменение состояния полей
   * @param  {object} event
   * @public
   */
  const _handleChange = (value) => {
    try {
      setSelected(value);
      callback(value);
    } catch (e) {
      handleError('@SelectWhatif/_handleChange', e);
    }
  };

  useEffect(() => {
    const variantsList = variants.map((item) => ({
      value: item.value,
      label: item.label,
    }));
    setSelectList(variantsList);
  }, [variants]);

  return (
    <Margin bottom={25} top={-15}>
      <FlexGrid style={{ width: 320 }}>
        <FlexGridItem width={'100%'}>
          <SingleSelect
            label={''}
            width={'100%'}
            options={selectList}
            selected={selected}
            onChange={(val) => _handleChange(val)}
          />
        </FlexGridItem>
      </FlexGrid>
    </Margin>
  );
}

SelectWhatif.propTypes = {
  callback: PropTypes.func.isRequired,
  variants: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default SelectWhatif;
