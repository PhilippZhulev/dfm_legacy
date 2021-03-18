import React from 'react';
import { TestWrapper } from 'helpers';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import InfoItem from '.';

const Component = (props) => (
  <TestWrapper>
    <InfoItem {...props} />
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

it('Тестирование classes', () => {
  act(() => {
    render(<Component />, container);
  });

  expect(container.firstChild.className).toMatch('infoItem');
  expect(container.firstChild.firstChild.className).toMatch('infoLabel');
  expect(container.firstChild.childNodes[1].className).toMatch('infoText');
});

it('Тестирование label', () => {
  act(() => {
    render(<Component label={'Название'} />, container);
  });

  expect(container.firstChild.firstChild.textContent).toMatch('Название');
});

it('Тестирование text', () => {
  act(() => {
    render(<Component text={'Значение'} />, container);
  });

  expect(container.firstChild.childNodes[1].textContent).toMatch('Значение');
});
