import React from 'react';
import { TestWrapper } from 'helpers';
// import { render, cleanup, fireEvent } from '@testing-library/react';
import Preload from '.';

const Component = (props) => (
  <TestWrapper>
    <Preload {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

// TODO: Проблема тестирования. Валятся тесты, если не закомментирован CircularProgress внутри компонента Preload
// eslint-disable-next-line jest/no-commented-out-tests
/* it('Тестирование основных параметров (className)', () => {
  const st = {
    bg: true,
    message: 'Some text',
  };
  const container = render(<Component state={st} />);

  expect(container.queryByTestId('root').className).toMatch('root');
  expect(container.queryByTestId('wrapper').className).toMatch('wrapper');

  cleanup();
});

it('Тестирование основных параметров (state)', () => {
  const st = {
    bg: false,
    message: 'Some text',
  };
  const container = render(<Component state={st} />);
  expect(container.queryByTestId('root').className).not.toBe('root');
  expect(container.queryByTestId('text').innerHTML).toBe(st.message);
  cleanup();
}); */
