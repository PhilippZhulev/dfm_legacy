import React from 'react';
import { TestWrapper } from 'helpers';
import { render, cleanup } from '@testing-library/react';
import ModelScreen from '.';

const Component = (props) => (
  <TestWrapper>
    <ModelScreen {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

it('Тестирование children', () => {
  const container = render(<Component>{['Some text']}</Component>);

  expect(container.queryByTestId('modelScreen').innerHTML).toMatch('Some text');

  cleanup();
});

it('Тестирование classes', () => {
  const container = render(<Component />);

  expect(container.queryByTestId('modelScreen').className).toMatch(
    'modelScreen'
  );

  cleanup();
});
