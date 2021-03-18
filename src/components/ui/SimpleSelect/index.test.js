import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SimpleSelect from '.';

const Component = (props) => (
  <TestWrapper>
    <SimpleSelect {...props} />
  </TestWrapper>
);

describe('SimpleSelect - тест классов и style', () => {
  it('Тест отрисовки', () => {
    const { queryByTestId } = render(
      <Component
        items={[
          { value: 'a', label: 'Letter a' },
          { value: 'b', label: 'Letter b' },
          { value: 'c', label: 'Letter c' },
        ]}
      />
    );
    expect(queryByTestId('root').tagName).toBe('SELECT');
    expect(queryByTestId('root').childElementCount).toBe(3);
    expect(queryByTestId('root').value).toBe('a');
  });
  it('Тест current', () => {
    const { queryByTestId } = render(
      <Component
        current={'b'}
        items={[
          { value: 'a', label: 'Letter a' },
          { value: 'b', label: 'Letter b' },
          { value: 'c', label: 'Letter c' },
        ]}
      />
    );
    expect(queryByTestId('root').value).toBe('b');
  });
  it('Тест disabled', () => {
    const { queryByTestId } = render(
      <Component
        disabled
        items={[
          { value: 'a', label: 'Letter a' },
          { value: 'b', label: 'Letter b' },
          { value: 'c', label: 'Letter c' },
        ]}
      />
    );
    expect(queryByTestId('root').disabled).toBe(true);
  });
});

describe('SimpleSelect - тест взаимодействия', () => {
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
  it('Тест onChange', () => {
    const onChange = jest.fn();

    act(() => {
      renderResult = render(
        <Component
          onChange={(e) => onChange(e.target.value)}
          items={[
            { value: 'a', label: 'Letter a' },
            { value: 'b', label: 'Letter b' },
            { value: 'c', label: 'Letter c' },
          ]}
        />
      );
    });
    const { container } = renderResult;

    act(() => {
      fireEvent.change(container.firstChild, {
        target: { value: 'b' },
      });
    });

    expect(onChange).toHaveBeenCalledWith('b');
    expect(container.firstChild.value).toBe('b');
  });
});
