import { HttpTransport } from './http';

const baseUrl = 'metric';

class Metric {
  /**
   * Получить ресурс
   * @param {object} params
   * @public
   */
  static changeFixedTariff(resource, period) {
    const url = `${baseUrl}/${resource}/${period}`;
    return HttpTransport('GET', url);
  }

  /**
   * Отправка метрики узла модели
   * @param {string} model
   * @param {string} resource
   * @param {string} metric
   * @returns {Promise<*>}
   * @constructor
   */
  static MetricSet({ model, resource, metric }) {
    const url = `models/${model}/resources/${resource}/metrics/${metric}`;
    return HttpTransport('PUT', url);
  }

  /**
   * Удаление метрики узла модели
   * @param {string} model
   * @param {string} resource
   * @param {string} metric
   * @returns {Promise<*>}
   * @constructor
   */
  static MetricDelete({ model, resource, metric }) {
    const url = `models/${model}/resources/${resource}/metrics/${metric}`;
    return HttpTransport('DELETE', url);
  }

  /**
   * Добавление метриик
   * @param {string} model
   * @param {string} resource
   * @param {string} metric
   * @returns {Promise<*>}
   * @constructor
   */
  static AddMetrics({ modelId, data }) {
    const url = `models/${modelId}/metric`;
    return HttpTransport('POST', url, data);
  }

  static EditMetrics({ modelId, data }) {
    const url = `models/${modelId}/metric`;
    return HttpTransport('PUT', url, data);
  }

  static DeleteMetrics({ modelId, data }) {
    const url = `models/${modelId}/metric`;
    return HttpTransport('DELETE', url, data);
  }
}

export default Metric;
