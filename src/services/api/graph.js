// Зависимости
import { HttpTransport } from './http';

/**
 * Граф api
 * @class
 * @public
 */
class Graph {
  /**
   * Получить параметры графа
   * @param {object} params
   * @public
   */
  static async GetGraphData(params) {
    const url = `models/${params.model}/${params.period}/graph`;
    return HttpTransport('GET', url);
  }
}

export default Graph;
