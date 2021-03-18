import React from 'react';
import { TestWrapper } from 'helpers';
import { render } from '@testing-library/react';
import TableButtonsItem from '.';

const Component = (props) => (
  <TestWrapper>
    <TableButtonsItem {...props} />
  </TestWrapper>
);

describe('TableButtonsItem - тест классов и style', () => {
  it('Тест отрисовки children', () => {
    const { queryByTestId } = render(
      <Component>
        <div>test</div>
      </Component>
    );
    expect(queryByTestId('root').firstChild.innerHTML).toBe('test');
  });
});
