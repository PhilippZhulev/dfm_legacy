import React from 'react';
import { TestWrapper } from 'helpers';
import { render, cleanup } from '@testing-library/react';
import ModelTileProgress from '.';

const Component = (props) => (
  <TestWrapper>
    <ModelTileProgress {...props} />
  </TestWrapper>
);

describe('ModelTileProgress - тест классов и style', () => {
  it('Тест отрисовки', () => {
    const container = render(<Component />);
    expect(container.queryByTestId('root').childElementCount).toBe(0);
    cleanup();
  });
  it('Тест stageDict', () => {
    const container = render(
      <Component stageDict={[{ label: 'test-1' }, { label: 'test-2' }]} />
    );
    const childClasses = Array.from(
      container.queryByTestId('root').children
    ).map((child) => child.className);
    expect(container.queryByTestId('root').childElementCount).toBe(2);
    expect(
      Boolean(childClasses.find((el) => el.includes('completed')))
    ).toBeFalsy();
    cleanup();
  });
});

// TODO: Проблема тестирования. UseEffect и useState
