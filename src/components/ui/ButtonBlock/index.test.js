import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode, render } from 'react-dom';
import ButtonBlock from '.';

const Component = (props) => (
  <TestWrapper>
    <ButtonBlock {...props} />
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

it('Тестирование children', () => {
  act(() => {
    render(<Component>{['test-1']}</Component>, container);
  });
  expect(container.textContent).toBe('test-1');

  act(() => {
    render(<Component>{['test-2']}</Component>, container);
  });
  expect(container.textContent).not.toBe('test-1');

  act(() => {
    render(<Component />, container);
  });
  expect(container.textContent.length).toBe(0);
});

it('Тестирование classes', () => {
  act(() => {
    render(
      <Component classes={{ buttonBlock: 'buttonBlockItem' }} />,
      container
    );
  });
  expect(container.firstChild.className).toMatch('buttonBlockItem');
});
