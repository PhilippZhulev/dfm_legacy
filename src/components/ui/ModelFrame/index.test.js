import React from 'react';
import { TestWrapper } from 'helpers';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ModelFrame from '.';

const Component = (props) => (
  <TestWrapper>
    <ModelFrame {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

it('Тестирование children', () => {
  const container = render(<Component>{['Some text']}</Component>);

  expect(container.queryByTestId('root').innerHTML).toMatch('Some text');

  cleanup();
});

it('Тестирование classes', () => {
  const container = render(<Component />);

  expect(container.queryByTestId('root').className).toMatch('root');

  cleanup();
});
