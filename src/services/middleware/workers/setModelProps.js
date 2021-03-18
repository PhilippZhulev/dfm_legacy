/* eslint-disable */

/**
 * Сохранение свойств модели
 * @public
 */
export default () => {
  self.addEventListener('message', ({ data }) => {
    console.time('Сохранение свойств модели');

    const { model } = data;
    const { props, type } = data.params;

    const resIdenx = model.resources.findIndex(
      (element) => element.value === props.resource
    );
    const item = resIdenx !== -1 ? model.resources[resIdenx] : null;

    // Текущий период
    const periodIndex = item.budcycles.findIndex(({ id }) => id === props.period);

    /** Сохранение информации об узле */
    if (type === 'nodeInfo') {
      /** Найти узел для изменения */
      switch (props.index) {
        case 0:
          item.label = props.value;
          break;
        case 1:
          item.description = props.value;
          break;
        case 2:
          item.category = props.value;
          break;
        case 3:
          item.lifeTime = Number(props.value);
          break;
        default:
          return new Error('Поле не найдено');
      }
    }

    /** Сохранить линки ресурсов */
    if (type === 'categoryManagment') {
      // Узел потребления
      const targetResource = model.resources.find(
        ({ value }) => value === props.resourceId
      );

      /** Найти узел для изменения */
      if (props.checked === true) {
        // Доступные ресурсы узла
        const availableMetrics =
          targetResource.budcycles.find(({ id }) => id === props.period).available;

        const mapCategory = model.resCategories?.reduce((summary, current) => {
          summary[current.value] = current;
          return summary;
        }, {});

        // Параметры данных потребления ресурса
        item.budcycles[periodIndex].consumptions.push({
          resourceId: targetResource.value,
          metrics: availableMetrics.map(({ metricId }) => metricId),
          volumes: availableMetrics.map(({ metricId }) => ({
            metricId: metricId,
            rule: '',
            volume: 0,
          })),
          calcType: props.calcType || mapCategory[item.category]?.calcTypes[0],
          type: null,
          paymentCalc: {
            fraction: 0,
            result: 0,
          },
        });

        // Добавляем в массив используемых ресурсов
        item.uses.push(targetResource.value);
      } else {
        // Удаление элемента потребления ресурса
        item.budcycles[periodIndex].consumptions = item.budcycles[periodIndex]
          .consumptions.filter((el) => el.resourceId !== targetResource.value);

        // Удаление элемента из массива используемых ресурсов
        item.uses = item.uses.filter((el) => el !== targetResource.value);
      }
    }

    /** Сохранить метрику ресурса */
    if (type === 'categoryMetric') {
      const consIndex = item.budcycles[periodIndex].consumptions.findIndex(
        (element) => props.id === element.resourceId
      );

      const volumeIndex = item.budcycles[periodIndex].consumptions[consIndex]
        .volumes.findIndex((element) => element.metricId === props.metric);

      if (volumeIndex === -1) {
        const volume = {
          metricId: props.metric,
          rule: props.value,
          volume: 0,
        };
        item.budcycles[periodIndex].consumptions[consIndex].volumes.push(
          volume
        );
      } else {
        item.budcycles[periodIndex].consumptions[consIndex].volumes[
          volumeIndex
        ].rule = props.value;
      }
    }

    /** Сохранить процент потребления ресурса */
    if (type === 'paymentConsumption') {
      const consIndex = item.budcycles[periodIndex].consumptions.findIndex(
        (element) => props.id === element.resourceId
      );

      if (consIndex === -1) {
        item.budcycles[periodIndex].consumptions[consIndex].paymentCalc.push({
          fraction: props.value,
          result: 0,
        });
      } else {
        if (!item.budcycles[periodIndex].consumptions[consIndex].paymentCalc) {
          item.budcycles[periodIndex].consumptions[consIndex].paymentCalc = {
            fraction: props.value,
          };
        } else {
          item.budcycles[periodIndex].consumptions[
            consIndex
          ].paymentCalc.fraction = props.value;
        }
      }
    }

    /** Сохранить метрику */
    if (type === 'metric') {
      const metric = props.newMetric[props.index];
      const periodData = item.budcycles[periodIndex];

      if (metric.state === true) {
        const defaultTemp = (value) => ({
          color: '',
          metricId: metric.value,
          volume: value,
        });

        item.metrics.push(metric.value);

        periodData.available.push(defaultTemp(metric.availableValue));
        periodData.depreciated.push(defaultTemp(metric.depreciatedValue));
        periodData.purchased.push(defaultTemp(metric.purchasedValue));
        periodData.required.push(defaultTemp(metric.requiredValue));
        periodData.tariffs.push({
          metricId: metric.value,
          unitCost: metric.tariffValue,
        });
        periodData.proportions.push({
          metricId: metric.value,
          fraction: 1,
        });
        periodData.variable.push({
          metricId: metric.value,
          rates: [
            { costId: 'amort', price: 0 },
            { costId: 'capex', price: 0 },
            { costId: 'opex', price: 0 },
          ],
        });
      } else {
        const removeMetric = (key) =>
          (periodData[key] = periodData[key].filter(
            (element) => element.metricId !== metric.value
          ));

        [
          'available',
          'depreciated',
          'purchased',
          'required',
          'tariffs',
          'proportions',
          'variable',
        ].map((element) => {
          removeMetric(element);
        });

        item.metrics = item.metrics.filter((item) => item !== metric.value);
      }
    }

    if (type === 'metricFixedTarrif') {
      item.fixedTariff = props.checked;
      item.budcycles[periodIndex].fixedTariff = props.checked;
    }

    if (type === 'directСost') {
      item.budcycles[
        periodIndex
      ].fixed = props.value.map(({ costId, price }) => ({ costId, price }));
    }

    if (type === 'directСostVar') {
      props.value.forEach((element) => {
        if (element.variable !== 0) {
          const metricIndex = item.budcycles[periodIndex].variable.findIndex(
            ({ metricId }) => metricId === element.variable.metricId
          );

          item.budcycles[periodIndex].variable[metricIndex] = element.variable;
        }
      });
    }

    if (type === 'metricProvides') {
      const index = item.budcycles[periodIndex].available.findIndex(
        ({ metricId }) => metricId === props.value.value
      );

      if (props.property === 'availableValue') {
        item.budcycles[periodIndex].available[index].volume =
          props.value.availableValue;
      } else if (props.property === 'tariffValue') {
        item.budcycles[periodIndex].tariffs[index].unitCost =
          props.value.tariffValue;
      } else if (props.property === 'requiredValue') {
        item.budcycles[periodIndex].required[index].volume =
          props.value.requiredValue;
      } else if (props.property === 'depreciatedValue') {
        item.budcycles[periodIndex].depreciated[index].volume =
          props.value.depreciatedValue;
      } else if (props.property === 'proportionsValue') {
        item.budcycles[periodIndex].proportions[index].fraction =
          props.value.proportionsValue;
      }
    }

    if (type === 'changeType') {
      const consumption = item.budcycles[periodIndex].consumptions.find(
        ({ resourceId }) => resourceId === props.resourceId
      );

      consumption.type = props.type;
    }

    if (type === 'changeCalcType') {
      const consumption = item.budcycles[periodIndex].consumptions.find(
        ({ resourceId }) => resourceId === props.resourceId
      );

      consumption.calcType = props.calcType;
    }

    if (type === 'addInst') {
      // Индекс элемента потребления ресурса соответствующий идентификатору узла и среде разработки
      let ind = item.budcycles[periodIndex].consumptions.findIndex(
        ({ resourceId }) => resourceId === props.id
      );
      if (ind === -1) {
        // Добавление нового элемента потребления ресурса
        item.budcycles[periodIndex].consumptions.push({
          resourceId: props.id,
          type: null,
          metrics: [],
          volumes: [],
        });

        // Обновление индекса элемента потребления ресурса
        ind = item.budcycles[periodIndex].consumptions.length - 1;
      }

      // Метрика потребления ресурса
      const consMetric = item.budcycles[periodIndex].consumptions[
        ind
      ].volumes.find(({ metricId }) => metricId === props.metric);
      if (!consMetric) {
        // Добавление метрика в массив потребления метрики
        item.budcycles[periodIndex].consumptions[ind].metrics.push(
          props.metric
        );
        // Добавление метрики со значениями
        item.budcycles[periodIndex].consumptions[ind].volumes.push({
          metricId: props.metric,
          rule: '',
          volume: 0,
        });
      }
    }

    if (type === 'deleteInst') {
      // Индекс элемента потребления ресурса соответствующий идентификатору узла и среде разработки
      const ind = item.budcycles[periodIndex].consumptions.findIndex(
        ({ resourceId }) => resourceId === props.id
      );

      if (ind !== -1) {
        // Потребление ресурса
        const consump = item.budcycles[periodIndex].consumptions[ind];

        // Удаление метрики со значением
        item.budcycles[periodIndex].consumptions[
          ind
        ].volumes = consump.volumes.filter(
          ({ metricId }) => metricId !== props.metric
        );
        // Удаление метрики из массива
        item.budcycles[periodIndex].consumptions[
          ind
        ].metrics = consump.metrics.filter((m) => m !== props.metric);

        // Удаление элемента потребления ресурса
        item.budcycles[periodIndex].consumptions = item.budcycles[
          periodIndex
        ].consumptions.filter(
          ({ metrics, volumes }) => metrics.length > 0 && volumes.length > 0
        );
      }
    }

    if (type === 'changeInst') {
      // Индекс элемента потребления ресурса соответствующий идентификатору узла и среде разработки
      const ind = item.budcycles[periodIndex].consumptions.findIndex(
        ({ resourceId }) => resourceId === props.id
      );

      // Индекс метрики элемента потребления ресурса
      const metricIndex = item.budcycles[periodIndex].consumptions[
        ind
      ].volumes.findIndex(({ metricId }) => metricId === props.metric);

      // Изменение значения метрики потребления ресурса
      item.budcycles[periodIndex].consumptions[ind].volumes[metricIndex].rule =
        props.value;
    }

    // Параметры узла
    if (type === 'nodeParameter') {
      item.parameters = props.query;
    }

    if (type === 'graph.c') {
      props.arrayNodes.forEach((node) => {
        const target = model.resources.find(
          (element) => element.value === node.id
        );
        target.position = node.position;
      });
    }

    if (type === 'guides.metric') {
      model.metricDictionary = props.query;
    }

    if (type === 'guides.category') {
      model.resCategories = props.query;
    }

    if (type === 'guides.period') {
      model.periodDictionary = props.query;
    }

    if (type === 'guides.parameter') {
      model.parameters = props.query;
    }

    postMessage(model);
    console.timeEnd('Сохранение свойств модели');
  });
};
