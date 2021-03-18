/*
* desc: DFM API Класс для работы с токеном авторизации
* type: class
* ver: 2.0.0
* Copyright(c) Heavy mouse team.
*
* voids:
* isEmpty
* get
* set
* remove
*/

import AuthType from './AuthType';

const TOKEN_NAME = 'DFM_TOKEN';

class SessionToken {
  /**
   * Проверка наличия токена авторизации
   * @returns {boolean}
   */
  static isEmpty() {
    return sessionStorage.getItem(TOKEN_NAME) === null && !AuthType.isSudir();
  }

  /**
   * Получаем токена авторизации
   * @returns {string}
   */
  static getItem(token = '') {
    if (sessionStorage.getItem(TOKEN_NAME) !== null) {
      return sessionStorage.getItem(TOKEN_NAME);
    }

    return token;
  }

  /**
   * Сохраняем токен авторизации
   * @param value
   */
  static setItem(value) {
    sessionStorage.setItem(TOKEN_NAME, value);
  }

  /**
   * Удалить токен авторизации
   */
  static removeItem() {
    sessionStorage.removeItem(TOKEN_NAME);
  }
}

export default SessionToken;
