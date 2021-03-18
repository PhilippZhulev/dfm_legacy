import React from 'react';
import { TestWrapper } from 'helpers';
import { render } from '@testing-library/react';
import TilesWrapper from '.';

const Component = (props) => (
  <TestWrapper>
    <TilesWrapper {...props} />
  </TestWrapper>
);

describe('TilesWrapper - тест классов и style', () => {
  it('Тест отрисовки children', () => {
    const { getByTestId } = render(
      <Component>
        <div className={'test-classname'} />
      </Component>
    );
    const rootChildClassName = getByTestId('root').firstChild.className;
    expect(rootChildClassName === 'test-classname').toBeTruthy();
  });
  it('Тест атрибута margin', () => {
    const { getByTestId } = render(<Component margin={5} />);
    const root = getByTestId('root');
    const marginPresence =
      Object.values(root.style).find((key) => key === 'margin') &&
      root.style.margin === '5px';
    expect(marginPresence).toBeTruthy();
  });
});
