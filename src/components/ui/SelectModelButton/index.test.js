import React from 'react';
import { TestWrapper } from 'helpers';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SelectModelButton from '.';

const Component = (props) => (
  <TestWrapper>
    <SelectModelButton {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

it('Тестирование основных параметров (className)', () => {
  const onClick = jest.fn();
  const container = render(<Component onClick={() => onClick('click!')} />);

  expect(container.queryByTestId('root').className).toMatch('root');
  expect(container.queryByTestId('label').className).toMatch('label');
  expect(container.queryByTestId('selectWrapper').className).toMatch(
    'selectWrapper'
  );
  expect(container.queryByTestId('value').className).toMatch('value');

  cleanup();
});

it('Тестирование контента', () => {
  const onClick = jest.fn();

  const container = render(
    <Component
      label='Some label'
      select='Some select'
      onClick={() => onClick('click!')}
    />
  );

  expect(container.queryByTestId('label').textContent).toBe('Some label');
  expect(container.queryByTestId('value').textContent).toBe('Some select');

  cleanup();
});

it('Тестирование onClick', () => {
  const onClick = jest.fn();

  const container = render(
    <Component
      label='Some label'
      select='Some select'
      onClick={() => onClick('click!')}
    />
  );

  fireEvent.click(container.queryByTestId('selectWrapper'));

  expect(onClick).toHaveBeenCalledWith('click!');

  cleanup();
});
