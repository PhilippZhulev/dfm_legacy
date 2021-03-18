
/**
* Тип аутификации
* @class
* @public
*/
class AuthType {
  /**
   * Проверка типа авторизации через СУДИР
   * @returns {boolean}
   */
  static isSudir() {
    return Number(process.env.REACT_APP_AUTH_SUDIR) === 1;
  }
}

export default AuthType;
