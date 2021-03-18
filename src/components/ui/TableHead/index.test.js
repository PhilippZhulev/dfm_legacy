import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { render, cleanup } from '@testing-library/react';
import TableHead from '.';

const Component = (props) => {
  const ref = React.createRef();
  return (
    <>
      <table>
        <TableHead {...props} ref={ref} />
      </table>
    </>
  );
};

it('Тестирование классов', () => {
  const { queryByTestId } = render(<Component />);
  expect(queryByTestId('thead').className).toMatch('root');
  cleanup();
});

it('Тестирование children', () => {
  const child = (
    <tr>
      <td>Some text</td>
    </tr>
  );

  const { queryByTestId } = render(<Component>{child}</Component>);
  expect(queryByTestId('thead').innerHTML).toMatch(
    ReactDOMServer.renderToStaticMarkup(child)
  );
  cleanup();
});
