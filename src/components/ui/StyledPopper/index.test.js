import React from 'react';
import { render, cleanup } from '@testing-library/react';
import StyledPopover from '.';

const Component = (props) => (
  <>
    <StyledPopover {...props} />
  </>
);

it('Тестирование классов', () => {
  const { queryByTestId } = render(<Component />);
  expect(queryByTestId('root').className).toMatch('root');
  cleanup();
});

it('Тестирование children', () => {
  const { queryByTestId } = render(<Component>{'Some text'}</Component>);
  expect(queryByTestId('root').innerHTML).toMatch('Some text');
  cleanup();
});

// TODO: Проблема тестирования. UseEffect и внутренние функции без экспорта
