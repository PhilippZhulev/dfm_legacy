import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode, render } from 'react-dom';
import { colors } from 'components/theme';
import Separator from '.';

const Component = (props) => (
  <TestWrapper>
    <Separator {...props} />
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

it('Тестирование основных параметров (className)', () => {
  act(() => {
    render(<Component />, container);
  });
  const context = container.firstChild;
  expect(context.className).toMatch('makeStyles-horizontalSeparator');
});

it('Тестирование основных параметров (margin)', () => {
  act(() => {
    render(<Component />, container);
  });
  const stylesMargin = getComputedStyle(container.firstChild);
  expect(stylesMargin.margin).toBe('30px 0px');
});

it('Тестирование основных параметров (padding)', () => {
  act(() => {
    render(<Component />, container);
  });
  const stylesPadding = getComputedStyle(container.firstChild);
  expect(stylesPadding.padding).toBe('0px 10px');
});

it('Тестирование основных параметров (height)', () => {
  act(() => {
    render(<Component />, container);
  });
  const stylesHeight = getComputedStyle(container.firstChild);
  expect(stylesHeight.height).toBe('1px');
});

function rgb2hex(rgb) {
  const color = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return `0${parseInt(x, 10).toString(16)}`.slice(-2);
  }
  return `#${hex(color[1])}${hex(color[2])}${hex(color[3])}`;
}

it('Тестирование основных параметров (backgroundColor)', () => {
  act(() => {
    render(<Component />, container);
  });
  const stylesBackground = getComputedStyle(container.firstChild);
  expect(rgb2hex(stylesBackground.background).toLowerCase()).toBe(
    colors.colorsTheme.separator.toLowerCase()
  );
});
