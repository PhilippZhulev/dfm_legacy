import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, cleanup } from '@testing-library/react';
import HorizontalChanger from '.';

const Component = (props) => (
  <TestWrapper>
    <HorizontalChanger {...props} />
  </TestWrapper>
);

describe('HorizontalChanger - тест классов', () => {
  it('Тест отрисовки', () => {
    const { queryByTestId } = render(
      <Component
        current={'a'}
        items={[
          { value: 'a', label: 'Letter a' },
          { value: 'b', label: 'Letter b' },
          { value: 'c', label: 'Letter c' },
        ]}
        allowItems={['a', 'c']}
      />
    );
    expect(queryByTestId('checker_a').className).toMatch('selected');
    expect(queryByTestId('checker_b').className).toMatch('disabled');
    expect(queryByTestId('checker_c').className).toMatch('label');
  });
});

describe('HorizontalChanger - тест взаимодействия', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
  });
  it('Тест переключения доступного варианта', () => {
    const onChange = jest.fn();

    const { queryByTestId } = render(
      <Component
        current={'a'}
        items={[
          { value: 'a', label: 'Letter a' },
          { value: 'b', label: 'Letter b' },
          { value: 'c', label: 'Letter c' },
        ]}
        allowItems={['a', 'c']}
        onChange={onChange}
      />
    );

    fireEvent.click(queryByTestId('checker_c'));
    expect(onChange).toHaveBeenCalledWith('c');
  });

  it('Тест переключения НЕдоступного варианта', () => {
    const onChange = jest.fn();

    const { queryByTestId } = render(
      <Component
        current={'a'}
        items={[
          { value: 'a', label: 'Letter a' },
          { value: 'b', label: 'Letter b' },
          { value: 'c', label: 'Letter c' },
        ]}
        allowItems={['a', 'c']}
        onChange={onChange}
      />
    );

    fireEvent.click(queryByTestId('checker_b'));
    expect(onChange).not.toHaveBeenCalledWith('b');
  });
});
