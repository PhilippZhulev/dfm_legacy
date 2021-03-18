/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */

/**
 * Получение листа ресурсов
 * @public
 */
export default () => {
  self.addEventListener('message', ({ data }) => {
    console.time('Компиляция листа ресурсов');

    const resources = data.response;

    const result = {
      resources: resources.data.map(({ label, value, supres, category, link }) => ({
        label,
        value,
        category,
        group: !!supres,
        children: supres && supres.resources,
        link: link || {},
        include:
          typeof resources.data.find(
            (item) =>
              item.supres && item.supres.resources.indexOf(value) !== -1
          ) !== 'undefined',
        })),
    };

    postMessage(result);
    console.timeEnd('Компиляция листа ресурсов');
  });
};
