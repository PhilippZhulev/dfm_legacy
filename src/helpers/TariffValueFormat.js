/**
 * Форматирование значения тарифа
 * @component
 * @public
 */
const TariffValueFormat = (value = '') => {
  const findValue = value.match(/^-{0,1}\d+(\.0*\d{1,2})?/gm);

  if (findValue) {
    let current = findValue[0];
    const lenFindValue = current.length;
    const lastNumberFindValue = Number(current[lenFindValue - 1]);

    if (lenFindValue < value.length) {
      const nextNumberFindValue = value[lenFindValue];

      if (nextNumberFindValue > 4) {
        current =
          current.substring(0, lenFindValue - 1) + (lastNumberFindValue + 1);
      }
    }

    return current;
  }

  return 0;
};

export default TariffValueFormat;
