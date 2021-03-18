/* eslint-disable prefer-object-spread */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */

/**
 * Парсинг отчета RootCause - Анализ драйверов ТСО
 * @public
 */
export default () => {
  self.addEventListener('message', ({ data }) => {
    console.time('Компиляция отчета RootCause');

    /* Получаем элементы модели */
    const { resCategories, resources } = data.model;

    /* Получаем параметры */
    const { resourceId, currency = null, report } = data.params;

    /**
     * Список доступных разрядностей
     * @type {{'1': string, '1000000000000': string, '1000000': string, '1000000000': string, '1000000000000000': string, '1000000000000000000': string, '1000': string}}
     */
    const units = {
      1: '' ,
      1E3: ' тыс.',
      1E6: ' млн' ,
      1E9: ' млрд' ,
      1E12: ' трлн' ,
      1E15: ' P' ,
      1E18: ' E' ,
    };

    /**
     * Разделение числа по разрядам
     * @param  {string|number} value
     * @return {string}
     * @public
     */
    const sliceDigits = (value = 0) => {
      const rx = /\B(?=(\d{3})+(?!\d))/g;
      return String(value).replace(rx, ' ');
    };

    /**
     * Возвращаем максимальную разрядность числа
     * @param  {string|number} val
     * @return {string}
     * @public
     */
    const depthDigit = (val = 0) => {
      const unitKeys = Object.keys(units);
      let value = Number(val);

      for (let i = 0; i < unitKeys.length - 1; i++) {
        if (Math.abs(value) < 1000) {
          return unitKeys[i];
        }
        value /= 1000;
      }

      return unitKeys[unitKeys.length - 1];
    };

    /**
     * Форматирование денег
     * @param  {number} val
     * @param  {number} precision
     * @param  {number|null} determine
     * @return {string}
     * @public
     */
    // TODO: суммарное число знаков - плохая метрика, корректнее число знаков после запятой, надо переделать
    const MoneyFormat = (val = 0, precision = 4, determine) => {
      let volume = Number(val);
      let postfix = '';

      if (volume > -0.001 && volume < 0.001) {
        volume = 0;
      }
      if (determine) {
        // TODO Убрал но может пригодится проверка
        // if (volume >= determine) {
          postfix = units[determine];
          volume = Math.round(((volume / determine) * 10)) / 10;
        // }
        volume = sliceDigits(volume.toFixed(1));
      } else {
        const digit = depthDigit(volume);
        postfix = units[digit];
        volume = (volume / digit).toFixed(1); // .toPrecision(precision);
        // убираем .0, если число было целым
        if (volume[volume.length - 1] === '0') {
          volume = volume.substr(0, volume.length - 2);
        }
      }

      return volume + postfix;
    };

    /**
     * Округление данных
     * @param  {string} val
     * @param  {number} rank
     * @return {string}
     * @public
     */
    const ValueFormat = (val = 0, rank = 0) => {
      const precision = 10 ** rank;
      return sliceDigits(
        Math.round(Number(val) * precision) / precision
      );
    };

    /* Форматирование ресурсов и переиодов */
    const resourceData = resources.find(({ value }) => value === resourceId);

    /* Формируемые данные */
    const result = { chart: {}, categories: {}, list: {} };

    /* Получение списка объектов справочника категорий */
    const mapCategories = resCategories.reduce((obj, category) => {
      obj[category.value] = category;
      return obj;
    }, {});

    /* Данные для категорий */
    const dependenciesCategory = report.categoryDistribution.map((category) => {
      category.sumCauseFormat = MoneyFormat(category.sumCause, 4, currency);
      category.partTCO = ValueFormat(category.partTCO);
      return Object.assign({}, category, mapCategories[category.categoryId]);
    });

    /* Данные для диаграммы */
    result.chart = {
      value: resourceData.value,
      label: resourceData.label,
      period: report.period,
      fullTco: MoneyFormat(report.fullTco, 4, currency),
      countNode: report.countNode,
      dependencies: dependenciesCategory,
    };

    /* Данные для списка */
    result.categories = dependenciesCategory;

    /* Данные для списка */
    result.list = report.dependencies.map((node) => {
      node.directCauseFormat = MoneyFormat(node.directCause, 4, currency);
      node.sumCauseFormat = MoneyFormat(node.sumCause, 4, currency);
      node.fullValueFormat = MoneyFormat(node.fullValue);
      node.usedValueFormat = MoneyFormat(node.usedValue);
      node.partTCOFormat = ValueFormat(node.partTCO, 1);
      node.partCauseFormat = ValueFormat(node.partCause, 2);
      return Object.assign({}, node, mapCategories[node.categoryId]);
    });

    postMessage(result);
    console.timeEnd('Компиляция отчета RootCause');
  });
};
