// Зависимости
import { handlePreload } from 'helpers';
import { HttpTransport } from './http';

const baseUrl = 'models';
/**
 * Первичные запросы
 * @class
 * @public
 */
class Model {
  /**
   * @param  {object} params
   */
  static async GetModelList(params) {
    if (params.url === 'models') {
      handlePreload({ message: 'Загрузка моделей...', bg: false });
    } else if (params.url === 'blocks') {
      handlePreload({ message: 'Загрузка Блоков...', bg: false });
    } else {
      handlePreload({ message: 'Загрузка этапов...', bg: false });
    }
    return HttpTransport('GET', params.url);
  }

  /**
   * @param  {object} params
   */
  static async CopyModel(params) {
    const url = `${baseUrl}/${params.name}/copy`;
    return HttpTransport('POST', url, params.data);
  }

  /**
   * @param  {object} params
   */
  static async DeleteModel(params) {
    const url = `${baseUrl}/${params.name}`;
    return HttpTransport('DELETE', url);
  }

  /**
   * @param  {object} params
   */
  static async CreateModel(params) {
    const url = `${baseUrl}/${params.name}`;
    return HttpTransport('PUT', url, params.data);
  }

  /**
  * @param  {object} params
  */
  static async CreateWhatIfModel(params) {
    const url = `${baseUrl}/whatif`;
    return HttpTransport('POST', url, params.data);
  }

  /**
   * @param  {object} params
   */
  static async SelectModel(params) {
    const url = `${baseUrl}/${params.model}`;
    return HttpTransport('GET', url);
  }

  /**
   * @param  {object} params
   */
  static async ModelFavorite(params) {
    const postfix = params.status ? 'like' : 'unlike';
    const url = `${baseUrl}/${params.id}/${postfix}`;
    return HttpTransport('POST', url);
  }

  /**
   * @param  {object} params
   */
  static async ModelLocked(params) {
    const url = `${baseUrl}/${params.id}/status/lock?value=${params.state}`;
    return HttpTransport('POST', url);
  }

  /**
   * @param  {object} params
   */
  static async ModelStatus(params) {
    const url = `${baseUrl}/${params.id}/status`;
    return HttpTransport('GET', url);
  }

  /**
   * @param  {object} params
   */
  static async ModelList() {
    const url = `${baseUrl}/list`;
    return HttpTransport('PUT', url);
  }

  /**
   * @param  {object} params
   */
  static async ModelResourceSave(params) {
    const url = `${baseUrl}/${params.model}/resources`;
    return HttpTransport('PUT', url, params.resources);
  }

  /**
   * @param  {object} params
   */
  static async ModelResourceSaveByPeriod(params) {
    const url = `${baseUrl}/${params.model}/periods/${params.period}/resources`;
    return HttpTransport('PUT', url, params.resources);
  }

  /**
   * @param  {object} params
   */
  static async ModelRecalc(params) {
    const url = `${baseUrl}/${params.model}/recalc`;
    return HttpTransport('POST', url);
  }

  /**
   * @param  {object} params
   */
  static async ModelSave(params) {
    const url = `${baseUrl}/${params.model}/save`;
    return HttpTransport('POST', url);
  }

  /**
   * @param  {object} params
   */
  static async ModelClearCache() {
    const url = `${baseUrl}/cache/clear`;
    return HttpTransport('POST', url);
  }

  /**
   * @param  {object} params
   */

  static async ModelSwitchIsTariff(params) {
    const url = `${baseUrl}/${params.name}/switchTariff`;
    return HttpTransport('POST', url);
  }

  /**
   * @param  {object} params
  */

  static async GetWhatIfList(params) {
    const url = `${baseUrl}/${params.id}/whatif`;
    return HttpTransport('GET', url);
  }

  static async SelectWhatif(params) {
    const url = `${baseUrl}/${params.model}/whatif`;
    return HttpTransport('GET', url);
  }
}

export default Model;
