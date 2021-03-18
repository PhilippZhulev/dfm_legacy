/* eslint-disable no-console */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable prefer-object-spread */
/* eslint-disable no-restricted-globals */

/**
 * Создание ресурса из дампа модели
 * @public
 */

export default () => {
  self.addEventListener('message', ({ data }) => {
    console.time('Компиляция ресурса');

    /** Получаем элементы модели */
    const {
      resCategories,
      metricDictionary,
      costDictionary,
      resources,
    } = data.model;

    /** Получаем параметры */
    const { period, resource } = data.params;

    /**
     * Форматирование денег
     * @param  {number} val
     * @param  {number} precision
     * @return {string}
     * @public
     */
    const MoneyFormat = (val = 0, precision) => {
      const pre = precision || 4;
      const units = ['', ' тыс.', ' млн', ' млрд', ' трлн'];

      let volume = Number(val);

      if (volume > -0.001 && volume < 0.001) {
        volume = 0;
      }
      for (let i = 0; i < units.length - 1; i++) {
        if (Math.abs(volume) < 1000) {
          return volume.toPrecision(pre) + units[i];
        }
        volume /= 1000;
      }
      return volume.toPrecision(4) + units[units.length - 1];
    };

    /**
     * Получить индикатор востребованости
     * @param  {number} val
     * @param  {number} level
     * @return {object}
     * @public
     */
    const getIndicator = (val, level) => {
      if (val < 0) {
        return {
          label: 'Индикатор ресурса',
          color: '#869AAC',
        };
      }

      if (val > level && val <= 100) {
        return {
          label: `Ресурс востребован ( > ${level}% )`,
          color: '#FFAB4F',
        };
      }

      if (val > 100) {
        return {
          label: 'Ресурс в дефиците',
          color: '#F9514D',
        };
      }

      return {
        label: `Ресурс не востребован ( < ${level}% )`,
        color: '#05C985',
      };
    };

    /**
     * Расчет популярности ресурса
     * @param  {number} required
     * @param  {number} available
     * @param  {number} defaultValue
     * @return {number}
     * @public
     */
    const calcPopular = (required, available, defaultValue) => {
      if (available <= 0) {
        return defaultValue;
      }

      return Math.round((required / available) * 100);
    };

    /**
     * Обработка индикатора
     * @param  {object} periodData
     * @public
     * @return {number}
     */
    function indicator({ required, available }) {
      if (required.length > 0 && available.length > 0) {
        return calcPopular(required[0].volume, available[0].volume, 100);
      }

      return -1;
    }

    /**
     * Расчет индикатора прогресса
     * @param  {object} periodData
     * @public
     * @return {number}
     */
    function setProgress({ required, available }) {
      if (required.length > 0 && available.length > 0) {
        const result = (required[0].volume / available[0].volume) * 100;
        return !isNaN(result) && isFinite(result) ? result : 0;
      }
      return 0;
    }

    /**
     * Расчет фиксированого тарифа
     * @param  {array} fixed
     * @param  {array} costDict
     * @param  {bool} noAmort
     * @public
     * @return {array}
     */
    const fixedCostsFormat = (fixed, costDict, noAmort) =>
      fixed.filter((rate) => rate.costId !== 'amort' || !noAmort)
        .map((rate) => ({
          costId: rate.costId,
          costName: costDict.filter((c) => c.value === rate.costId)
            .reduce((accumulator, current) => current.label, ''),
          price: rate.price,
        }));

    /**
     * Компиляция cost
     * @param  {array} rate
     * @param  {array} costDict
     * @public
     * @return {array}
     */
    function metricRates(rate, costDict) {
      return {
        costId: rate.costId,
        costName: costDict.filter((c) => c.value === rate.costId)
          .reduce((accumulator, current) => current.label, ''),
        price: rate.price,
      };
    }

    /**
     * Форматирование переменных
     * @param  {array} variable
     * @param  {array} metricDict
     * @param  {array} costDict
     * @param  {bool} noAmort
     * @public
     * @return {array}
     */
    const variablesFormat = (variable, metricDict, costDict, noAmort) =>
      variable.map((item, i) => ({
        metricId: item.metricId,
        metricName: metricDict.filter((md) => md.value === item.metricId)
          .reduce((accumulator, current) => current.label, ''),
        rates: item.rates.filter((r) => r.costId !== 'amort' || !noAmort)
          .map((rate) => metricRates(rate, costDict)),
      }));

    /** Форматирование ресурсов и переиодов */
    const resourceData = resources.find((item) => item.value === resource);
    const periodIndex = resourceData.budcycles.findIndex(({ id }) => id === period);
    const periodData = resourceData.budcycles[periodIndex];

    /**
     * REVIEW: нужно сделать на бэке
     * Вычисление потребляющих узлов
     * @param  {array} type тип метрики
     * @return {array}
     * @public
     */
    const consumed = (type) =>
      resources
        .filter(({ uses }) =>
            uses.includes(resourceData.value) && resourceData.metrics[0] === type
        )
        .map(({ budcycles, label, category, value }) => ({
          value: budcycles[periodIndex].consumptions
              .find(({ resourceId }) => resourceId === resourceData.value)
              ?.volumes.find(({ metricId }) => metricId === type)?.volume || 0,
          label,
          id: value,
          color:
            resCategories.find((item) => item.value === category)?.color ||
            '#fff',
        }));

    /** Создать список метрик */
    const metric = {
      availableMetric: metricDictionary
        .filter((item) => item.cats && item.cats.indexOf(resourceData.category) !== -1)
        .map((item) => {
          /**
           * Получение объекта метрики
           * @param  {string} field
           * @param  {string} volumeField
           * @public
           */
          const fieldsValue = (field, volumeField) => {
            const fieldItem = periodData[field].find(
              (el) => el.metricId === item.value
            );
            if (fieldItem && volumeField) {
              return fieldItem[volumeField];
            }
            return fieldItem || 0;
          };

          return Object.assign({
              availableValue: fieldsValue('available', 'volume'),
              tariffValue: fieldsValue('tariffs', 'unitCost'),
              requiredValue: fieldsValue('required', 'volume'),
              purchasedValue: fieldsValue('purchased', 'volume'),
              proportionsValue: fieldsValue('proportions', 'fraction'),
              depreciatedValue: fieldsValue('depreciated', 'volume'),
              variable: fieldsValue('variable'),
              fixed: periodData.fixed,
              consumed: consumed(item.value),
              equalityTariff: {
                state: periodData.fixedTariff,
                parentModel: resourceData.link !== null ? resourceData.link.modelId : null,
                parentResource: resourceData.link !== null ? resourceData.link.resourceId : null,
              },
              state: fieldsValue('available') !== 0,
            },
            item
          );
        }),
    };

    /**
     * Компиляция групп
     * @param  {array} params данные ресурса
     * @param  {array} res ресурсы
     * @param  {array} cat категории
     * @public
     */
    const setSupers = (params, res, cat) => {
      if (params.supres) {
        return params.supres.resources
          .map((elements) => {
            const findResource = res.find(({ value }) => value === elements);

            if (findResource) {
              const category = cat.find(({ value }) => value === findResource.category);

              return {
                value: elements,
                label: findResource.label,
                color: (category && category.color) || '#fff',
                category: findResource.category,
              };
            }
            return null;
          })
          .filter((item) => item !== null);
      }
      return [];
    };

    /**
     * Получение знаения метрики
     * @param  {object} targetResource
     * @param  {string} metricId
     * @param  {string} type
     * @param  {string} valueType
     */
    const metricVolumes = (targetResource, metricId, type, valueType) => {
      const paramData = targetResource.budcycles[period][type]?.find(
        (el) => el.metricId === metricId
      );

      return paramData ? paramData[valueType] : 0;
    };

    /** Список объектов узлов */
    const mapResource = resources.reduce((summary, current) => {
      current.budcycles = current.budcycles.reduce((obj, cur) => {
        obj[cur.id] = cur;
        return obj;
      }, {});

      summary[current.value] = current;
      return summary;
    }, {});

    /** Список объектов кактегорий */
    const mapCategory = resCategories.reduce((summary, current) => {
      summary[current.value] = current;
      return summary;
    }, {});

    /** Список объектов метрик */
    const mapMetric = metricDictionary.reduce((summary, current) => {
      summary[current.value] = current;
      return summary;
    }, {});

    /** Список объектов привязаннх ресурсов */
    const mapConsumptions = periodData.consumptions.reduce((summary, current) => {
        current.volumes = current.volumes.reduce((obj, cur) => {
          obj[cur.metricId] = cur;
          return obj;
        }, {});

        summary[current.resourceId] = current;
        return summary;
      }, {});

    const variantCalc = {
      tariff: { value: 'tariff', label: 'По тарифам' },
      payment: { value: 'payment', label: 'По платам' },
    };

    /**
     * Получение значений сколько ресурсов свободно и занято у узла
     * @param resourceId
     * @param consumption
     * @returns {{use: number, free: number}}
     */
    const getBalancePayment = (resourceId, consumption) => {
      // Узел потребления ресурсов
      const takeResource = mapResource[resourceId].budcycles[period];

      // Если есть метрики, то это расчет по тарифам или ТСО раввно 0
      if (consumption.metrics?.length > 0 && !takeResource.totals.full) {
        return { free: 0, use: 100, consumers: [] };
      }

      // Определяем сколько процентов потребляет ресурс узла
      let useVolume = consumption.paymentCalc?.fraction || 0;
      const consumers = [];
      resources.forEach(({ value }) => {
        const node = mapResource[value];
        if (node.value !== resource && node.value !== resourceId) {
          // Конвертирование в объект массив потребления ресурсов узлов
          const nodeMapCons = node.budcycles[period]?.consumptions.reduce((summary, current) => {
              summary[current.resourceId] = current;
              return summary;
            }, {});

          if (nodeMapCons[resourceId]) {
            if (nodeMapCons[resourceId].metrics?.length > 0) {
              // Если узел потребляет ресурсы с помощью тарифа
              useVolume = 1;
            } else if (nodeMapCons[resourceId].paymentCalc?.fraction) {
              // Прибавляем процент потребления ресурса узла
              useVolume += nodeMapCons[resourceId].paymentCalc.fraction;
              consumers.push({
                value: node.value,
                label: node.label,
                fraction: Number(nodeMapCons[resourceId].paymentCalc.fraction) * 100,
              });
            }
          }
        }
      });

      // Если зачение больше 1
      if (useVolume > 1) {
        useVolume = 1;
      }

      // Конвертирование значений свобных и используемых ресурсов из числа в проценты
      return {
        free: Number((Math.round((1 - useVolume) * 100 * 1e5) / 1e5).toFixed(5)),
        use: Number((Math.round(useVolume * 100 * 1e5) / 1e5).toFixed(5)),
        consumers,
      };
    };

    /** Создать форматированный список привязаннх ресурсов */
    const consumptions = resourceData.uses
      /** TODO: Костыль на список потребюляемых ресурсов в текущем периоде */
      .filter((resourceId) => mapConsumptions[resourceId])
      .map((resourceId, index) => {
        const thisResource = mapResource[resourceId];
        const availableMetrics = thisResource.budcycles[period]?.available;
        const category = mapCategory[thisResource.category];
        const { calcType } = mapConsumptions[resourceId];
        const varsCalc = mapCategory[resourceData.category]?.calcTypes;

        const consResources = {
          id: resourceId,
          color: (category && category.color) || '#fff',
          subCategories: category.subCategories || [],
          name: thisResource.label,
          category: thisResource.category,
          type: mapConsumptions[resourceId].type,
          metrics: {},
          calcType: variantCalc[calcType] || variantCalc[varsCalc.length === 2 ? 'tariff' : varsCalc[0]],
          paymentCalc: {
            fraction: mapConsumptions[resourceId].paymentCalc?.fraction || 0,
            result: mapConsumptions[resourceId].paymentCalc?.result || 0,
          },
          calcTypes: mapCategory[thisResource.category]?.calcTypes.map((el) => variantCalc[el]),
          balance: getBalancePayment(resourceId, mapConsumptions[resourceId]),
        };

        const mapMetricVolumes = mapConsumptions[resourceId];

        consResources.metrics = availableMetrics.map(({ metricId }) => {
          const metricVolume = mapMetricVolumes && mapMetricVolumes.volumes[metricId];
          const resourceMetrics = Object.assign(
            {},
            {
              metricId,
              label: mapMetric[metricId]?.label,
              mainValue: 0,
              available: metricVolumes(thisResource, metricId, 'available', 'volume'),
              tariff: metricVolumes(thisResource, metricId, 'tariffs', 'unitCost'),
            },
            metricVolume || { rule: '', volume: 0 }
          );

          resourceMetrics.mainValue = (resourceMetrics.volume || 0) * resourceMetrics.tariff;

          return resourceMetrics;
        });

        return consResources;
      });

    /** Создать прогресс */
    const progress = setProgress(periodData);

    /** Компиляция ресурса */
    const result = {
      model: data.model.value,
      result: resourceData.label,
      group: !!resourceData.supres,
      groupChildren: setSupers(resourceData, resources, resCategories),
      period,
      periodIndex,
      inidicator: getIndicator(indicator(periodData), 50),
      formatValue: {
        full: MoneyFormat(periodData.totals.full),
        left: MoneyFormat(periodData.totals.left),
        direct: MoneyFormat(periodData.totals.direct),
      },
      categoryName: resCategories.find((cat) => cat.value === resourceData.category),
      totals: periodData.totals,
      tariffValue: periodData.totals.full - periodData.totals.direct,
      tariffValueFormat: MoneyFormat(periodData.totals.full - periodData.totals.direct),
      provideValueFormat: MoneyFormat(periodData.totals.full - periodData.totals.left),
      distributedFirst: periodData.required.length > 0 ? periodData.required[0].volume : 0,
      distributedLast: periodData.available.length > 0 ? periodData.available[0].volume : 0,
      caterory: resourceData.category,
      label: resourceData.label,
      fixedCosts: fixedCostsFormat(periodData.fixed, costDictionary, false),
      variables: variablesFormat(periodData.variable, metricDictionary, costDictionary, false),
      value: resourceData.value,
      link: resourceData.link || {},
      lifeTime: resourceData.lifeTime,
      description: resourceData.description || '',
      fixedTariff: periodData.fixedTariff,
      metricProgress: progress,
      availableMetric: metric.availableMetric,
      consumptions: consumptions,
    };
    postMessage(result);
    console.timeEnd('Компиляция ресурса');
  });
};
