import React from 'react';
import { TestWrapper } from 'helpers';
import { render, cleanup } from '@testing-library/react';
import ConsumedResourcesIterable from '.';

const Component = (props) => (
  <TestWrapper>
    <ConsumedResourcesIterable {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

it('Тестирование ConsumedResourcesIterable data', () => {
  const data = [
    { label: 'test-1', value: 1000000, color: '#fff' },
    { label: 'test-2', value: 2000000, color: '#fff' },
    { label: 'test-3', value: 3000000, color: '#fff' },
  ];
  const result = [];
  render(<Component all={true} content={(p) => result.push(p)} data={data} />);

  expect(result.length).toBe(3);
  expect(result[0].label).toBe('test-1');
  expect(result[0].value).toBe(1000000);
  expect(result[0].color).toBe('#fff');

  expect(result[1].label).toBe('test-2');
  expect(result[1].value).toBe(2000000);
  expect(result[1].color).toBe('#fff');

  expect(result[2].label).toBe('test-3');
  expect(result[2].value).toBe(3000000);
  expect(result[2].color).toBe('#fff');

  cleanup();
});

it('Тестирование ConsumedResourcesIterable no data', () => {
  const result = [];
  render(<Component all={true} content={(p) => result.push(p)} />);
  expect(result.length).toBe(0);
});
