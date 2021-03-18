import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, cleanup } from '@testing-library/react';
import TextInput from '.';

const Component = (props) => {
  const ref = React.createRef();
  return (
    <TestWrapper>
      <TextInput {...props} ref={ref} />
    </TestWrapper>
  );
};

describe('TextInput - тест классов и style', () => {
  it('Тест отрисовки и типа по умолчанию', () => {
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('input').type).toBe('text');
  });
  it('Тест отрисовки label', () => {
    const { queryByTestId } = render(<Component label={'test'} />);
    expect(queryByTestId('label').innerHTML).toBe('test');
  });
  it('Тест отрисовки value', () => {
    const { queryByTestId } = render(<Component value={'test'} />);
    expect(queryByTestId('input').value).toBe('test');
  });
  it('Тест отрисовки placeholder', () => {
    const { queryByTestId } = render(<Component placeholder={'test'} />);
    expect(queryByTestId('input').placeholder).toBe('test');
  });
  it('Тест отрисовки type', () => {
    const { queryByTestId } = render(<Component type={'number'} />);
    expect(queryByTestId('input').type).toBe('number');
  });
  it('Тест отрисовки disabled', () => {
    const { queryByTestId } = render(<Component disabled />);
    expect(queryByTestId('input').disabled).toBeTruthy();
  });
  it('Тест отрисовки autocomplete', () => {
    const { queryByTestId } = render(<Component autocomplete={'on'} />);
    expect(queryByTestId('input').autocomplete).toBe('on');
  });
  it('Тест отрисовки width', () => {
    const { queryByTestId } = render(<Component width={'100px'} />);
    expect(
      Object.values(queryByTestId('root').style).includes('width') &&
        queryByTestId('root').style.width === '100px'
    ).toBeTruthy();
  });
});

describe('TextInput - тест взаимодействия', () => {
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
  it('Тест change', () => {
    const onChange = jest.fn();

    act(() => {
      renderResult = render(<Component onChange={() => onChange('click!')} />);
    });
    const { queryByTestId } = renderResult;

    act(() => {
      queryByTestId('input').focus();
      fireEvent.change(queryByTestId('input'), { target: { value: '23' } });
    });

    expect(onChange).toHaveBeenCalledWith('click!');
  });
});
