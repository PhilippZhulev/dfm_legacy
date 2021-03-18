import React from 'react';
import { TestWrapper } from 'helpers';
import { render, cleanup, fireEvent } from '@testing-library/react';
import MenuButton from '.';

const Component = (props) => (
  <TestWrapper>
    <MenuButton {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

it('Тестирование classes', () => {
  const container = render(<Component />);
  expect(container.queryByTestId('menuButton').className).toMatch('menuButton');
  cleanup();
});

it('Тестирование onClick', () => {
  const onClick = jest.fn();
  const container = render(<Component onClick={() => onClick('click!')} />);
  fireEvent.click(container.queryByTestId('menuButton'));

  expect(onClick).toHaveBeenCalledWith('click!');
  cleanup();
});
