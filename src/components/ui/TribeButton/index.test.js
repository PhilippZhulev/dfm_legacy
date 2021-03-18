import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, cleanup } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';
import TribeButton from '.';
import Star from '../../svg/Star';

const Component = (props) => (
  <TestWrapper>
    <TribeButton {...props} />
  </TestWrapper>
);

describe('TribeButton - тест классов и style', () => {
  it('Тест стиля hovered', () => {
    let testValue = null;
    const { queryByText, queryByTestId } = render(
      <Component label={'test-1'} onClick={() => (testValue = 'test')} />
    );
    fireEvent.mouseEnter(queryByText('test-1'));
    const iconClassName = queryByTestId('icon').className;
    const labelClassName = queryByTestId('label').className;
    expect(
      iconClassName.includes('icon_hovered') &&
        labelClassName.includes('label_hovered')
    ).toBeTruthy();
  });
  it('Тест атрибута selected', () => {
    const { queryByTestId } = render(<Component selected />);
    const iconClassName = queryByTestId('icon').className;
    const labelClassName = queryByTestId('label').className;
    expect(
      iconClassName.includes('icon_hovered') &&
        labelClassName.includes('label_hovered')
    ).toBeTruthy();
  });
  it('Тест атрибута color', () => {
    const { queryByTestId } = render(<Component color={'red'} />);
    const icon = queryByTestId('icon');
    const colorPresence =
      Object.values(icon.style).find((key) => key === 'fill') &&
      icon.style.fill === 'red';
    expect(colorPresence).toBeTruthy();
  });
});

describe('TribeButton - тест взаимодействия', () => {
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
  it('Тест отрисовки', () => {
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('icon')).toBeTruthy();
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

describe('TribeButton - валидация рендера при наличии children', () => {
  it('Тест отрисовки children', () => {
    const component = renderer.create(
      <Component label='Часто используемые' selected color='gold'>
        <Star />
      </Component>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
