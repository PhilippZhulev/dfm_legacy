// Todo произвести ревью
export const isResourceNotValid = (resource) => {
  let msg = !resource.model ? 'Выберите модель-источник' : '';

  msg = !msg && !resource.resource?.value ? 'Выберите копируемый узел' : msg;
  msg = !msg && !resource.name ? 'Введите имя нового узла' : msg;

  return msg;
};
