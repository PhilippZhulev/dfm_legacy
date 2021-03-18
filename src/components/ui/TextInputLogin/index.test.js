import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, cleanup } from '@testing-library/react';
import TextInputLogin from '.';

const Component = (props) => (
  <TestWrapper>
    <TextInputLogin {...props} />
  </TestWrapper>
);

describe('TextInputLogin - тест классов и style', () => {
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
  it('Тест отрисовки err', () => {
    const { queryByTestId } = render(<Component err />);
    expect(
      queryByTestId('root').className.includes('error') &&
        queryByTestId('label').className.includes('errLabel')
    ).toBeTruthy();
  });
});

describe('TextInputLogin - тест взаимодействия', () => {
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
  it('Тест ввода', () => {
    const onKeyPress = jest.fn();

    act(() => {
      renderResult = render(
        <Component onKeyPress={() => onKeyPress('click!')} />
      );
    });
    const { queryByTestId } = renderResult;

    const event = document.createEvent('Event');

    event.initEvent('keypress', true, true);
    event.view = document.defaultView;
    event.altKey = false;
    event.ctrlKey = false;
    event.shiftKey = false;
    event.metaKey = false;
    event.key = 'a';
    event.keyCode = 65;

    act(() => {
      queryByTestId('input').focus();
      queryByTestId('input').dispatchEvent(event);
    });

    expect(onKeyPress).toHaveBeenCalledWith('click!');
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
