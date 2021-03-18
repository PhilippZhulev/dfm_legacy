import { HttpTransport } from './http';

const baseUrl = 'guide';

/**
 * Справочники
 * @class
 * @public
 */
class Guide {
  /**
   * Получить категории
   * @param {object} params
   * @public
   */
  static getCategories() {
    const url = `${baseUrl}/categories`;
    return HttpTransport('GET', url);
  }

  /**
   * Получить периоды
   * @public
   */
  static getPeriods() {
    const url = `${baseUrl}/periods`;
    return HttpTransport('GET', url);
  }

  /**
   * Получить периоды
   * @public
   */
  static getParameters() {
    const url = `${baseUrl}/parameters`;
    return HttpTransport('GET', url);
  }

  /**
   * Получить периоды
   * @public
   */
  static getMetrics() {
    const url = `${baseUrl}/metrics`;
    return HttpTransport('GET', url);
  }

  /**
   *  Сохранить справочник
   * @param  {object} params
   */
  static async save({ model, type, body }) {
    try {
      const url = `models/${model}/${type || []}`;
      return HttpTransport('POST', url, body);
    } catch (e) {
      return { code: 400 };
    }
  }
}

export default Guide;
