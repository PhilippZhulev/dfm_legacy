import React from 'react';
import { TestWrapper } from 'helpers';
import { unmountComponentAtNode } from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Category from '.';

const Component = (props) => (
  <TestWrapper>
    <Category {...props} />
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

it('Тестирование className', () => {
  const wrapper = render(<Component />);
  expect(wrapper.queryByTestId('categoryWrapper').className).toMatch('root');
  expect(wrapper.queryByTestId('categoryIcon').className).toMatch('icon');
  expect(wrapper.queryByTestId('categoryLabel').className).toMatch('label');
  cleanup(wrapper);

  const wrapper2 = render(<Component isSelected={true} />);
  expect(wrapper2.queryByTestId('categoryWrapper').className).toMatch(
    'selected'
  );
  cleanup(wrapper2);

  const wrapper3 = render(<Component isActive={true} />);
  expect(wrapper3.queryByTestId('categoryWrapper').className).toMatch('active');
  cleanup(wrapper3);
});

it('Тестирование icon', () => {
  const wrapper = render(<Component />);
  expect(wrapper.queryByTestId('categoryIcon').firstChild).not.toBeNull();
  cleanup(wrapper);
});

it('Тестирование label', () => {
  const wrapper = render(<Component category={{ label: 'Заголовок 1' }} />);
  expect(wrapper.queryByTestId('categoryLabel').textContent).toBe(
    'Заголовок 1'
  );
  cleanup(wrapper);
});

it('Тестирование onClick', () => {
  const mockFn = jest.fn();
  const wrapper = render(<Component onClick={mockFn} />);
  fireEvent.click(wrapper.queryByTestId('categoryWrapper'));
  expect(mockFn).toHaveBeenCalled();
  cleanup(wrapper);

  const wrapper2 = render(<Component onClick={mockFn} isSelected={true} />);
  fireEvent.click(wrapper2.queryByTestId('categoryWrapper'));
  expect(mockFn).toHaveBeenCalledWith(true);
  cleanup(wrapper);
});
