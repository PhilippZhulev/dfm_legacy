import { virualStore } from './virtualStore';

const consoleStyles = {
  h3: 'font: 14px Arial; color: #ffd700;padding: 5px 0;',
  h4: 'font: 18px Arial; color: #65ACFF;padding: 5px 0;',
  p: 'font: 12px Arial; color: #4CB648;padding: 5px 0;',
  b: 'font: 12px Arial; color: orange;padding: 5px 0;',
  i: 'font: 12px Arial; color: #65ACFF;padding: 5px 0;',
  err: 'font: 12px Arial; color: #F9514D;padding: 0 0;',
};

/**
 * Дебагер
 * @class
 * @public
 */
class DfmDebug {
  constructor() {
    let __property = null;
    let __storage = null;

    /**
     * Проверить localhost
     * @param  {Void} fn
     * @private
     */
    function _getHost(fn) {
      if (window.location.hostname.indexOf('localhost') !== -1) {
        return fn();
      }
    }

    /**
     * Добавить ресурс
     * @param  {Object} data
     * @public
     */
    this.SetResource = (data) => {
      _getHost(() => {
        __property = { ...data };
      });
    };

    /**
     * Получить ресурс
     * @return {Object}
     * @public
     */
    this.GetResource = () => {
      return __property;
    };

    /**
     * Получить хранилище
     * @param  {Object} store
     * @public
     */
    this.SetStorage = (store) => {
      _getHost(() => {
        __storage = store;
      });
    };

    /**
     * Получить хранилище
     * @return {Object}
     * @public
     */
    this.GetStorage = () => {
      return __storage.getState();
    };

    /**
     * Получить хранилище модели
     * @return {Object}
     * @public
     */
    this.GetModelStore = () => {
      return { ...virualStore.model };
    };
  }
}

window.DFM = new DfmDebug();

function log(msg, style) {
  if (!style || !consoleStyles[style]) {
    style = 'bold';
  }
  console.log('%c' + msg, consoleStyles[style]);
}

document.addEventListener('app.error', (ev) => {
  log(`Function: ${ev.detail.func}\n${ev.detail.message}`, 'err');
});

export function createLog(path) {
  log(`${path.description}`, 'h4');
  log(`Copyright (C): ${path.developer}`, 'b');
  log(`Version: ${path.version}`, 'h3');
}
