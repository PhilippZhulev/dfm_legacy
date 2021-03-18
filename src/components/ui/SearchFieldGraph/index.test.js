import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SearchFieldGraph from '.';

const Component = (props) => (
  <TestWrapper>
    <SearchFieldGraph {...props} />
  </TestWrapper>
);

describe('SearchFieldGraph - тест классов и style', () => {
  it('Тест отрисовки', () => {
    const container = render(<Component />);
    expect(container.queryByTestId('root').style.width).toBe('100px');
    expect(container.queryByTestId('input').tagName).toBe('INPUT');
    expect(container.queryByTestId('input').type).toBe('text');
    expect(container.queryByTestId('input').placeholder).toBe('');
    cleanup();
  });
  it('Тест width', () => {
    const container = render(<Component width={200} />);
    expect(container.queryByTestId('root').style.width).toBe('200px');
    cleanup();
  });
  it('Тест type', () => {
    const container = render(<Component type={'number'} />);
    expect(container.queryByTestId('input').type).toBe('number');
    cleanup();
  });
  it('Тест placeholder', () => {
    const container = render(<Component placeholder={'test'} />);
    expect(container.queryByTestId('input').placeholder).toBe('test');
    cleanup();
  });
  it('Тест value', () => {
    const container = render(<Component value={'test'} />);
    expect(container.queryByTestId('input').value).toBe('test');
    cleanup();
  });
});

describe('SearchFieldGraph - тест взаимодействия', () => {
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
        <Component onChange={(e) => onChange(e.target.value)} />
      );
    });
    const container = renderResult;

    act(() => {
      fireEvent.change(container.queryByTestId('input'), {
        target: { value: 'test' },
      });
    });

    expect(onChange).toHaveBeenCalledWith('test');
    expect(container.queryByTestId('input').value).toBe('test');
  });
});
