import React from 'react';
import { TestWrapper } from 'helpers';
import { act } from 'react-dom/test-utils';
import { render, cleanup } from '@testing-library/react';
import LockedPopUp from '.';

const Component = (props) => (
  <TestWrapper>
    <LockedPopUp {...props} />
  </TestWrapper>
);

describe('LockedPopUp - тест классов и style', () => {
  it('Тест отрисовки', () => {
    const { getByTestId } = render(<Component />);
    expect(getByTestId('title').innerHTML).toBe('Не заблокирована');
  });
  it('Тест locked', () => {
    const { getByTestId } = render(
      <Component locked lockedInfo={{ username: 'test' }} />
    );
    expect(
      getByTestId('title').innerHTML === 'Заблокировал:' &&
        getByTestId('person').innerHTML === 'test'
    ).toBeTruthy();
  });
});
