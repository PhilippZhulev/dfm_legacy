// Зависимости
import { HttpTransport } from './http';

/**
 * Первичные запросы
 * @class
 * @public
 */
class Permissions {
  /**
   * Get User profile
   * @param {object} params
   * @public
   */
  static async createAll(data) {
    return HttpTransport('POST', 'systems/permission/list', data);
  }

  static async updateAll(data) {
    return HttpTransport('PUT', 'systems/permission/list', data);
  }
}

export default Permissions;
