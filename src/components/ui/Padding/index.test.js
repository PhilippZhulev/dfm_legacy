import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode, render } from 'react-dom';
import Padding from '.';

const Component = (props) => (
  <TestWrapper>
    <Padding {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

let container = null;
beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Тестирование children', () => {
  act(() => {
    render(<Component>{['test-1']}</Component>, container);
  });
  expect(container.textContent).toBe('test-1');

  act(() => {
    render(<Component>{['test-2']}</Component>, container);
  });
  expect(container.textContent).not.toBe('test-1');

  act(() => {
    render(<Component></Component>, container);
  });
  expect(container.textContent.length).toBe(0);
});

it('Тестирование основных параметров (display, className)', () => {
  act(() => {
    render(<Component></Component>, container);
  });
  const context = container.firstChild;
  expect(context.className).toMatch('makeStyles-root');
  const params = getComputedStyle(context);
  expect(params.display).toBe('block');
});

it('Тестирование передаваемых параметров (inline)', () => {
  act(() => {
    render(<Component inline={true}></Component>, container);
  });
  const context = container.firstChild;
  const params = getComputedStyle(context);
  expect(params.display).toBe('inline-flex');
});

it('Тестирование передаваемых параметров (top)', () => {
  act(() => {
    render(<Component top={'50px'}></Component>, container);
  });
  const stylesTop = getComputedStyle(container.firstChild);
  expect(stylesTop.paddingTop).toBe('50px');
});

it('Тестирование передаваемых параметров (bottom)', () => {
  act(() => {
    render(<Component bottom={'40px'}></Component>, container);
  });
  const stylesBottom = getComputedStyle(container.firstChild);
  expect(stylesBottom.paddingBottom).toBe('40px');
});

it('Тестирование передаваемых параметров (left)', () => {
  act(() => {
    render(<Component left={'30px'}></Component>, container);
  });
  const stylesLeft = getComputedStyle(container.firstChild);
  expect(stylesLeft.paddingLeft).toBe('30px');
});

it('Тестирование передаваемых параметров (right)', () => {
  act(() => {
    render(<Component right={'20px'}></Component>, container);
  });
  const stylesRight = getComputedStyle(container.firstChild);

  expect(stylesRight.paddingRight).toBe('20px');
});

it('Тестирование передаваемых параметров (data)', () => {
  act(() => {
    render(
      <Component top={'50px'} data={'20px 30px 0px 40px'}></Component>,
      container
    );
  });
  const stylesPadding = getComputedStyle(container.firstChild);
  expect(stylesPadding.paddingTop).toBe('20px');
  expect(stylesPadding.paddingRight).toBe('30px');
  expect(stylesPadding.paddingBottom).toBe('0px');
  expect(stylesPadding.paddingLeft).toBe('40px');
});
