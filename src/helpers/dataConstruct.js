/**
 * Формирование лейбла в зависимости от типа периода
 * @param form - данные формы
 * @param quarterList - список кварталов
 * @param monthList - список месяцев
 * @returns {string}
 */
export const periodLabelConstruct = (form, quarterList, monthList) => {
  let label = '';
  if (form.type.value === 'Y') {
    label = form.year || '';
  }

  if (form.type.value === 'Q') {
    label = `${form.quarter?.value || quarterList[0].value} ${form.year || ''}`;
  }

  if (form.type.value === 'M') {
    label = `${form.month?.value || monthList[0].value}.${form.year || ''}`;
  }

  return String(label);
};
