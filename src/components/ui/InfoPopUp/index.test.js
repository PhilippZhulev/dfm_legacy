import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { TestWrapper } from 'helpers';
import InfoPopupUp from '.';

const Component = (props) => (
  <TestWrapper>
    <InfoPopupUp {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

it('Тестирование пустого компонента', () => {
  const wrapper = render(<Component />);
  expect(wrapper.queryByTestId('toggler').textContent).toBeFalsy();
  cleanup(wrapper);
});

it('Тестирование children', () => {
  const wrapper = render(<Component>Some text</Component>);
  expect(wrapper.queryByTestId('toggler').textContent).toBe('Some text');
  cleanup(wrapper);
});

it('Тестирование childWrapperWidth', () => {
  const wrapper = render(<Component />);
  const style = getComputedStyle(wrapper.queryByTestId('toggler'));
  expect(style.width).toBeFalsy();
  cleanup(wrapper);

  const wrapper2 = render(
    <Component childWrapperWidth={'350px'}>Some text</Component>
  );
  const style2 = getComputedStyle(wrapper2.queryByTestId('toggler'));
  expect(style2.width).toBe('350px');
  cleanup(wrapper2);
});

it('Тестирование состояния click', () => {
  const wrapper = render(
    <Component content={'Какой-то текст'}>Нажми меня</Component>
  );
  expect(wrapper.queryByTestId('animatePresenceInner')).toBeFalsy();
  fireEvent.click(wrapper.queryByTestId('toggler'));
  expect(wrapper.queryByTestId('animatePresenceInner')).not.toBeFalsy();
  cleanup(wrapper);
});

it('Тестирование hover', () => {
  const wrapper = render(
    <Component hover={true} content={'Какой-то текст'}>
      Жми меня
    </Component>
  );
  expect(wrapper.queryByTestId('animatePresenceInner')).toBeFalsy();
  fireEvent.mouseEnter(wrapper.queryByTestId('toggler'));
  expect(wrapper.queryByTestId('animatePresenceInner')).not.toBeFalsy();
  fireEvent.mouseLeave(wrapper.queryByTestId('toggler'));
  expect(wrapper.queryByTestId('animatePresenceInner')).toBeFalsy();
  cleanup(wrapper);

  const wrapper2 = render(
    <Component content={'Какой-то текст'}>Жми меня</Component>
  );
  expect(wrapper2.queryByTestId('animatePresenceInner')).toBeFalsy();
  fireEvent.mouseEnter(wrapper2.queryByTestId('toggler'));
  expect(wrapper2.queryByTestId('animatePresenceInner')).toBeFalsy();
  fireEvent.mouseLeave(wrapper2.queryByTestId('toggler'));
  expect(wrapper2.queryByTestId('animatePresenceInner')).toBeFalsy();
  cleanup(wrapper2);
});

it('Тестирование content', () => {
  const wrapper = render(
    <Component hover={true} content={'Some text'}>
      Жми меня
    </Component>
  );
  fireEvent.mouseEnter(wrapper.queryByTestId('toggler'));
  expect(wrapper.queryByTestId('animatePresenceInnerContent').textContent).toBe(
    'Some text'
  );
  cleanup(wrapper);
});

it('Тестирование AnimatePresence classes', () => {
  const wrapper = render(<Component content={'Any text'}>Follow me</Component>);
  fireEvent.click(wrapper.queryByTestId('toggler'));

  expect(wrapper.queryByTestId('animatePresenceInner').className).toMatch(
    'root'
  );

  expect(wrapper.queryByTestId('animatePresenceInnerPrefix').className).toMatch(
    'prefix'
  );

  expect(
    wrapper.queryByTestId('animatePresenceInnerPrefixInner').className
  ).toMatch('prefixInner');

  expect(
    wrapper.queryByTestId('animatePresenceInnerPrefixInnerBox').className
  ).toMatch('prefixInnerBox');

  cleanup(wrapper);
});
