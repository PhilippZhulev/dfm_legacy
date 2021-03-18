import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { TableElement } from '../Table/Context';
import TableCell from '.';

const Component = (props) => {
  const ref = React.createRef();
  return (
    <TableElement.Provider value={props.context}>
      <table>
        <tbody>
          <tr>
            <TableCell {...props} ref={ref} />
          </tr>
        </tbody>
      </table>
    </TableElement.Provider>
  );
};

describe('Тестирование классов', () => {
  it('Без head, checkbox и stickyHeader', () => {
    const { queryByTestId } = render(<Component context={{}} />);
    expect(queryByTestId('cell').className).toMatch('root');
    expect(queryByTestId('cell').className).not.toMatch('head');
    expect(queryByTestId('cell').className).not.toMatch('checkbox');
    expect(queryByTestId('cell').className).not.toMatch('stickyHeader');
    cleanup();
  });

  it('Без с head, checkbox и stickyHeader', () => {
    const { queryByTestId } = render(
      <Component
        checkbox={true}
        context={{ element: 'head', stickyHeader: true }}
      />
    );
    expect(queryByTestId('cell').className).toMatch('root');
    expect(queryByTestId('cell').className).toMatch('head');
    expect(queryByTestId('cell').className).toMatch('checkbox');
    expect(queryByTestId('cell').className).toMatch('stickyHeader');
    cleanup();
  });
});

it('Тестирование children', () => {
  const { queryByTestId } = render(
    <Component context={{}}>Some text</Component>
  );
  expect(queryByTestId('cell').innerHTML).toMatch('Some text');
  cleanup();
});

describe('Тестирование td/th', () => {
  it('без head', () => {
    const { queryByTestId } = render(
      <Component context={{}}>Some text</Component>
    );
    expect(queryByTestId('cell').tagName.toLowerCase()).toBe('td');
    cleanup();
  });
  it('с head', () => {
    const { queryByTestId } = render(
      <Component context={{ element: 'head' }}>Some text</Component>
    );
    expect(queryByTestId('cell').tagName.toLowerCase()).toBe('th');
    cleanup();
  });
});
