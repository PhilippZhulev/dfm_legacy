import nextId from 'react-id-generator';

const prevState = {};

const virualStore = {
  model: {},
  changeNodes: {},
  selected: {},
  prevSelected: {},
  _id: nextId(),
  _v: 0,
};

const virualStoreVerison = () => virualStore._v;

const virualStoreGetPrev = (name) => prevState[name];

const setVirualStore = async (key, object) => {
  const result = { [key]: {} };

  Object.assign(prevState, virualStore);

  Object.keys(object).forEach((item) => {
    result[key][item] = {
      value: object[item],
      writable: true,
      configurable: true,
      enumerable: true,
    };
  });
  Object.defineProperties(virualStore[key], result[key]);
  Object.assign(virualStore, { _v: (virualStore._v += 1) });
};

export { virualStore, setVirualStore, virualStoreVerison, virualStoreGetPrev };
