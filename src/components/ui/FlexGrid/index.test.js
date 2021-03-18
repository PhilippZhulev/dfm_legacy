import React from 'react';
import { TestWrapper } from 'helpers';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import FlexGrid from '.';

const Component = (props) => (
  <TestWrapper>
    <FlexGrid {...props}>{props.children}</FlexGrid>
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
    render(<Component>{['Grid Content']}</Component>, container);
  });

  expect(container.firstChild.textContent).toBe('Grid Content');
});

it('Проверка css классов', () => {
  act(() => {
    render(<Component>{['Grid Content']}</Component>, container);
  });

  expect(container.firstChild.className).toMatch('root');
});

it('Проверка стилей', () => {
  act(() => {
    render(<Component>{['Grid Content']}</Component>, container);
  });
  const styles = getComputedStyle(container.firstChild);
  expect(styles.display).toMatch('flex');
  expect(styles.flexWrap).toMatch('wrap');
});
