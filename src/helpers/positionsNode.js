import { randomInteger } from 'helpers';

// Связывание групп
const grouplinker = (resources, item, g) => {
  if (item.supres) {
    let map = [];
    const groupRes = item.supres.resources;
    const res = resources;
    const lin = res.filter(({ value }) => groupRes.includes(value));

    lin.forEach((el) => {
      map = map.concat(el.uses);
    });

    return lin.map(({ value }) => value).concat(map);
  }

  g.forEach((group) => {
    if (item.uses.find((el) => group.uses.includes(el))) {
      item.uses = item.uses.concat(group.id);
    }
  });

  return item.uses;
};

const createPos = () => randomInteger(-50, 50);

const xPos = (link) => {
  if (link && link.length > 0) {
    return randomInteger(30, 30);
  }

  return randomInteger(-35, -5);
};

// Получаем координаты узла
const getPositions = (node, link) => {
  if (!node.position.x || !node.position.y) {
    node.position = {
      ...node.position,
      x: createPos(),
      y: xPos(link),
      z: createPos(),
    };
  }

  return {
    ...node.position,
    x: node.position.x || node.position.fx,
    y: node.position.y || node.position.fy,
    z: node.position.z,
  };
};

const positionsNode = (resources, node) => {
  const gruped = [];
  resources.forEach((item) => {
    if (item.supres) {
      const groupRes = item.supres.resources;
      gruped.push({ id: item.value, uses: groupRes });
    }
  });

  const link = grouplinker(resources, node, gruped);
  return getPositions(node, link);
};

export default positionsNode;
