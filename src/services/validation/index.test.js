import * as v from '.';
import * as vm from './models';
import * as vr from './reference';
import * as vres from './resources';

test('email', () => {
  expect(v.email('invalid')).toBeTruthy();
  expect(v.email('invalid@invalid')).toBeTruthy();
  expect(v.email('valid@valid.com')).toBeFalsy();
});

test('url', () => {
  expect(v.url('invalid')).toBeTruthy();
  expect(v.url('valid.com')).toBeFalsy();
  expect(v.url('valid.com/test')).toBeFalsy();
  expect(v.url('http://valid.com')).toBeFalsy();
});

test('required', () => {
  expect(v.required('')).toBeTruthy();
  expect(v.required(null)).toBeTruthy();
  expect(v.required(undefined)).toBeTruthy();
  expect(v.required('valid')).toBeFalsy();
});

test('minLength', () => {
  expect(v.minLength(5)('1234')).toBeTruthy();
  expect(v.minLength(5)('12345')).toBeFalsy();
});

test('maxLength', () => {
  expect(v.maxLength(5)('123456')).toBeTruthy();
  expect(v.maxLength(5)('12345')).toBeFalsy();
});

test('integer', () => {
  expect(v.integer('invalid')).toBeTruthy();
  expect(v.integer('2.3')).toBeTruthy();
  expect(v.integer('.5')).toBeTruthy();
  expect(v.integer('1')).toBeFalsy();
});

test('oneOf', () => {
  expect(v.oneOf(['valid', 'test'])('invalid')).toBeTruthy();
  expect(v.oneOf(['valid', 'test'])('valid')).toBeFalsy();
  expect(v.oneOf(['valid', 'test'])('test')).toBeFalsy();
});

test('match', () => {
  expect(v.match('invalid')('123', { password: '321' })).toBeTruthy();
  expect(v.match('password')('123', { password: '321' })).toBeTruthy();
  expect(v.match('password')('321', { password: '321' })).toBeFalsy();
});

test('createValidator', () => {
  const email = 'test@example.com';

  const validator = v.createValidator({
    email: [v.required, v.email],
    password: [v.required, v.minLength(6)],
    passwordRepeat: [v.match('password'), v.required],
  });

  expect(typeof validator).toBe('function');

  expect(
    validator({
      email: '',
      password: '',
      passwordRepeat: null,
    })
  ).toEqual(
    {
      email: v.required(''),
      password: v.required(''),
      passwordRepeat: v.match('a')('c', { a: 'b' }),
    },
    'Expected to follow the validation order'
  );

  expect(
    Object.keys(
      validator({
        email: 'invalid',
        password: '12345',
        passwordRepeat: '',
      })
    )
  ).toEqual(['email', 'password', 'passwordRepeat']);

  expect(
    Object.keys(
      validator({
        email: email,
        password: '12345',
        passwordRepeat: '',
      })
    )
  ).toEqual(['password', 'passwordRepeat']);

  expect(
    Object.keys(
      validator({
        email: email,
        password: '123456',
        passwordRepeat: '654321',
      })
    )
  ).toEqual(['passwordRepeat']);

  expect(
    validator({
      email: email,
      password: '123456',
      passwordRepeat: '123456',
    })
  ).toEqual({});

  expect(validator()).toEqual({
    email: v.required(''),
    password: v.required(''),
    passwordRepeat: v.required(''),
  });
});

/** Test models validator */
test('isModelNotValid', () => {
  expect(
    vm.isModelNotValid({
      value: '',
      block: { value: '' },
      tribe: { value: '' },
    })
  ).toBeTruthy();
  expect(
    vm.isModelNotValid({
      value: '123',
      block: { value: '' },
      tribe: { value: '' },
    })
  ).toBeTruthy();
  expect(
    vm.isModelNotValid({
      value: '123',
      block: { value: '321' },
      tribe: { value: '' },
    })
  ).toBeTruthy();
  expect(
    vm.isModelNotValid({
      value: '123',
      block: { value: '321' },
      tribe: { value: '222' },
    })
  ).toBeFalsy();
});

