/**
 * Клонирование переода
 * @class
 * @public
 */
class ClonePeriod {
  constructor() {
    /* период */
    this.period = null;
    this.model = null;
  }

  /**
   * Заполнить модель
   * @param  {Object} model  данные
   * @public
   */
  set SetModel(model) {
    this.model = model;
  }

  /**
   * Заполнить период
   * @param  {Object} data  данные
   * @public
   */
  set SetPresently(data) {
    this.period = data.periods.find(({ id }) => data.period === id);
  }

  /**
   * Получить период
   * @return {Object}
   * @public
   */
  get GetPresently() {
    return this.period;
  }

  /**
   * Получить модель
   * @return {Object}
   * @public
   */
  get GetModel() {
    return this.model;
  }

  /**
   * Сгенерировать список периодов
   * @param  {Object} data  данные
   * @param  {Void}   fn    возврат периода
   * @param  {Void}   empty если нет периодов
   * @return {Function}
   * @public
   */
  CreaateItems = (data, fn, empty) => {
    if (data.periods.length > 1) {
      return data.periods.map(({ label, id, type }) => {
        if (id !== data.period && this.period.type === type) {
          return fn(label, id);
        }
        return null;
      });
    }
    return empty();
  };

  /**
   * Создать состояние кнопки
   * @param  {Object} data  данные
   * @return {Boolean}
   * @public
   */
  ComponentState = (data) => {
    const result = data.periods.filter(
      ({ id, type }) => id !== data.period && this.period.type === type
    );
    if (result.length > 0 && data.locked) {
      return false;
    }

    return true;
  };

  /**
   * Клонировать параметры периоды
   * @param  {Object} model объект модели
   * @return {Function}
   * @public
   */
  CloneData = (select, resId, type, fn) => {
    const res = this.model.resources.find(({ value }) => value === resId);
    let pres;
    let sel;

    res.budcycles.forEach((el, index) => {
      if (el.id === this.period.id) {
        pres = index;
      }

      if (el.id === select) {
        sel = index;
      }
    });

    if (type === 'consumptions') {
      res.budcycles[pres].consumptions = [...res.budcycles[sel].consumptions];
    }


    if (type === 'direct') {
      res.budcycles[pres].variable = [...res.budcycles[sel].variable];
      res.budcycles[pres].fixed = [...res.budcycles[sel].fixed];
    }

    if (type === 'metric') {
      res.budcycles[pres].available = [...res.budcycles[sel].available];
      res.budcycles[pres].depreciated = [...res.budcycles[sel].depreciated];
      res.budcycles[pres].fixedTariff = res.budcycles[sel].fixedTariff;
      res.budcycles[pres].proportions = [...res.budcycles[sel].proportions];
      res.budcycles[pres].purchased = [...res.budcycles[sel].purchased];
      res.budcycles[pres].required = [...res.budcycles[sel].required];
      res.budcycles[pres].tariffs = [...res.budcycles[sel].tariffs];
    }

    return fn();
  };
}

export default ClonePeriod;
