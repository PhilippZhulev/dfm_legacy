/* eslint-disable prefer-object-spread */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */

/**
 * Парсинг модели
 * @public
 */
export default () => {
  self.addEventListener('message', ({ data }) => {
    console.time('Компиляция модели');

    const model = data.response;
    const params = data.params.reloadData;
    const { permissions } = data.params;

    const {
      resCategories,
      value,
      label,
      parameters,
      periodDictionary,
      instanceDictionary,
      resources,
    } = model.data.model;

    const { locked = true, lockedInfo } = model.data;

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

    /**
     * ANCHOR: Создать список ресурсов
     * @param  {array} resourcesData
     * @public
     */
    const setResources = (resourcesData) =>
      resourcesData.map((item, index) => ({
        label: item.label,
        value: item.value,
        index,
      }));

    /**
     * ANCHOR: Получить главные узлы модели по расчетным периодам
     * @param  {array} resourcesData
     * @public
     */
    const resourcesHead = (resourcesData) => {
      const mainNodes = {};
      const actualResources = resources
        .filter((node) => !node.supres && ['app', 'fp'].includes(node.category))
        .map((node) => ({
          value: node.value,
          label: node.label,
          totalsFull: node.budcycles.reduce((obj, periodData) => {
            obj[periodData.id] = periodData.totals.full;
            return obj;
          }, {}),
        }));

      periodDictionary.forEach((period) => {
        let highTCO = -1;
        mainNodes[period.id] = {};

        actualResources.forEach((node) => {
          if (highTCO < node.totalsFull[period.id]) {
            highTCO = node.totalsFull[period.id];
            mainNodes[period.id].label = node.label;
            mainNodes[period.id].value = node.value;
          }
        });
      });

      return mainNodes;
    };

    /**
     * ANCHOR: Создать список справочника
     * @param  {array} dictionary
     * @public
     */
    const setDictionary = (dictionary) =>
      dictionary.map((item, index) => ({
        label: item.label,
        value: item.id,
        type: item.type,
        index,
      }));

    /**
     * ANCHOR: выбранный период
     * @public
     */
    const currentPeriod = () => {
      // Значение выбранного периода по умолчанию
      const selectPeriod = {
        value: periodDictionary[0].id,
        label: periodDictionary[0].label,
        type: periodDictionary[0].type,
      };

      // Выбран период
      if (params && params.period) {
        const choosePeriod = periodDictionary.find(
          ({ id }) => id === params.period.value
        );
        if (choosePeriod) {
          selectPeriod.value = choosePeriod.id;
          selectPeriod.label = choosePeriod.label;
          selectPeriod.type = choosePeriod.type;
        }
      }

      return selectPeriod;
    };

    /**
     * ANCHOR: выбранный ресурс
     * @param  {array} resource
     * @public
     */
    const resourceSelect = (resource) => {
      if (!resource) {
        const actualIndex = resources.findIndex((node) => !node.supres);
        return {
          value:
            params && params.resource
              ? params.resource.value
              : resources[actualIndex].value,
          label:
            params && params.resource
              ? params.resource.label
              : resources[actualIndex].label,
        };
      }
      const result = resources.find((item) => resource === item.value);

      return {
        value: result.value,
        label: result.label,
      };
    };

    const actualPeriod = currentPeriod();
    // Полномочия модели
    const modelPermissions = ObjectFromEntries(value, permissions);

    /** ANCHOR: Генерируем объект модели */
    const result = {
      categories: resCategories,
      locked: false,
      modelLocked: locked,
      lockedInfo: {
        avatar: '',
        fullName: lockedInfo?.fullName || 'Нет данных',
        username: lockedInfo?.username || 'unknown',
      },
      model: { label, id: value },
      periods: setDictionary(periodDictionary),
      resources: setResources(resources),
      selectPeriod: actualPeriod,
      instance: instanceDictionary,
      selectResource: resourceSelect(data.params.resource),
      headResources: resourcesHead(resources),
      parameters,
      stage: 1,
      permissions: modelPermissions,
      parentValue: model.data.parentValue,
      parentLabel: model.data.parentLabel,
      visible: modelPermissions && Object.keys(modelPermissions).length > 0,
    };

    postMessage({ query: result, dump: model.data.model });
    console.timeEnd('Компиляция модели');
  });
};
