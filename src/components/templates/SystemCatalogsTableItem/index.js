/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import SelectItem from './selectItem';
import StringItem from './stringItem';
import BooleanItem from './booleanItem';
import MultiselectItem from './multiselectItem';
import ColorItem from './colorItem';
import DateItem from './dateItem';

/**
 * Элемент таблицы системых справочников
 * @component
 * @public
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
function SystemCatalogsTableItem(props) {
  const { type } = props;
  return (
    <>
      {type === 'boolean' && <BooleanItem {...props} />}
      {type === 'select' && <SelectItem {...props} />}
      {type === 'multiselect' && <MultiselectItem {...props} />}
      {type === 'string' && <StringItem {...props} />}
      {type === 'color' && <ColorItem {...props} />}
      {type === 'date' && <DateItem {...props} />}
    </>
  );
}

SystemCatalogsTableItem.defaultProps = {
  type: null,
};

SystemCatalogsTableItem.propTypes = {
  type: PropTypes.string,
};

export default SystemCatalogsTableItem;
