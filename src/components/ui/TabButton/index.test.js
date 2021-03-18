import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, cleanup } from '@testing-library/react';
import TabButton from '.';

const Component = (props) => (
  <TestWrapper>
    <TabButton {...props} />
  </TestWrapper>
);

describe('TabButton - тест label', () => {
  it('Тест label', () => {
    const { queryByTestId } = render(<Component label='Some label' />);
    expect(queryByTestId('label').textContent).toBe('Some label');
  });
});

describe('TabButton - тест классов', () => {
  it('Тест класса обертки по умолчанию', () => {
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('root').className).toMatch('categoryItem');
  });
  it('Тест класса обертки выбранного элемента', () => {
    const { queryByTestId } = render(<Component selected={true} />);
    expect(queryByTestId('root').className).toMatch('categoryItem');
  });
  it('Тест класса внутреннего блока по умолчанию', () => {
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('selected').className).toMatch('selection');
  });
  it('Тест класса внутреннего блока выбранного элемента', () => {
    const { queryByTestId } = render(<Component selected={true} />);
    expect(queryByTestId('selected').className).toMatch('visible');
  });
});

describe('TabButton - тест взаимодействия', () => {
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

  it('Тест click', () => {
    const onClick = jest.fn();

    act(() => {
      renderResult = render(<Component onClick={() => onClick('click!')} />);
    });
    const { queryByTestId } = renderResult;

    act(() => {
      fireEvent.click(queryByTestId('root'));
    });

    expect(onClick).toHaveBeenCalledWith('click!');
  });
});
