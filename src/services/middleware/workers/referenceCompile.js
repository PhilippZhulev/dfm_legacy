/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */


/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */

/**
 * Получение справочников
 * @public
 */
export default () => {
  self.addEventListener('message', ({ data }) => {
    console.time('Получение справочника');

    const {
      resources,
      resCategories,
      parameters,
      periodDictionary,
      metricDictionary,
    } = data.model;


    if (data.params.type === 'metric') {
      /** Фильтрация и проверка на мертвые метрики */
      const categoryItems = resCategories.map((item) => item.value);
      const result = metricDictionary.map((item) => {
        if (!item.cats) {
          item.cats = [];
        }

        item.cats =
          item.cats.filter((value) => categoryItems.includes(value));

        return item;
      });

      postMessage(result);
    }

    if (data.params.type === 'category') {
      postMessage(resCategories);
    }

    if (data.params.type === 'parameter') {
      // TODO Костыль: преобразуем все значения параметров в строки
      postMessage(parameters.map((parameter) => {
        parameter.volume = String(parameter.volume).replace(/(-?)(\d*)\.?(\d+)e([+-]\d+)/,
          // eslint-disable-next-line max-params
          (a, b, c, d, e) => (e < 0
            ? `${b}0.${Array(0 - Number(e)).join('0')}${c}${d}`
            : `${b}${c}${d}${Array(Number(e) + 1).join('0')}`));
        return parameter;
      }));
    }

    if (data.params.type === 'period') {
      postMessage(periodDictionary);
    }

    if (data.params.type === 'nodeParameters') {
      // TODO Костыль: по умолчанию должно быть [] а не null
      postMessage(resources.find(({ value }) => value === data.params.resource)
        ?.nodeParameters || []);
    }

    console.timeEnd('Получение справочника');
  });
};
