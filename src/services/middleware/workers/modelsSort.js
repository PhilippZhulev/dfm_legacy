
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */

/**
 * Сортировка моделей
 * @public
 */
export default () => {
  self.addEventListener('message', ({ data }) => {
    console.time('Сортировка моделей');

    const { array, search } = data;

    let tribes = [];

    /** Если поле поиска заполнено ищем результаты в моделях трайбов */
    if (search.length > 0) {
      array.forEach((element) => {
        const result = element.models.filter((item) =>
          // eslint-disable-next-line max-nested-callbacks
          [item.value, item.label].findIndex((name) =>
            name.toLowerCase().indexOf(search.toLowerCase()) !== -1) !== -1);

        if (result.length > 0) {
          tribes.push({
            tribe: element.tribe,
            models: result,
          });
        }
      });
    } else {
      tribes = array;
    }

    /** Оортируем массив по заданному алгоритму  */
    const result = tribes.sort((a, b) => {
      if (a.tribe > b.tribe) {
        return -1;
      }

      if (a.tribe < b.tribe) {
        return 1;
      }

      return 0;
    });

    console.timeEnd('Сортировка моделей');

    postMessage({ result });
  });
};
