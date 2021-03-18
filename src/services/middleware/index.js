import { WebWorker } from 'helpers';
import modelList from './workers/modelList.js';
import modelSelect from './workers/modelSelect.js';
import modelDangers from './workers/modelDangers.js';
import resourceSelect from './workers/resourceSelect.js';
import graphCompile from './workers/graphCompile.js';
import resourceList from './workers/resourceList.js';
import getResourcesToCategory from './workers/getResourcesToCategory.js';
import referenceCompile from './workers/referenceCompile.js';
import setModelProps from './workers/setModelProps.js';
import modelsSort from './workers/modelsSort.js';
import reportRootCause from './workers/reportRootCause.js';
import reportBusinessOverview from './workers/reportBusinessOverview.js';
import {
  virualStore,
  virualStoreVerison,
  setVirualStore,
} from '../../virtualStore';
import store from '../../redux/store';

window.savePropgess = 0;

/**
 * ANCHOR: Middleware для запросов приложения
 * отвечает за парсинг данных
 * @class
 * @public
 */
class AppMiddleware {
  /**
   * ANCHOR: Список воркеров
   * для ParseRequestData
   * @public
   */
  static Workers = {
    modelList,
    modelSelect,
    modelDangers,
    resourceSelect,
    graphCompile,
    resourceList,
    getResourcesToCategory,
    referenceCompile,
    setModelProps,
    modelsSort,
    reportRootCause,
    reportBusinessOverview,
  };

  /**
   * ANCHOR: Парсинг листа моделей
   * Декарирует promise/async функцию api
   * Пропускает данные через worker, парся их в доченем потоке
   * @param {*} func Функция api
   * @param {string} type Название worker парсера
   * @public
   */
  static ParseRequestData(func, type) {
    const worker = new WebWorker(AppMiddleware.Workers[type]);

    return async (params) => {
      const response = await func(params);

      try {
        return await new Promise((resolve, reject) => {
          worker.addEventListener('message', ({ data }) =>
            resolve({ ...response, data })
          );
          worker.addEventListener('error', ({ data }) => reject(data));

          worker.postMessage({ response, params });
        }).then((data) => {
          worker.terminate();
          return data;
        });
      } catch (error) {
        return console.error(error);
      }
    };
  }

  /**
   * ANCHOR: Компеляция данных из дампа модели
   * @param {object} model Модель
   * @param {object} params Параметры
   * @param {string} type Тип воркера
   * @public
   */
  static async GetDumpData(model, params, type) {
    const worker = new WebWorker(AppMiddleware.Workers[type]);

    try {
      return await new Promise((resolve, reject) => {
        worker.addEventListener('message', ({ data }) =>
          resolve({ completed: true, data })
        );
        worker.addEventListener('error', ({ data }) => reject(data));

        worker.postMessage({ model, params });
      }).then((data) => {
        worker.terminate();
        return data;
      });
    } catch (error) {
      return console.error(error);
    }
  }

  /**
   * ANCHOR: Сохранение данных в модель
   * @param {object} props Данные для изменения
   * @param {string} type Тип изменения
   * @public
   */
  static async SaveDumpData(props, type, save = true) {
    if (virualStoreVerison() !== 0) {
      const newData = await AppMiddleware.GetDumpData(
        virualStore.model,
        { props, type },
        'setModelProps'
      );

      setVirualStore('model', newData.data);

      if (save) {
        store.dispatch({
          type: 'MODEL_CHANGE',
          payload: { state: true },
        });

        store.dispatch({
          type: 'RESOURCES_INIT',
          payload: { params: props },
        });
      }
    }
  }

  /**
   * ANCHOR: Парсинг в воркере
   * @param {object} mainData Данные для изменения
   * @param {string} type Тип изменения
   * @public
   */
  static async WorkerParse(mainData, type) {
    const worker = new WebWorker(AppMiddleware.Workers[type]);

    try {
      return await new Promise((resolve, reject) => {
        worker.addEventListener('message', ({ data }) =>
          resolve({ completed: true, data })
        );
        worker.addEventListener('error', ({ data }) => reject(data));

        worker.postMessage(mainData);
      }).then((data) => {
        worker.terminate();
        return data;
      });
    } catch (error) {
      return console.error(error);
    }
  }

  /**
   * ANCHOR: Исключение модифицированые ресурсы
   * @param {object} model Данные для изменения
   * @public
   */
  static CheckModResources(prev, model) {
    const m = { ...model };
    const res = [];
    m.resources.forEach((item) => {
      if (item.position.mod) {
        const prevItem = prev.resources.find((el) => el.value === item.value);
        item.position = { ...prevItem.position };
      }

      res.push(item);
    });

    m.resources = res;

    return m;
  }

  /**
   * ANCHOR: Обработка сохранения
   * @param {func} func target функция
   * @param {object} event объект события
   * @param {objfuncect} call калбэк
   * @public
   */
  static saveStatus(func, event) {
    window.savePropgess += 33.333333333333333;

    /** Событие состояния статуса сохранения */
    const eventStatus = (msg = '', error = false) => {
      document.dispatchEvent(
        new CustomEvent('app.save.status', {
          detail: {
            ...event.params,
            status: window.savePropgess,
            err: error ? { text: msg } : null,
          },
        })
      );
    };

    return async (params) => {
      try {
        const result = await func(params);
        if (result.code !== 200 && result.code !== 201) {
          eventStatus(event.err, true);
        } else {
          eventStatus();
        }

        return result;
      } catch (e) {
        eventStatus(e.message, true);
        return { code: e.code || 500, msg: e.message };
      }
    };
  }
}

export default AppMiddleware;
