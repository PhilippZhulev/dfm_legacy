import React from 'react';
import { TestWrapper } from 'helpers';
import { render } from '@testing-library/react';
import Table from '.';

const Component = (props) => {
  const ref = React.createRef();
  return (
    <TestWrapper>
      <Table {...props} ref={ref} />
    </TestWrapper>
  );
};

describe('Тестирование classes', () => {
  it('Тестирование базового класса', () => {
    const container = render(
      <Component>
        <tbody>
          <tr>
            <td>test</td>
          </tr>
        </tbody>
      </Component>
    );
    expect(container.queryByTestId('root').className).toMatch('root');
  });

  it('Тестирование дополнительного класса', () => {
    const container = render(
      <Component className='custom'>
        <tbody>
          <tr>
            <td>test</td>
          </tr>
        </tbody>
      </Component>
    );
    expect(container.queryByTestId('root').className).toMatch('root');
    expect(container.queryByTestId('root').className).toMatch('custom');
  });
});

it('Тестирование children', () => {
  const container = render(
    <Component>
      <tbody>
        <tr>
          <td>Some text</td>
        </tr>
      </tbody>
    </Component>
  );
  expect(container.queryByTestId('root').innerHTML).toMatch('Some text');
});
