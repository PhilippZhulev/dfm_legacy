import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode, render } from 'react-dom';
import AbsolutePosition from '.';

const Component = (props) => (
  <TestWrapper>
    <AbsolutePosition {...props} />
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
    render(<Component />, container);
  });
  expect(container.textContent.length).toBe(0);
});

it('Тестирование основных параметров (position, display, className)', () => {
  act(() => {
    render(
      <Component
        top={'50px'}
        bottom={'40px'}
        left={'30px'}
        right={'20px'}
        zIndex={10}></Component>,
      container
    );
  });
  const context = container.firstChild;
  expect(context.className).toMatch('makeStyles-root');
  const params = getComputedStyle(context);
  expect(params.position).toBe('absolute');
  expect(params.display).toBe('block');
});

it('Тестирование передаваемых параметров (top)', () => {
  act(() => {
    render(<Component top={'50px'}></Component>, container);
  });
  const stylesTop = getComputedStyle(container.firstChild);
  expect(stylesTop.top).toBe('50px');
  expect(stylesTop.bottom).toBeFalsy();
  expect(stylesTop.right).toBeFalsy();
  expect(stylesTop.left).toBeFalsy();
  expect(stylesTop.zIndex).toBeFalsy();
});

it('Тестирование передаваемых параметров (bottom)', () => {
  act(() => {
    render(<Component bottom={'40px'}></Component>, container);
  });
  const stylesBottom = getComputedStyle(container.firstChild);
  expect(stylesBottom.top).toBeFalsy();
  expect(stylesBottom.bottom).toBe('40px');
  expect(stylesBottom.right).toBeFalsy();
  expect(stylesBottom.left).toBeFalsy();
  expect(stylesBottom.zIndex).toBeFalsy();
});

it('Тестирование передаваемых параметров (left)', () => {
  act(() => {
    render(<Component left={'30px'}></Component>, container);
  });
  const stylesLeft = getComputedStyle(container.firstChild);
  expect(stylesLeft.top).toBeFalsy();
  expect(stylesLeft.bottom).toBeFalsy();
  expect(stylesLeft.right).toBeFalsy();
  expect(stylesLeft.left).toBe('30px');
  expect(stylesLeft.zIndex).toBeFalsy();
});

it('Тестирование передаваемых параметров (right)', () => {
  act(() => {
    render(<Component right={'20px'}></Component>, container);
  });
  const stylesRight = getComputedStyle(container.firstChild);
  expect(stylesRight.top).toBeFalsy();
  expect(stylesRight.bottom).toBeFalsy();
  expect(stylesRight.right).toBe('20px');
  expect(stylesRight.left).toBeFalsy();
  expect(stylesRight.zIndex).toBeFalsy();
});

it('Тестирование передаваемых параметров (zIndex)', () => {
  act(() => {
    render(<Component zIndex={100}></Component>, container);
  });
  const stylesZIndex = getComputedStyle(container.firstChild);
  expect(stylesZIndex.zIndex).toBe('100');
  expect(stylesZIndex.top).toBeFalsy();
  expect(stylesZIndex.bottom).toBeFalsy();
  expect(stylesZIndex.right).toBeFalsy();
  expect(stylesZIndex.left).toBeFalsy();
});
