import React from 'react';
import PropTypes from 'prop-types';

/**
 * Итератор предоставляемых ресурсов
 * @param {Array, Element} content что будем выводить при каждой итерации
 * @param {Array} data массив параметров узла
 * @component
 */
function ConsumedResourcesIterable({ content, data, all }) {
  return data.map((item, i) => {
    const result = <React.Fragment key={i}> {content(item)}</React.Fragment>;

    if (!all) {
      if (i <= 2) {
        return result;
      }

      return null;
    }

    return result;
  });
}

ConsumedResourcesIterable.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  data: PropTypes.array,
  all: PropTypes.bool,
};

ConsumedResourcesIterable.defaultProps = {
  content: () => {},
  data: [],
};

export default ConsumedResourcesIterable;
