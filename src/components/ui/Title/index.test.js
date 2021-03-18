import React from 'react';
import { TestWrapper } from 'helpers';
import { render, cleanup } from '@testing-library/react';
import Title from '.';

const Component = (props) => (
  <TestWrapper>
    <Title {...props} />
  </TestWrapper>
);

describe('Title - тест взаимодействия', () => {
  let renderResult = null;
  beforeEach(() => {
    // подготавливаем DOM-элемент, куда будем рендерить
    jest.useFakeTimers();
  });

  afterEach(() => {
    // подчищаем после завершения
    cleanup();
    renderResult = null;
  });
  it('Тест отрисовки', () => {
    const container = render(<Component text={'test-title'} />);
    expect(container.queryByTestId('title').textContent).toBe('test-title');
    cleanup();
  });
});
