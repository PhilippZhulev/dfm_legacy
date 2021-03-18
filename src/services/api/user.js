// Зависимости
import { HttpTransport } from './http';

/**
 * Первичные запросы
 * @class
 * @public
 */
class User {
  /**
   * Get User profile
   * @param {object} params
   * @public
   */
  static async GetSession(params) {
    return HttpTransport('GET', 'systems/auth');
  }

  /**
   * Get User Permissions
   * @param {object} params
   * @public
   */
  static async GetPermissions(params) {
    return HttpTransport('GET', 'systems/auth/permissions');
  }

  static async getAllUser(params) {
    return HttpTransport('GET', 'systems/user', null, null, params.query || null);
  }

  static async getUserPermissionsById(id) {
    return HttpTransport('GET', `systems/user/${id}/permissions`);
  }

  static async getUserById(id) {
    return HttpTransport('GET', `systems/user/${id}`);
  }

  /**
   * Logout user
   * @public
   */
  static async Logout() {
    return HttpTransport('POST', 'logout');
  }
}

export default User;
