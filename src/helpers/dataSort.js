/**
 * Сортировка массива с периодами
 * @param a
 * @param b
 * @returns {number}
 */
const preValue = (item) => {
  switch (item.type) {
    case 'M':
      return Number(item.year) * 100 + Number(item.month);
    case 'Q':
      return (
        Number(item.year) * 1000 +
        Number.parseInt(item.quarter.match(/\d+/), 10)
      );
    default:
      return Number(item.year);
  }
};

export const periodsSort = (a, b) => {
  const period1 = preValue(a);
  const period2 = preValue(b);

  if (period1 < period2) {
    return -1;
  }
  if (period1 > period2) {
    return 1;
  }
  return 0;
};
