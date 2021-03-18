import React from 'react';
import { TestWrapper } from 'helpers';
import { unmountComponentAtNode } from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import LinkText from '.';

const Component = (props) => (
  <TestWrapper>
    <LinkText {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Тестирование className', () => {
  const wrapper = render(<Component />);
  expect(wrapper.queryByTestId('LinkTextWrapper').className).toMatch('root');
  expect(wrapper.queryByTestId('LinkTextWrapper').className).not.toMatch(
    'hover'
  );
  expect(wrapper.queryByTestId('LinkTextLabel').className).toMatch('label');
  expect(wrapper.queryByTestId('LinkTextContent').className).toBeFalsy();
  cleanup(wrapper);

  const wrapper2 = render(<Component clicked={true} />);
  expect(wrapper2.queryByTestId('LinkTextWrapper').className).toMatch('hover');
  cleanup(wrapper2);
});

it('Тестирование содержимого', () => {
  const wrapper = render(<Component label='Some label' text='Some text' />);
  expect(wrapper.queryByTestId('LinkTextLabel').textContent).toBe('Some label');
  expect(wrapper.queryByTestId('LinkTextContent').textContent).toBe(
    'Some text'
  );
  cleanup(wrapper);
});

it('Тестирование onClick', () => {
  const mockFn = jest.fn();
  const wrapper = render(<Component onClick={mockFn} />);
  fireEvent.click(wrapper.queryByTestId('LinkTextWrapper'));
  expect(mockFn).toHaveBeenCalled();
  cleanup(wrapper);
});

it('Тестирование size и width', () => {
  const wrapper = render(<Component size='15' width={200} />);
  const styles = getComputedStyle(wrapper.queryByTestId('LinkTextWrapper'));
  expect(styles.width).toBe('200px');
  expect(styles.fontSize).toBe('15');
});
