import { required } from './index';

/**
 * Проверка заполнения полей
 * @param form - данные формы
 * @returns {boolean|*}
 */
export const checkPeriodAdd = (form) => {
  if (form.type) {
    switch (form.type.value) {
      case 'Y':
        return required(form.year);
      case 'Q':
        return required(form.quarter) || required(form.year);
      case 'M':
        return required(form.month) || required(form.year);
      default:
        return false;
    }
  }

  return false;
};
