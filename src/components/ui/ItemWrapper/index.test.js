import React from 'react';
import { TestWrapper } from 'helpers';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ItemWrapper from '.';
import Like from '../../svg/Like';

const Component = (props) => (
  <TestWrapper>
    <ItemWrapper {...props} />
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
  expect(container.firstChild.className).toMatch('childElementItem');
});

it('Тестирование children', () => {
  act(() => {
    render(<Component>{(['Some Text'], ['Some Text2'])}</Component>, container);
  });
  expect(container.firstChild.textContent).toBe('Some Text2');

  act(() => {
    render(
      <Component>
        <Like />
      </Component>,
      container
    );
  });
  expect(container.querySelector('svg')).toBeTruthy();
});
