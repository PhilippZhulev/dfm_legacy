import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode, render } from 'react-dom';
import Avatar from '.';

const Component = (props) => (
  <TestWrapper>
    <Avatar {...props} />
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
    render(<Component classes={{ root: 'custom' }} />, container);
  });
  expect(container.firstChild.className).toMatch('custom');
});

it('Тестирование styles', () => {
  act(() => {
    render(<Component styles={{ width: '300px' }} />, container);
  });
  const styles = getComputedStyle(container.firstChild);

  expect(styles.width).toBe('300px');
  expect(styles.height).toBe('44px');
  expect(styles.padding).toBeFalsy();
});

it('Тестирование name', () => {
  act(() => {
    render(<Component name={'Антон'} />, container);
  });
  expect(container.textContent).toBe('А');
  expect(container.textContent).not.toBe('Антон');
});

it('Тестирование data', () => {
  act(() => {
    render(<Component data='user' />, container);
  });
  expect(container.textContent).toBeFalsy();
  expect(container.firstChild.firstChild.className).toMatch('preview');
  expect(container.firstChild.firstChild.firstChild.tagName.toLowerCase()).toBe(
    'img'
  );
  expect(container.firstChild.firstChild.firstChild.src).toMatch('/user');
});

it('Тестирование updated', () => {
  act(() => {
    render(<Component data='user' updated={'false'} />, container);
  });
  expect(container.firstChild.firstChild.firstChild.src).toMatch('?false');

  act(() => {
    render(<Component updated={'false'} />, container);
  });
  expect(container.firstChild.firstChild.firstChild).toBeNull();
});

it('Тестирование url', () => {
  act(() => {
    render(<Component data='user' updated={'false'} />, container);
  });
  expect(container.firstChild.firstChild.firstChild.src).toMatch(
    'http://localhost'
  );

  act(() => {
    render(
      <Component data='user' updated={'false'} url={'http://ya.ru'} />,
      container
    );
  });
  expect(container.firstChild.firstChild.firstChild.src).toMatch(
    'http://ya.ru'
  );
});
