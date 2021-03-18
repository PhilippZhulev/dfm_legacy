import React from 'react';
import { TestWrapper } from 'helpers';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Icon from '.';

const Component = (props) => {
  const ref = React.createRef();
  return (
    <TestWrapper>
      <Icon {...props} ref={ref} />
    </TestWrapper>
  );
};

jest.useFakeTimers();

it('Тестирование classes', () => {
  const container = render(<Component />);
  expect(container.queryByTestId('host').className).toMatch('host');
  expect(container.queryByTestId('svg').getAttribute('class')).toMatch('svg');
  cleanup();
});

it('Тестирование title', () => {
  const container = render(<Component title='Some title' />);
  expect(container.queryByTestId('host').innerHTML).toMatch('Some title');
  cleanup();
});

it('Тестирование onClick', () => {
  const onClick = jest.fn();
  const container = render(<Component onClick={() => onClick('click!')} />);
  fireEvent.click(container.queryByTestId('host'));
  expect(onClick).toHaveBeenCalledWith('click!');
});

// eslint-disable-next-line jest/no-commented-out-tests
/* it('Тестирование icon (object)', () => {
  // TODO: проблема тестирования icon. Render возвращает undefined на svgForRender
}); */