/** Test reference validator */
test('isCategoryNotValid', () => {
  const empty1 = [{ value: '', label: '321' }];
  expect(vr.isCategoryNotValid(empty1)).toBeTruthy();

  const empty2 = [{ value: '123', label: '' }];
  expect(vr.isCategoryNotValid(empty2)).toBeTruthy();

  const notEmpty = [{ value: '123', label: '321' }];
  expect(vr.isCategoryNotValid(notEmpty)).toBeFalsy();

  const double = [
    {
      value: 'one',
      label: '321',
    },
    {
      value: 'two',
      label: '321',
    },
    {
      value: 'three',
      label: '321',
    },
    {
      value: 'four',
      label: '321',
    },
    {
      value: 'two',
      label: '321',
    },
  ];

  expect(vr.isCategoryNotValid(double)).toBeTruthy();
});

test('isPeriodNotValid', () => {
  const empty1 = [{ label: '' }, { label: '321' }];

  expect(vr.isPeriodNotValid(empty1)).toBeTruthy();
  const notEmpty = [{ label: '321' }, { label: '123' }];

  expect(vr.isPeriodNotValid(notEmpty)).toBeFalsy();

  const double = [
    { label: 'one' },
    { label: 'two' },
    { label: 'three' },
    { label: 'four' },
    { label: 'two' },
  ];

  expect(vr.isPeriodNotValid(double)).toBeTruthy();
});

test('isDeletedPeriodsMessage', () => {
  const periods = [
    { label: 'one' },
    { label: 'two' },
    { label: 'three' },
    { label: 'four' },
  ];

  const deleteData = new Map();
  deleteData.set({ label: 'one' });
  deleteData.set({ label: 'two' });
  deleteData.set({ label: 'three' });
  deleteData.set({ label: 'four' });

  expect(vr.isDeletedPeriodsMessage(periods, deleteData)).toBeTruthy();

  const deleteData2 = new Map();
  deleteData2.set({ label: 'one' });
  deleteData2.set({ label: 'two' });
  deleteData2.set({ label: 'three' });

  expect(vr.isDeletedPeriodsMessage(periods, deleteData2)).toBeFalsy();
});

test('isMetricNotValid', () => {
  const empty1 = [{ value: '', label: '', cats: [] }];
  expect(vr.isMetricNotValid(empty1)).toBeTruthy();

  const empty2 = [{ value: '123', label: '', cats: [] }];
  expect(vr.isMetricNotValid(empty2)).toBeTruthy();

  const empty3 = [{ value: '123', label: '321', cats: [] }];
  expect(vr.isMetricNotValid(empty3)).toBeTruthy();

  const notEmpty = [{ value: '123', label: '321', cats: ['1', '2'] }];
  expect(vr.isMetricNotValid(notEmpty)).toBeFalsy();

  const double = [
    {
      value: '123',
      label: '321',
      cats: ['1', '2'],
    },
    {
      value: '456',
      label: '654',
      cats: ['1', '2'],
    },
    {
      value: '789',
      label: '987',
      cats: ['1', '2'],
    },
    {
      value: '123',
      label: '135',
      cats: ['1', '2'],
    },
  ];

  expect(vr.isMetricNotValid(double)).toBeTruthy();
});

test('isParametersNotValid', () => {
  const empty1 = [{ value: '', label: '321' }];
  expect(vr.isParametersNotValid(empty1)).toBeTruthy();

  const empty2 = [{ value: '123', label: '' }];
  expect(vr.isParametersNotValid(empty2)).toBeTruthy();

  const notEmpty = [{ value: '123', label: '321' }];
  expect(vr.isParametersNotValid(notEmpty)).toBeFalsy();

  const double = [
    {
      value: 'one',
      label: '321',
    },
    {
      value: 'two',
      label: '321',
    },
    {
      value: 'three',
      label: '321',
    },
    {
      value: 'four',
      label: '321',
    },
    {
      value: 'two',
      label: '321',
    },
  ];

  expect(vr.isParametersNotValid(double)).toBeTruthy();
});

/** Test resource validator */
test('isResourceNotValid', () => {
  expect(
    vres.isResourceNotValid({
      model: '',
      resource: '',
      name: '',
    })
  ).toBeTruthy();
  expect(
    vres.isResourceNotValid({
      model: '123',
      resource: '',
      name: '',
    })
  ).toBeTruthy();
  expect(
    vres.isResourceNotValid({
      model: '123',
      resource: '321',
      name: '',
    })
  ).toBeTruthy();
  expect(
    vres.isResourceNotValid({
      model: '123',
      resource: '321',
      name: '222',
    })
  ).toBeFalsy();
});
