import React from 'react';
import { TestWrapper } from 'helpers';
import { render, cleanup } from '@testing-library/react';
import ConsumedResources from '.';

const Component = (props) => (
  <TestWrapper>
    <ConsumedResources {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

it('Тестирование ConsumedResources classes', () => {
  const container = render(
    <Component title={'test'} value={1000000} color={'#fff'} />
  );
  expect(container.queryByTestId('root').className).toMatch('root');
  expect(container.queryByTestId('title').className).toMatch('title');
  expect(container.queryByTestId('color').className).toMatch('category');
  expect(container.queryByTestId('value').className).toMatch('value');
  cleanup();
});

it('Тестирование ConsumedResources данные', () => {
  const container = render(
    <Component label={'test'} value={1000000} color={'#ffffff'} />
  );
  expect(container.queryByTestId('title').innerHTML).toBe('test');
  expect(container.queryByTestId('value').innerHTML).toBe('1 000 000 ед.');
  expect(container.queryByTestId('color').style.background).toBe(
    'rgb(255, 255, 255)'
  );
  cleanup();
});
