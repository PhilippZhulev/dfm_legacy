import React from 'react';
import { TestWrapper } from 'helpers';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import IconInfoItem from '.';
import Like from '../../svg/Like';

const Component = (props) => (
  <TestWrapper>
    <IconInfoItem {...props} />
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

it('Тестирование classes', () => {
  act(() => {
    render(<Component />, container);
  });

  expect(container.firstChild.className).toMatch('IconInfoItem');
  expect(container.firstChild.firstChild.className).toMatch('dateIcon');
  expect(container.firstChild.childNodes[1].className).toMatch('dateValue');
});

it('Тестирование label', () => {
  act(() => {
    render(<Component label={'Текст без картинки'} />, container);
  });

  expect(container.firstChild.childNodes[1].textContent).toMatch(
    'Текст без картинки'
  );
});

it('Тестирование icon', () => {
  const like = document.createElement('div');
  document.body.appendChild(like);

  act(() => {
    render(<Component icon={<Like />} />, container);
    render(<Like />, like);
  });

  expect(container.firstChild.firstChild.firstChild.tagName).toBe('svg');
  expect(container.firstChild.firstChild.innerHTML).toBe(like.innerHTML);
});
