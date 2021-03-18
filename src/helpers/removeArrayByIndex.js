const removeArrayByIndex = (arr, ...args) => {
  const set = new Set(args);
  return arr.filter((v, k) => !set.has(k));
};

export default removeArrayByIndex;
