/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */

/**
 * Парсинг листа моделей
 * @public
 */
export default () => {
  self.addEventListener('message', ({ data }) => {
    console.time('Компиляция листа моделей');
    const models = data.response;
    const tribes = {};
    const { permissions } = data.params;

    /**
     * Трансвормация списка key-value в оьъект
     * @param  {string} modelId
     * @param  {array} keyValueList
     * @return {object}
     * @public
     */
    const ObjectFromEntries = (modelId, keyValueList) =>
      keyValueList.reduce((summary, permission) => {
        if (permission.target === 'model' && (permission.code === 'all' || permission.code === modelId)) {
          return Object.assign({}, summary, permission);
        }
        return summary;
      }, {});

    /** Собирает объект с ключами трайбами содержащими модели  */
    models.data.forEach((item) => {
      // Добавляем атриубут id
      if (!item.id) {
        item.id = item.value;
      }

      // Полномочия модели
      item.permissions = ObjectFromEntries(item.id, permissions);
      // Показывать модель в списке
      item.visible = item.permissions && Object.keys(item.permissions).length > 0;

      if (item.visible) {
        if (tribes[item.tribe] === undefined) {
          tribes[item.tribe] = [];
        }

        tribes[item.tribe].push(item);
      }
    });

    /** Преобразует объект в ассоциативный массив {tribe, models} */
    const result = Object.keys(tribes).map((item) => ({
      tribe: item,
      models: tribes[item],
    }));

    postMessage(result);
    console.timeEnd('Компиляция листа моделей');
  });
};
