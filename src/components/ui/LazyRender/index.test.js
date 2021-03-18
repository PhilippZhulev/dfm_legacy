import React from 'react';
import { TestWrapper } from 'helpers';
import { render, fireEvent, cleanup } from '@testing-library/react';
import LazyRender from '.';

const Component = (props) => (
  <TestWrapper>
    <LazyRender {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

it('Тестирование style', () => {
  const container = render(<Component width={200} height={500} />);
  expect(container.queryByTestId('withoutGrow').style.width).toBe('200px');
  expect(container.queryByTestId('withoutGrow').style.height).toBe('500px');
  cleanup();
});

// TODO: Проблема тестирования. UseEffect и useState
