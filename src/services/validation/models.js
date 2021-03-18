
import {
  required,
  minLength,
  maxLength,
  repeatСharacters,
  repeatGroupСharacters,
} from './index';

const minLengthSize = 3;
const maxLengthSize = 30;

export const isModelNotValid = (model) => {
  if (required(model.value)) {
    return 'Введите имя модели';
  }

  if (minLength(minLengthSize)(model.value)) {
    return 'В названии не может быть менее трёх символов, напишите название АС';
  }

  if (maxLength(maxLengthSize)(model.value)) {
    return 'В названии не может быть более тридцати символов, напишите название АС';
  }

  if (repeatСharacters(3)(model.value)) {
    return 'В названии не может быть более трёх одинаковых символов подряд, напишите название АС';
  }

  if (repeatGroupСharacters(2, model.value)) {
    return 'В названии не может быть повторяющейся последовательности символов, напишите название АС';
  }

  if (required(model.block.value)) {
    return 'Выберите блок';
  }

  if (required(model.tribe.value)) {
    return 'Выберите трайб';
  }

  return false;
};
