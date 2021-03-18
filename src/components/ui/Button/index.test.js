import React from 'react';
import { TestWrapper } from 'helpers';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Button from '.';

const Component = (props) => (
  <TestWrapper>
    <Button {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

it('Тестирование className', () => {
  const container = render(<Component />);
  expect(container.queryByTestId('root').className).toMatch('root');
  expect(container.queryByTestId('button').className).toMatch('button');
  cleanup();

  const container2 = render(<Component mod={true} />);
  expect(container2.queryByTestId('button').className).toMatch('mod_blue');
  cleanup();

  const container3 = render(<Component red={true} />);
  expect(container3.queryByTestId('button').className).toMatch('mod_red');
  cleanup();

  const container4 = render(<Component position='center' />);
  expect(container4.queryByTestId('button').className).toMatch(
    'button__center'
  );
  cleanup();

  const container5 = render(<Component position='right' />);
  expect(container5.queryByTestId('button').className).toMatch('button__right');
  cleanup();

  const container6 = render(<Component position='left' />);
  expect(container6.queryByTestId('button').className).toMatch('button__left');
  cleanup();
});

it('Тестирование text', () => {
  const container = render(<Component text='Some text' />);
  expect(container.queryByTestId('button').innerHTML).toMatch('Some text');
  cleanup();
});

it('Тестирование onClick и disabled', () => {
  const onClick = jest.fn();
  const container = render(<Component onClick={() => onClick('click!')} />);
  fireEvent.click(container.queryByTestId('button'));
  expect(onClick).toHaveBeenCalledWith('click!');
  cleanup();

  const onClick2 = jest.fn();
  const container2 = render(
    <Component disabled={true} onClick={() => onClick('click!')} />
  );
  fireEvent.click(container2.queryByTestId('button'));
  expect(onClick2).not.toHaveBeenCalledWith('click!');
  cleanup();
});
