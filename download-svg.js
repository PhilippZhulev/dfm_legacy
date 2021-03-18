const fs = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require('node-fetch');
// eslint-disable-next-line import/no-extraneous-dependencies
const prettier = require('prettier');

/** Токен для фигмы */
const ACCESS_TOKEN = '41262-dc66865b-5a87-41ab-80d7-f193cf301da6';
/** фаил фигмы https://www.figma.com/file/:fileId/Heavy-Mouse-Design-System?:nodeId=0%3A1 */
const FILE_ID = 'r3caTrSeiHso0WzadSSTGx';
/** id node с иконками */
const NODE_ID = '58%3A67';
/** путь для апи фигмы */
const API__URL = 'https://api.figma.com';

/** Настройки для fetch */
const options = {
  method: 'GET',
  headers: { 'X-FIGMA-TOKEN': ACCESS_TOKEN },
};
/** Путь до иконок */
const basePath = path.join(__dirname, 'public/icons');
/** Название алиаса настроить в webpack */
const aliasName = 'Icons';
/** Путь до ui-icon */
const uiIconPath = path.join(__dirname, 'src/components/ui/icon');

/** Иконки из фигмы */
let components;
/** Ид иконок */
let ids;
/** Мапа name => alias/name.svg */
const mapFiles = new Map();

fetch(`${API__URL}/v1/files/${FILE_ID}?ids=${NODE_ID}`, options)
  .then((res) => res.json())
  .then((res) => {
    components = res.components;
  })
  .then(() => {
    ids = Object.keys(components);
    return getSvgImages(ids);
  })
  .then((images) => {
    return Promise.all(ids.map((id) => getSvgTextByUrl(images[id])));
  })
  .then((svg) => {
    ids.forEach((id, index) => {
      const name = components[id].name.split(' / ').pop();
      const path = `${basePath}/${name.toLowerCase()}.svg`;
      const pathAlias = `${aliasName}/${name.toLowerCase()}.svg`;

      mapFiles.set(name, pathAlias);

      fs.writeFile(path, svg[index], () => {
      });
    });

    createList();
  });

const getSvgTextByUrl = (svgUrl) => fetch(svgUrl).then((res) => res.text());

function getSvgImages(ids) {
  return fetch(
    `${API__URL}/v1/images/${FILE_ID}?ids=${ids}&format=svg`,
    options,
  )
    .then((res) => res.json())
    .then((res) => res.images);
}

const createList = () => {
  const array = new Array(...mapFiles);
  const componentSrc = `
    class List {
      ${array
    .map(
      ([name, path], id) => `
      /** ${Object.values(components)[id].description} */
      ${name.toUpperCase()} = require('${path}').default;`,
    )
    .join('')}
    }

    export const list = new List();
`;
  fs.writeFile(
    `${uiIconPath}/list.js`,
    prettier.format(componentSrc),
    function(err) {
      if (err) console.log(err);
    },
  );
};
