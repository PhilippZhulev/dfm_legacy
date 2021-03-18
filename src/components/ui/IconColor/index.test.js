import React from 'react';
import { TestWrapper } from 'helpers';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import IconColor from '.';
import Like from '../../svg/Like';

const Component = (props) => (
  <TestWrapper>
    <IconColor {...props} />
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
  const like = document.createElement('div');
  document.body.appendChild(like);

  act(() => {
    render(
      <Component>
        <Like />
      </Component>,
      container
    );
    render(<Like />, like);
  });

  expect(container.firstChild.firstChild.tagName).toBe('svg');
  expect(container.firstChild.innerHTML).toBe(like.innerHTML);
});

it('Тестирование classes', () => {
  act(() => {
    render(<Component />, container);
  });

  expect(container.firstChild.className).toMatch('root');

  act(() => {
    render(<Component classes={{ root: 'custom' }} />, container);
  });

  expect(container.firstChild.className).toMatch('root');
  expect(container.firstChild.className).toMatch('custom');
});

it('Тестирование базовых стилей', () => {
  act(() => {
    render(
      <Component>
        <Like />
      </Component>,
      container
    );
  });
  const styles = getComputedStyle(container.querySelector('path'));
  expect(styles.fill).toBe('#fff');
});

it('Тестирование styles', () => {
  act(() => {
    render(
      <Component
        styles={{
          background: 'green',
          padding: '20px 30px 20px 40px',
        }}>
        <Like />
      </Component>,
      container
    );
  });
  const styles = getComputedStyle(container.firstChild);
  expect(styles.background).toBe('green');
  expect(styles.paddingTop).toBe('20px');
  expect(styles.padding).toBe('20px 30px 20px 40px');
});

it('Тестирование type=stroke', () => {
  act(() => {
    render(
      <Component type={'stroke'}>
        <Like />
      </Component>,
      container
    );
  });
  const styles = getComputedStyle(container.querySelector('path'));
  expect(styles.stroke).toBe('#fff');
});

it('Тестирование color=red', () => {
  act(() => {
    render(
      <Component color={'red'}>
        <Like />
      </Component>,
      container
    );
  });
  const styles = getComputedStyle(container.querySelector('path'));
  expect(styles.fill).toBe('red');
});

it('Тестирование type=stroke and color=orange', () => {
  act(() => {
    render(
      <Component type={'stroke'} color={'orange'}>
        <Like />
      </Component>,
      container
    );
  });
  const styles = getComputedStyle(container.querySelector('path'));
  expect(styles.stroke).toBe('orange');
});
