// Зависимости
import { HttpTransport } from './http';

/**
 * Первичные запросы
 * @class
 * @public
 */
class Login {
  /**
   * LOGIN
   * @param {object} params
   * @public
   */

  static json = 'application/json';

  /**
   * Авторизация пользователя
   * @param  {object} params
   */
  static async AuthUser(params) {
    const headers = {
      Accept: Login.json,
      'Content-Type': Login.json,
      Authorization: `Basic ${btoa(`${params.login}:${params.password}`)}`,
    };
    return HttpTransport('POST', 'login', null, headers);
  }
}

export default Login;
