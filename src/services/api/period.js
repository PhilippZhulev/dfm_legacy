import { HttpTransport } from './http';

const baseUrl = 'period';

class Period {
  /**
   * Добавление локального периода
   * @param {string} model
   * @param {Array} periods
   * @returns {Promise<*>}
   * @constructor
   */
  static AddPeriods({ modelId, data }) {
    const url = `models/${modelId}/${baseUrl}`;
    return HttpTransport('POST', url, data);
  }

  static AddPeriod({ modelId, data }) {
    const url = `models/${modelId}/${baseUrl}`;
    return HttpTransport('POST', url, [data]);
  }

  /**
   * Вызов сохранения модели для обновления со стороны бэка
   * @param modelId
   * @returns {Promise<*>}
   * @constructor
   */
  static ModelSave({ modelId }) {
    const url = `models/${modelId}/save`;
    return HttpTransport('POST', url);
  }

  /**
   * Удаление локального периода/ов
   * @param {string} model
   * @param {Array} periods
   * @returns {Promise<*>}
   * @constructor
   */
  static DeletePeriods({ modelId, data }) {
    const url = `models/${modelId}/${baseUrl}`;
    return HttpTransport('DELETE', url, data);
  }
}

export default Period;
