/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */

/**
 * Парсинг отчета BusinessOverview - Карточка модели
 * @public
 */
export default () => {
  self.addEventListener('message', ({ data }) => {
    console.time('Компиляция отчета BusinessOverview');

    /* Получаем модель */
    const { model } = data;

    /* Получаем элементы модели */
    const {
      resCategories,
      metricDictionary,
      periodDictionary,
      resources,
    } = model;

    /* Получаем параметры */
    const { periodFirstId, periodLastId, currency = null, report } = data.params;

    /**
     * Список доступных разрядностей
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
     * @param  {string|number} val
     * @param  {number} precision
     * @param  {number|null} determine
     * @return {string}
     * @public
     */
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
          volume = Math.round(((volume / determine) * 100)) / 100;
        // }
        volume = sliceDigits(volume.toFixed(2));
      } else {
        const digit = depthDigit(volume);
        postfix = units[digit];
        volume = (volume / digit).toPrecision(precision);
      }

      return volume + postfix;
    };

    /**
     * Округление данных
     * @param  {string|number} val
     * @param  {number} rank
     * @return {number|string}
     * @public
     */
    const ValueFormat = (val = 0, rank = 0) => {
      const precision = 10 ** rank;
      return sliceDigits(
        Math.round(Number(val) * precision) / precision
      );
    };

    /**
     * Вычисляем разницу между значениями в процентах
     * @param {number} volumeCurr
     * @param {number} volumePrev
     * @param {number} rank
     * @returns {number}
     */
    const percentageDifferenceValue = (volumeCurr, volumePrev, rank = 0) => {
      if (!volumeCurr && !volumePrev) {
        return 0;
      }
      const divider = volumePrev || volumeCurr;
      return ValueFormat(Number((((volumeCurr - volumePrev) / divider) * 100).toFixed(2)), rank);
    };

    /* Получение списка объектов справочника категорий */
    const mapCategories = resCategories.reduce((obj, category) => {
      obj[category.value] = category;
      return obj;
    }, {});

    /* Получение списка объектов справочника категорий */
    const mapMetrics = metricDictionary.reduce((obj, metric) => {
      metric.shortLabel = metric.label.substring(0, 3);
      if (metric.label.length > 3) {
        metric.shortLabel += '.';
      }
      obj[metric.value] = metric;
      return obj;
    }, {});

    /* Получение списка объектов справочника периоды */
    const mapPeriods = periodDictionary.reduce((obj, period) => {
      obj[period.id] = period;
      return obj;
    }, {});

    /* Получение списка объектов распределения ресурсов по периодам */
    const mapPeriodDeps = report.periodDependencies.reduce((obj, period) => {
      obj[period.id] = period;
      return obj;
    }, {});

    /* Форматирование ресурсов и переиодов */
    const resourceData = resources.find(({ value }) => value === report.resourceId);

    /* Формируемые данные */
    const result = {
      value: report.value,
      label: report.label,
      block: report.block,
      tribe: report.tribe,
      resourceId: resourceData.value,
      resourceLabel: resourceData.label,
      category: mapCategories[resourceData.category],
      metrics: report.metrics.map(({ value }) => mapMetrics[value]),
      fullTco: mapPeriodDeps[periodFirstId].fullTco,
      fullTcoFormat: MoneyFormat(mapPeriodDeps[periodFirstId].fullTco, 4, currency),
    };

    /* ERROR: Определяем выполняется ли условие построения отчета модели */
    result.error = (!mapPeriodDeps[periodFirstId].volumeValue &&
      !mapPeriodDeps[periodFirstId].tariffValue) || !result.metrics.length;
    if (result.error) {
      postMessage(result);
      console.timeEnd('Компиляция отчета BusinessOverview');
    }

    /* Сравниваемые периоды */
    result.periods = {
      type: mapPeriods[periodFirstId].type === mapPeriods[periodLastId].type
          ? mapPeriods[periodFirstId].type
          : null,
      first: mapPeriods[periodFirstId],
      last: mapPeriods[periodLastId],
    };

    /* Генерация уникального ключа при парсинге данных */
    result.key = `${result.value}_${result.periods.first.id}_${result.periods.last.id}`;

    /* Категории учета расходов */
    result.costCategories = resCategories;

    /* Узлы структуры модели */
    result.resourceStructure = {
      topNodes: mapPeriodDeps[periodFirstId].structureModel.topNodes.map((node) => {
        node.category = mapCategories[node.categoryName];
        return node;
      }),
      otherNodes: mapPeriodDeps[periodFirstId].structureModel.otherNodes,
    };

    /* Тариф узла по периодам */
    const tariffCurr = mapPeriodDeps[periodFirstId].tariffValue;
    const tariffPrev = mapPeriodDeps[periodLastId].tariffValue;
    result.tariff = {
      format: 'р./ед',
      value: tariffCurr,
      valueFormat: ValueFormat(tariffCurr, 2),
      difference: percentageDifferenceValue(tariffCurr, tariffPrev, 1),
      prev: ValueFormat(tariffPrev, 2),
    };

    /* Объем узла по периодам */
    const volumeCurr = mapPeriodDeps[periodFirstId].volumeValue;
    const volumePrev = mapPeriodDeps[periodLastId].volumeValue;
    result.volume = {
      format: mapMetrics[resourceData.metrics[0]].shortLabel.toLowerCase(),
      value: volumeCurr,
      valueFormat: MoneyFormat(volumeCurr),
      difference: percentageDifferenceValue(volumeCurr, volumePrev, 1),
      prev: MoneyFormat(volumePrev),
    };

    /* Объем потребления ресурсов по периодам */
    const consumptionValueCurr = mapPeriodDeps[periodFirstId].consumptionValue;
    const consumptionValuePrev = mapPeriodDeps[periodLastId].consumptionValue;
    result.consumptionCost = {
      value: ValueFormat(consumptionValueCurr),
      valueFormat: MoneyFormat(consumptionValueCurr, 4, currency),
      difference: percentageDifferenceValue(consumptionValueCurr, consumptionValuePrev, 1),
      prev: ValueFormat(consumptionValuePrev),
      prevFormat: MoneyFormat(consumptionValuePrev, 4, currency),
    };

    /* Объем прямых расходов по периодам */
    const directValueCurr = mapPeriodDeps[periodFirstId].directValue;
    const directValuePrev = mapPeriodDeps[periodLastId].directValue;
    result.directCost = {
      value: ValueFormat(directValueCurr),
      valueFormat: MoneyFormat(directValueCurr, 4, currency),
      difference: percentageDifferenceValue(directValueCurr, directValuePrev, 1),
      prev: ValueFormat(directValuePrev),
      prevFormat: MoneyFormat(directValuePrev, 4, currency),
    };

    /* Объем предоставляемых ресурсов по периодам */
    const provideValueCurr = mapPeriodDeps[periodFirstId].provideValue;
    const provideValuePrev = mapPeriodDeps[periodLastId].provideValue;
    result.provideCost = {
      value: ValueFormat(provideValueCurr),
      valueFormat: MoneyFormat(provideValueCurr, 4, currency),
      difference: percentageDifferenceValue(provideValueCurr, provideValuePrev, 1),
      prev: ValueFormat(provideValuePrev),
      prevFormat: MoneyFormat(provideValuePrev, 4, currency),
    };
    /* Фильтрация справочника периодов по типу */
    const consumptionPeriods = periodDictionary
      .filter(({ type }) => type === mapPeriods[periodFirstId].type);
    /* Сортировка справочника периодов по возрастанию */
    consumptionPeriods.sort((periodA, periodB) => periodA.id - periodB.id);

    // Данные для динамики ТСО узла
    const dynamicsDeps = [];
    // Данные разрядности для динамики ТСО узла
    const depthDeps = { tco: 1, tariff: 1, volume: 1 };
    // Данные для отображения на диграмме Распределение ТСО по категориям
    const chartDeps = [];
    // Список категорий в диаграмме Распределение ТСО по категориям
    const chartCategories = {};
    // Максимальная разрядность для значений в диаграмме Распределение ТСО по категориям
    let chartDepsDigit = 1;

    consumptionPeriods.forEach((period) => {
      const periodData = mapPeriodDeps[period.id];
      /* Данные для отображения распределения ТСО по категориям */
      const consPeriodCategories = {};
      periodData.categoryDistribution.forEach((item) => {
        chartCategories[item.categoryId] = mapCategories[item.categoryId];
        chartDepsDigit = Math.max(chartDepsDigit, depthDigit(item.sumCause));
        consPeriodCategories[item.categoryId] = item.sumCause;
        consPeriodCategories[`${item.categoryId}_label`] = `${item.partTCO.toFixed(2)}%`;
      });
      consPeriodCategories.date = period.label;
      chartDeps.push(consPeriodCategories);

      /* Данные для отображения динамики ТСО узла */
      dynamicsDeps.push({
        date: period.label,
        tco: periodData.fullTco,
        tariff: periodData.tariffValue,
        volume: periodData.volumeValue,
      });
      // Находим максимальную разрядность
      depthDeps.tco = Math.max(depthDeps.tco, depthDigit(periodData.fullTco));
      depthDeps.tariff = Math.max(depthDeps.tariff, depthDigit(periodData.tariffValue));
      depthDeps.volume = Math.max(depthDeps.volume, depthDigit(periodData.volumeValue));
    });

    /** Диаграмма Динамика ТСО узла */
    result.chartDynamicsTCONode = {
      periods: consumptionPeriods,
      dependencies: dynamicsDeps.map((item) => {
        // Название на шкале диагрпммы
        item.tco_label = MoneyFormat(item.tco, 4, depthDeps.tco).concat(' руб.');
        item.tariff_label = MoneyFormat(item.tariff, 4, depthDeps.tariff).concat(' руб./ед.');
        item.volume_label = MoneyFormat(item.volume, 4, depthDeps.volume).concat(' ед.');
        // Округляем значения до максимальной разрядности
        item.tco = Math.round(((item.tco / depthDeps.tco) * 100)) / 100;
        item.tariff = Math.round(((item.tariff / depthDeps.tariff) * 100)) / 100;
        item.volume = Math.round(((item.volume / depthDeps.volume) * 100)) / 100;

        return item;
      }),
      depthDependencies: depthDeps,
    };

    /* Ключи категорий */
    const catKeys = Object.keys(chartCategories);

    /** Диаграмма Распределение ТСО по категориям */
    result.chartTcoCategory = {
      periods: consumptionPeriods,
      digit: chartDepsDigit,
      categories: Object.values(chartCategories),
      dependencies: chartDeps.map((item) => {
        const depKeys = new Set(Object.keys(item));
        // Категории отсуствующие в периоде
        const catDifference = catKeys.filter((x) => !depKeys.has(x));

        /* Добавляем категории отсуствующие в данных по периоду */
        catDifference.forEach((cat) => {
          item[cat] = 0;
          item[`${cat}_label`] = '0%';
        });

        // Округляем значения до максимальной разрядности
        catKeys.forEach((cat) => {
          item[cat] = Math.round(((item[cat] / chartDepsDigit) * 100)) / 100;
        });

        return item;
      }),
    };

    postMessage(result);
    console.timeEnd('Компиляция отчета BusinessOverview');
  });
};
