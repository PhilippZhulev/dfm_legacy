/**
 * Форматирование имени
 * @param {string} text
 * @return {string}
 * @public
 */
const nameFormat = (text) => {
  if (typeof text === 'string') {
    const arr = text.split(' ');

    const baseName = arr.length > 1 ? `${arr[0]} ${arr[1].charAt(0)}.` : text;

    if (arr.length > 2) {
      return `${baseName} ${arr[2].charAt(0)}.`;
    }

    return baseName;
  }
  return '';
};

export default nameFormat;
