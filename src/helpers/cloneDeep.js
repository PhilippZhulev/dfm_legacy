/**
 * Глубокое клонирование
 * @param  {Object} inObject
 * @public
 */
const cloneDeep = (inObject) => {
  if (!(typeof inObject instanceof Object) || inObject === null) {
    return inObject;
  }

  const outObject = Array.isArray(inObject) ? [] : {};

  Object.keys(inObject).forEach((key) => {
    const value = inObject[key];
    outObject[key] = cloneDeep(value);
  });

  return outObject;
};

export default cloneDeep;
