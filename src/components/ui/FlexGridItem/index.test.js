import React from 'react';
import { TestWrapper } from 'helpers';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import FlexGridItem from '.';

const Component = (props) => (
  <TestWrapper>
    <FlexGridItem {...props}>{props.children}</FlexGridItem>
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
    render(
      <Component
        width={'200px'}
        height={'300px'}
        padding={'20px 30px 40px 50px'}>
        {['Grid Content']}
      </Component>,
      container
    );
  });
  const styles = getComputedStyle(container.firstChild);
  expect(styles.width).toMatch('200px');
  expect(styles.height).toMatch('300px');
  expect(styles.padding).toMatch('20px 30px 40px 50px');
});
