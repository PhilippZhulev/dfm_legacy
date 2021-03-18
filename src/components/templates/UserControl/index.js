import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { SessionToken, AuthType } from 'helpers';

/**
 * Роутер с проверкой авторизованности пользователя
 * @component
 * @public
 */
function UserControl({ children, location, initSession, session }) {
  useEffect(() => {
    if (!window.toLogin) {
      initSession({});
    }
  }, []);

  return SessionToken.isEmpty() && !session.state ? (
    <Redirect
      to={{
        pathname: AuthType.isSudir() ? '/dfm_it/model' : '/dfm_it/login',
        state: { from: location },
      }}
    />
  ) : (
    children
  );
}

UserControl.propTypes = {
  initSession: PropTypes.func,
  session: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

export default UserControl;
