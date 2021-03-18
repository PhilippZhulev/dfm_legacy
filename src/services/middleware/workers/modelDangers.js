/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */

/**
 * Препроверка модели
 * @public
 */
export default () => {
  self.addEventListener('message', ({ data }) => {
    console.time('Препроверка модели');

    const { resCategories, resources } = data.model;

    const base = {
      calc: false,
      metric: false,
      resource: null,
    };

    /* Получение списка объектов справочника категорий */
    const mapCategories = resCategories.reduce((obj, category) => {
      obj[category.value] = category;
      return obj;
    }, {});

    /* Получение списка объектов справочника категорий */
    const availableCalcTypes = resources.reduce((obj, resource) => {
      obj[resource.value] = mapCategories[resource.category]?.calcTypes || [];
      return obj;
    }, {});

    resources.forEach((current) => {
      const { category, budcycles, label } = current;

      if (!base.resource) {
        for (let i = 0; i < budcycles.length; i++) {
          const budItem = budcycles[i];
          for (let j = 0; j < budItem.consumptions.length; j++) {
            const consItem = budItem.consumptions[j];
            base.calc = base.calc ||
              !availableCalcTypes[consItem.resourceId].includes(consItem.calcType);
            base.metric = base.metric ||
              (consItem.calcType === 'tariff' && !consItem.metrics.length);

            if (base.calc || base.metric) {
              base.resource = label;
              return;
            }
          }
        }
      }
    });

    let message = '';
    if (base.calc) {
      message = `Обратите внимание! Для узла "${base.resource}" вариант расчета не совпадает с целевым\rпо категории узла. Рекомендуется изменить вариант расчета и сделать пересчет модели`;
    } else if (base.metric) {
      message = `Обратите внимание! Для узла "${base.resource}" установлен вариант расчета "по тарифу",\rно не задана ни одна метрика. Рекомендуется задать метрику`;
    }
    postMessage(message);

    console.timeEnd('Препроверка модели');
  });
};
