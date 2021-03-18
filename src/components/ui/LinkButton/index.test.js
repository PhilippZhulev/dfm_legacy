import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { render, cleanup } from '@testing-library/react';
import LinkButton from '.';
import Star from '../../svg/Star';

const Component = (props) => (
  <TestWrapper>
    <LinkButton {...props} />
  </TestWrapper>
);

const dispatchClick = (element) =>
  element.dispatchEvent(new MouseEvent('click', { bubbles: true }));

describe('LinkButton - тест классов и style', () => {
  it('Тест отрисовки', () => {
    const { getByTestId } = render(<Component />);
    const rootStyle = getByTestId('root').style;
    expect(
      rootStyle.width === '350px' && rootStyle['font-size'] === '12px'
    ).toBeTruthy();
  });
  it('Тест icon', () => {
    const { getByTestId } = render(<Component icon={<Star />} />);
    expect(getByTestId('root').firstChild.tagName).toBe('svg');
  });
  it('Тест clicked', () => {
    const { getByTestId } = render(<Component clicked />);
    expect(getByTestId('root').className.includes('hover')).toBeTruthy();
  });
  it('Тест clicked при наличии disabled', () => {
    const { getByTestId } = render(<Component disabled clicked />);
    expect(getByTestId('root').className.includes('hover')).toBeFalsy();
  });
  it('Тест linked', () => {
    const { getByTestId } = render(<Component linked />);
    expect(getByTestId('root').className.includes('linked')).toBeTruthy();
  });
  it('Тест text', () => {
    const { getByTestId } = render(<Component text={'test'} />);
    expect(getByTestId('root').firstChild.innerHTML).toBe('test');
  });
  it('Тест width', () => {
    const { getByTestId } = render(<Component width={100} />);
    expect(getByTestId('root').style.width).toBe('100px');
  });
  it('Тест size', () => {
    const { getByTestId } = render(<Component size={20} />);
    expect(getByTestId('root').style['font-size']).toBe('20px');
  });
  cleanup();
});

describe('LinkButton - тест взаимодействия', () => {
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
  it('Тест нажатия', () => {
    const onClick = jest.fn();

    act(() => {
      renderResult = render(<Component onClick={() => onClick('click!')} />);
    });
    const { container } = renderResult;

    act(() => {
      dispatchClick(container.firstChild);
    });

    expect(onClick).toHaveBeenCalledWith('click!');
  });
  it('Тест нажатия disabled', () => {
    const onClick = jest.fn();

    act(() => {
      renderResult = render(
        <Component disabled onClick={() => onClick('click!')} />
      );
    });
    const { container } = renderResult;

    act(() => {
      dispatchClick(container.firstChild);
    });

    expect(onClick).toHaveBeenCalledTimes(0);
  });
  cleanup();
});
