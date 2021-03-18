/**
 * Форматирование денег
 * @component
 * @public
 */
const MoneyFormat = (value = 0, precision) => {
  const pre = precision || 4;
  const units = ['', ' тыс.', ' млн', ' млрд', ' трлн'];

  let volume = Number(value);

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

export default MoneyFormat;
