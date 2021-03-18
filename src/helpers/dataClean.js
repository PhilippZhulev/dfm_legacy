import { required } from '../services/validation';

/**
 * Очистка объекта периода от лишней информации и пустых полей
 * @param form
 * @returns {any}
 */
export const periodDataClean = (form) => {
  const data = JSON.parse(JSON.stringify(form));

  Object.keys(data).forEach(
    (item) => (data[item] = data[item].value || data[item])
  );

  Object.keys(data).forEach(
    (item) => required(data[item]) && delete data[item]
  );

  return data;
};

export const periodPreSaved = (form) => {
  delete form.checked;
  delete form.new;
  return form;
};
