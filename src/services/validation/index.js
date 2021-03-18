import isEmail from 'validator/lib/isEmail';
import isInt from 'validator/lib/isInt';
import isIn from 'validator/lib/isIn';
import isURL from 'validator/lib/isURL';

const isEmpty = (value) =>
  value === undefined || value === null || value === '';
const join = (rules) => (value, data) =>
  rules.map((rule) => rule(value, data)).filter((error) => !!error)[0];

export const email = (value) =>
  !isEmpty(value) && !isEmail(value) && 'Invalid email address';

export const url = (value) => !isEmpty(value) && !isURL(value) && 'Invalid URL';

export const required = (value) => isEmpty(value) && 'Required field';

export const checkValid = (
  form,
  mapFieldToHeader,
  requiredFields = Object.keys(mapFieldToHeader) || Object.keys(form)
) => {
  const validation = { status: false, field: '' };
  const fields = requiredFields.length
    ? requiredFields
    : Object.keys(mapFieldToHeader);

  fields.forEach((key) => {
    if (typeof form[key] === 'string') {
      form[key] = form[key].trim();
    }

    validation.status = validation.status || !!required(form[key]);

    if (validation.status && validation.field === '') {
      validation.field = mapFieldToHeader[key] || key;
    }
  });

  return validation;
};

export const checkSameValue = (
  object,
  objectsArray,
  message,
  alreadyIncludes = false
) => {
  const sameValueItems = objectsArray.filter((el) => el.value === object.value);
  return (alreadyIncludes && sameValueItems.length > 1) || sameValueItems.length
    ? { status: true, message }
    : { status: false, message: '' };
};

export const minLength = (min) => (value) =>
  !isEmpty(value) && value.length < min && `Must be at least ${min} characters`;

export const maxLength = (max) => (value) =>
  !isEmpty(value) &&
  value.length > max &&
  `Must be no more than ${max} characters`;

export const integer = (value) => !isInt(value) && 'Must be an integer';

export const oneOf = (values) => (value) =>
  !isIn(value, values) && `Must be one of: ${values.join(', ')}`;

export const match = (field) => (value, data) =>
  data && value !== data[field] && 'Must match';

export const typeOf = (type, param) => (typeof param === type ? param : null);

export const repeatСharacters = (countСharacter) => {
  const regExp = new RegExp(`(.)\\1{${countСharacter},}`, 'gm');
  return (value) =>
    regExp.test(value) &&
    `Нельзя ввести подряд более ${countСharacter} одинаковых символов`;
};

export const repeatGroupСharacters = (countGroup, value) => {
  const regExp = new RegExp(`(.{2,})(?:\\s*\\1){${countGroup}}`, 'gm');
  return regExp.test(value);
};

export const createValidator = (rules) => (data = {}) => {
  const errors = {};
  Object.keys(rules).forEach((key) => {
    const rule = join([].concat(rules[key]));
    const error = rule(data[key], data);
    if (error) {
      errors[key] = error;
    }
  });
  return errors;
};
