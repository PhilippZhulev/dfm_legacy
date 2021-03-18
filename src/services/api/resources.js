import { HttpTransport } from './http';

const baseUrl = 'resources';

/**
 * @class
 */
class Resources {
  /**
   * Получить ресурс
   * @param {object} params
   * @public
   */
  static async getResource(params) {
    const url = `resources/${params.model}/${params.resource}/${params.period}`;
    return HttpTransport('GET', url);
  }

  /**
   * @param  {object} params
   */
  static async createResource(params) {
    const url = `models/${params.model}/resources/${params.id}`;
    const body = params.body ? JSON.stringify(params.body) : null;
    return HttpTransport('PUT', url, body);
  }

  /**
   * @param  {object} params
   */
  static async removeResource(params) {
    const url = `models/${params.model}/resources/${params.resource}`;
    return HttpTransport('DELETE', url);
  }

  /**
   * @param  {object} params
   */
  static async resourceList(params) {
    const url = `models/${params.model}/resources`;
    return HttpTransport('GET', url);
  }

  /**
   * @param  {object} params
   */
  static async copyResource(params) {
    const url = `models/${params.model}/resources/${params.id}/copy`;
    return HttpTransport('POST', url, params.body);
  }

  /**
   * @param  {object} params
   */
  static async linkResource(params) {
    const url = `models/${params.model}/resources/${params.select}/links`;
    return HttpTransport('PUT', url, params.body);
  }

  /**
   * @param  {object} params
   */
  static async groupResource(params) {
    const url = `models/${params.model}/resources/${params.select}/aggregate`;
    return HttpTransport('PUT', url, params.body);
  }

  /**
   * Получить параметры категорий
   * @param {object} params
   * @public
   */
  static getResourceCategoryParams(resource, period, categoryId) {
    const url = `${baseUrl}/category/${resource}/${period}/${categoryId}`;
    return HttpTransport('GET', url);
  }

  /**
   * Получить параметры категорий
   * @param {object} params
   * @public
   */
  static getParentInfoNode(params) {
    const url = `models/${params.modelId}/resources/${params.resourceId}`;
    return HttpTransport('GET', url);
  }
}

export default Resources;
