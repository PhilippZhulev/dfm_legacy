import React from 'react';
import { TestWrapper } from 'helpers';
import { render } from '@testing-library/react';
import TableButtons from '.';

const Component = (props) => (
  <TestWrapper>
    <TableButtons {...props} />
  </TestWrapper>
);

describe('TableButtons - тест классов и style', () => {
  it('Тест отрисовки children', () => {
    const { getByTestId } = render(
      <Component>
        <div>test</div>
      </Component>
    );
    expect(getByTestId('root').firstChild.innerHTML).toBe('test');
  });
});
