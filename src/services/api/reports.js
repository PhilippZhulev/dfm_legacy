import { HttpTransport } from './http';

export default class Reports {
  /**
   * Отчет Структура ТСО
   * @param modelId
   * @param resourceId
   * @param periodId
   * @returns {Promise<*>}
   * @constructor
   */
  static RootCause({ modelId, resourceId, periodId }) {
    const url = `models/${modelId}/resource/${resourceId}/period/${periodId}/report/rootCause`;
    return HttpTransport('GET', url);
  }

  /**
   * Отчет Структура модели
   * @param modelId
   * @returns {Promise<*>}
   * @constructor
   */
  static BusinessOverview({ modelId }) {
    const url = `models/${modelId}/report/businessOverview`;
    return HttpTransport('GET', url);
  }
}
