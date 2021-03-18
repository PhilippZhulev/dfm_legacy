/**
 * Форматирование числа без научного обозначения больших чисел "е"
 * @component
 * @public
 */
const SciNotation = {
  toFixed: (value) =>
    // eslint-disable-next-line max-params
    String(value).replace(/(-?)(\d*)\.?(\d+)e([+-]\d+)/, (a, b, c, d, e) => (e < 0
        ? `${b}0.${Array(0 - Number(e)).join('0')}${c}${d}`
        : `${b}${c}${d}${Array(Number(e) + 1).join('0')}`)),
};

export default SciNotation;
