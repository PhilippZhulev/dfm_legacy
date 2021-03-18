import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { TableElement } from '../Table/Context';
import TableRow from '.';

const Component = (props) => {
  const ref = React.createRef();
  return (
    <TableElement.Provider value={props.context}>
      <table>
        <tbody>
          <TableRow {...props} ref={ref} />
        </tbody>
      </table>
    </TableElement.Provider>
  );
};

it('Тестирование классов без head', () => {
  const { queryByTestId } = render(<Component context={{}} />);
  expect(queryByTestId('tr').className).toMatch('root');
  expect(queryByTestId('tr').className).not.toMatch('head');
  cleanup();
});

it('Тестирование классов с head', () => {
  const { queryByTestId } = render(<Component context={{ element: 'head' }} />);
  expect(queryByTestId('tr').className).toMatch('root');
  expect(queryByTestId('tr').className).toMatch('head');
  cleanup();
});

it('Тестирование children', () => {
  const { queryByTestId } = render(
    <Component context={{ element: 'head' }}>
      <td>Some text</td>
    </Component>
  );
  expect(queryByTestId('tr').innerHTML).toMatch('Some text');
  cleanup();
});
