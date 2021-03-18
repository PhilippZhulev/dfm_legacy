import React from 'react';
import { TestWrapper } from 'helpers';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import CustomTitle from '.';

const Component = (props) => (
  <TestWrapper>
    <CustomTitle {...props}>{props.children}</CustomTitle>
  </TestWrapper>
);

jest.useFakeTimers();

let container = null;
beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Тестирование props children', () => {
  act(() => {
    render(<Component type={'h2'}>Title-h2</Component>, container);
  });

  expect(container.querySelector('div').textContent).toBe('Title-h2');

  act(() => {
    render(<Component type={'h3'}>Title-h3</Component>, container);
  });

  expect(container.querySelector('div').textContent).toBe('Title-h3');
});

it('Тестирование props content', () => {
  act(() => {
    render(<Component type={'h3'} content={'test-content'} />, container);
  });

  expect(container.querySelector('div').textContent).toBe('test-content');
});

it('Проверка css классов', () => {
  act(() => {
    render(<Component type={'h2'}>Title-h2</Component>, container);
  });

  expect(container.querySelector('div').className).toMatch('makeStyles-h2');

  act(() => {
    render(<Component type={'h3'}>Title-h2</Component>, container);
  });

  expect(container.querySelector('div').className).toMatch('makeStyles-h3');
});
