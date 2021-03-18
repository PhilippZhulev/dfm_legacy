import React from 'react';
import { TestWrapper } from 'helpers';
import { render, cleanup } from '@testing-library/react';
import ProgressBar from '.';

const Component = (props) => (
  <TestWrapper>
    <ProgressBar {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

it('Тестирование основных параметров (className)', () => {
  const container = render(<Component showBubble={true} />);

  expect(container.queryByTestId('root').className).toMatch('root');
  expect(container.queryByTestId('color').className).toMatch('color');
  expect(container.queryByTestId('valueBubble').className).toMatch(
    'valueBubble'
  );

  cleanup();
});

it('Тестирование основных параметров (showBubble)', () => {
  const container = render(<Component />);
  expect(container.queryByTestId('valueBubble')).not.toBeNull();
  cleanup();

  const container2 = render(<Component showBubble={false} />);
  expect(container2.queryByTestId('valueBubble')).toBeNull();
  cleanup();
});
