import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

/**
 * Роутер с проверкой авторизованности пользователя
 * @component
 * @public
 */
function ModelControl({ children, modelState, location }) {
  return modelState === false ? (
    <Redirect
      to={{
        pathname: '/dfm_it/model',
        state: { from: location },
      }}
    />
  ) : (
    children
  );
}

ModelControl.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  location: PropTypes.object,
  modelState: PropTypes.bool,
};

export default ModelControl;
