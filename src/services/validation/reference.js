import { required } from './index';

export const isCategoryNotValid = (elements) => {
  const unit = new Map();

  for (let i = 0; i < elements.length; i++) {
    if (!elements[i].value.trim()) {
      return 'Не у всех категорий указан код. Сохранение невозможно';
    }

    if (!elements[i].label.trim()) {
      return 'Не у всех категорий указано название. Сохранение невозможно';
    }

    if (unit.has(elements[i].value)) {
      return 'Коды справочников не должны совпадать';
    }

    unit.set(elements[i].value);
  }

  return false;
};

export const isPeriodNotValid = (elements) => {
  const unit = new Map();

  for (let i = 0; i < elements.length; i++) {
    if (!elements[i].label.trim()) {
      return 'Не у всех периодов указано название. Сохранение невозможно';
    }

    if (unit.has(elements[i].label)) {
      return 'Названия периодов не должны совпадать';
    }

    unit.set(elements[i].label);
  }
  return false;
};

export const isDeletedPeriodsMessage = (periods, deleteData) => {
  if (periods.length === deleteData.size) {
    return 'Удаление невозможно. У модели должен остаться хотя бы один период';
  }

  return false;
};

export const isMetricNotValid = (elements) => {
  const unit = new Map();

  for (let i = 0; i < elements.length; i++) {
    if (!elements[i].value.trim()) {
      return 'Не у всех метрик указан код. Сохранение невозможно';
    }

    if (!elements[i].label.trim()) {
      return 'Не у всех метрик указано название. Сохранение невозможно';
    }

    if (!elements[i].cats.length) {
      return 'Не у всех метрик указаны категории. Сохранение невозможно';
    }

    if (unit.has(elements[i].value)) {
      return 'Коды метрик не должны совпадать';
    }

    unit.set(elements[i].value);
  }

  return false;
};

export const isParametersNotValid = (element) => {
  if (required(element.value?.trim())) {
    return 'Не указан код. Сохранение невозможно';
  }

  if (required(element.label?.trim())) {
    return 'Не указано название. Сохранение невозможно';
  }

  if (required(element.description?.trim())) {
    return 'Не указано описание. Сохранение невозможно';
  }

  if (Number.isNaN(Number(element.volume)) || required(element.volume)) {
    return 'Значение должно быть числом';
  }

  return false;
};

export const isNodeParametersNotValid = (element) =>
  isParametersNotValid(element);
