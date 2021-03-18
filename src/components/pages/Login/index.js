/*
 * desc: Template Логин
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextInputLogin, Button, LoginForm } from 'components';
import PropTypes from 'prop-types';
import { handleError } from 'helpers';

/**
 * Аутификация
 * @component
 * @public
 */
function Login({ dispatch, state }) {
  /** ANCHOR: Получить browser history */
  const history = useHistory();

  /** ANCHOR: Состояния */
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  /**
   * ANCHOR: Вывести ошибку в форме авторизации. Запуск анимации ошибок
   * @return {boolean}
   * @public
   */
  const _isError = (item, type) => {
    try {
      if (item && item.code === 1001 && type === 'login') {
        return true;
      }

      return item && item.code === 1002 && type === 'pass';
    } catch (e) {
      handleError('@Login/_isError', e);
      return false;
    }
  };

  /**
   * ANCHOR: Запросить авторизацию
   * @return {boolean}
   * @public
   */
  const _isLogin = async () => {
    try {
      dispatch({
        params: {
          login,
          password,
        },
        route: history,
      });
      localStorage.removeItem('locked');
    } catch (e) {
      await handleError('@Login/_isLogin', e);
    }
  };

  /**
   * ANCHOR: При вводе валидных логина и пароля
   * и нажатии клавиши "Enter" запросить авторизацию
   * @returns {boolean}
   * @private
   * @param e
   */
  const _isEnterKeyPress = (e) =>
    (e.which === 13 ? _isLogin() : false);

  /**
   * ANCHOR: Валидация заполнения
   * @public
   * @return {boolean}
   */
  const _isValid = () =>
    login.length <= 2 || password.length <= 4;

  // Рендер
  return (
    /* Обертка логина */
    <LoginForm>
      {/* Ввод логина */}
      <TextInputLogin
        label='Логин'
        onChange={(e) =>
          setLogin(e.target.value)}
        onKeyPress={_isEnterKeyPress}
        err={_isError(state, 'login')}
        type='text'
        value={login}
      />

      {/* Ввод пароля */}
      <TextInputLogin
        label='Пароль'
        onChange={(e) =>
          setPassword(e.target.value)}
        onKeyPress={_isEnterKeyPress}
        err={_isError(state, 'pass')}
        type='password'
        value={password}
      />

      {/* Кнопка запроса авторизации */}
      <Button
        onClick={_isLogin}
        disabled={_isValid()}
        position='center'
        text='ВОЙТИ'
      />
    </LoginForm>
  );
}

Login.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func,
  clearModelSearch: PropTypes.func,
};

export default Login;
