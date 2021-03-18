import React from 'react';
import { TestWrapper } from 'helpers';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import KeyValue from '.';

const Component = (props) => (
  <TestWrapper>
    <KeyValue {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

let container = null;

beforeEach(() => {
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

  expect(container.firstChild.className).toMatch('nodeInfo');
  expect(container.firstChild.firstChild.className).toMatch('nodeInfo_label');
  expect(container.firstChild.childNodes[1].className).toMatch(
    'nodeInfo_value'
  );
});

it('Тестирование label', () => {
  act(() => {
    render(<Component label={'Название'} />, container);
  });

  expect(container.firstChild.firstChild.textContent).toMatch('Название');
});

it('Тестирование value', () => {
  act(() => {
    render(<Component value={'Значение'} />, container);
  });

  expect(container.firstChild.childNodes[1].textContent).toMatch('Значение');
});
