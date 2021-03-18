import React from 'react';
import { TestWrapper } from 'helpers';
import { render, cleanup } from '@testing-library/react';
import NotScroll from '.';

const Component = (props) => (
  <TestWrapper>
    <NotScroll {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

it('Тестирование основных параметров (className)', () => {
  const container = render(<Component>{['Some text']}</Component>);

  expect(container.queryByTestId('root').className).toMatch('root');

  cleanup();
});

it('Тестирование основных параметров (children)', () => {
  const container = render(<Component>{['Some text']}</Component>);

  expect(container.queryByTestId('root').innerHTML).toMatch('Some text');

  cleanup();
});
