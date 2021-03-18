export default function getPrecionLabel(num) {
  switch (num) {
    case 1:
      return ' ';
    case 1000:
      return 'тыс. ';
    case 1000000:
      return 'млн. ';
    case 1000000000:
      return 'млрд. ';
    case 1000000000000:
      return 'трлн. ';
    default:
      return '';
  }
}
