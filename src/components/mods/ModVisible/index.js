import React from 'react';
import PropTypes from 'prop-types';

/**
 * @mod Модификатор полномочий
 * @param {element} children
 * @param {boolean} isView
 * @component
 * @public
 */
function ModVisible({ children, isView }) {
  return isView ? children : null;
}

ModVisible.propTypes = {
  isView: PropTypes.bool,
  children: PropTypes.element,
};

export default ModVisible;
