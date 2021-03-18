import React from 'react';
import PropTypes from 'prop-types';
import { AuthType } from 'helpers';

/**
 * @mod Модификатор скрытия элемента если тип авторизации через Судир
 * @component
 * @public
 */
function ModHiddenSudir({ children }) {
  return !AuthType.isSudir() ? children : null;
}

ModHiddenSudir.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default ModHiddenSudir;
