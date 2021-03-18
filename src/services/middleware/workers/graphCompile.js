/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */

/**
 * Компиляция данных графа
 * @public
 */
export default () => {
  self.addEventListener('message', ({ data }) => {
    console.time('Компиляция данных графа');

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

    /** Получаем элементы модели */
    const {
      resources,
      resCategories,
    } = data.model;

    /** Получаем параметры */
    const { period } = data.params;
    const gruped = [];

    // Связывание групп
    const groupLinker = (item, g) => {
      if (item.supres) {
        let links = [];
        const groupRes = new Set(item.supres.resources);
        resources
          .filter(({ value }) => groupRes.has(value))
          .forEach(({ uses }) => {
            links = links.concat(uses);
          });

        return links;
      }

      g.forEach((group) => {
        const mapGroup = new Set(group.uses);
        if (item.uses.find((el) => mapGroup.has(el))) {
          item.uses = item.uses.concat(group.id);
        }
      });

      return item.uses;
    };

    resources.forEach((item) => {
      if (item.supres) {
        const groupRes = item.supres.resources;
        gruped.push({ id: item.value, uses: groupRes });
      }
    });

    const result = {
      nodes: resources.map((item) => {
        const category = resCategories.find(
          ({ value }) =>
            value === item.category
        );

        const periodData = item.budcycles.find(({ id }) => id === Number(period));
        const { tariffs } = periodData;
        const tariffsValue = tariffs.length > 0 ? tariffs[0].unitCost : 0;
        const cat = resCategories.find(({ value }) => value === item.category);

        return {
          id: item.value,
          name: item.label,
          children: item.supres ? item.supres.resources : [],
          category: cat && cat.label,
          link: groupLinker(item, gruped),
          color: (category && category.color) || '#fff',
          grouper: !!item.supres,
          tariffValue: MoneyFormat(tariffsValue),
          tariffValueNoFormat: tariffsValue,
          value: periodData.totals.full,
          values: periodData.totals,
          formatValue: MoneyFormat(periodData.totals.full),
          c2d: item.position.fx !== null && item.position.fy !== null,
          position: {
            x: item.position.x || item.position.fx,
            y: item.position.y || item.position.fy,
            z: item.position.z,
          },
          popUp: !item.supres ?
            [
              {
                label: 'Имя узла',
                text: '#{name}',
              },
              {
                label: 'ТСО узла',
                text: '#{formatValue}',
              },
              {
                label: 'Тариф',
                text: '#{tariffValue}',
              },
              {
                label: 'Категория',
                text: '#{category}',
              },
            ] :
            [
              {
                label: 'Имя группы',
                text: '#{name}',
              },
              {
                label: 'ТСО группы',
                text: '#{formatValue}',
              },
              {
                label: 'Содержит',
                text: resources
                  .filter(
                    (el) =>
                      item.supres.resources.indexOf(el.value) !== -1
                  )
                  .map((element) =>
                    ` ${element.label}`),
              },
            ],
        };
      }),
    };


    postMessage(result);
    console.timeEnd('Компиляция данных графа');
  });
};
