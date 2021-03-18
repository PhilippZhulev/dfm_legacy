import React from 'react';
import { TestWrapper } from 'helpers';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Locked from '.';
import OpenedLock from '../../svg/OpenedLock';
import Lock from '../../svg/Lock';

const Component = (props) => (
  <TestWrapper>
    <Locked {...props} />
  </TestWrapper>
);

const dispatchClick = (element) =>
  element.dispatchEvent(new MouseEvent('click', { bubbles: true }));

describe('LinkButton - тест взаимодействия', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('Тест иконки unlocked', () => {
    const container = render(<Component locked={false} />);

    expect(container.queryByTestId('openedLock').outerHTML).toBe(
      render(<OpenedLock />).container.innerHTML
    );

    cleanup();
  });

  it('Тест иконки locked', () => {
    const container = render(<Component locked={true} />);

    expect(container.queryByTestId('lock').outerHTML).toBe(
      render(<Lock />).container.innerHTML
    );

    cleanup();
  });
});

describe('LinkButton - тест классов и style', () => {
  it('Тест отрисовки', () => {
    const container = render(<Component />);
    expect(container.innerHTML).toBeFalsy();
    cleanup();
  });
  it('Тест locked', () => {
    const container = render(<Component locked={true} />);
    expect(container.queryByTestId('lock')).toBeTruthy();
    expect(container.queryByTestId('openedLock')).toBeFalsy();
    cleanup();
  });
  it('Тест !locked', () => {
    const container = render(<Component locked={false} />);
    expect(container.queryByTestId('lock')).toBeFalsy();
    expect(container.queryByTestId('openedLock')).toBeTruthy();
    cleanup();
  });
});
