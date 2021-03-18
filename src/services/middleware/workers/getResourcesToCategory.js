/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */

/**
 * Получение листа ресурсов согласно категории
 * @public
 */
export default () => {
  self.addEventListener('message', ({ data }) => {
    console.time('Компиляция листа ресурсов по категориям');

    const { resources } = data.model;
    const { period, resource, category } = data.params;

    const thisResource = resources.find((el) => el.value === resource);

    const result = resources
      .filter(
        (element) => element.category === category && element.value !== resource
      )
      .map((element) => ({
        label: element.label,
        id: element.value,
        state:
          thisResource.uses.find((el) => el === element.value) !== undefined,
      }));

    postMessage(result);
    console.timeEnd('Компиляция листа ресурсов по категориям');
  });
};
