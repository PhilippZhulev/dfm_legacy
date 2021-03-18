import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { render, cleanup } from '@testing-library/react';
import Tile from '.';

const Component = (props) => (
  <TestWrapper>
    <Tile {...props} />
  </TestWrapper>
);

describe('Tile - тест взаимодействия', () => {
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
  it('Тест отрисовки и children', () => {
    act(() => {
      renderResult = render(
        <Component>
          <span>test</span>
        </Component>
      );
    });
    const { container } = renderResult;
    expect(container.firstChild.textContent).toBe('test');
  });
  it('Тест нажатия', () => {
    const onClick = jest.fn();

    act(() => {
      renderResult = render(
        <Component label={'test-1'} onClick={() => onClick('click!')} />
      );
    });
    const { container } = renderResult;

    act(() => {
      container.firstChild.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
    });

    expect(onClick).toHaveBeenCalledWith('click!');
  });
});
