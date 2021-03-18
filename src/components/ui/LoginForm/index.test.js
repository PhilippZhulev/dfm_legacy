import React from 'react';
import { TestWrapper } from 'helpers';
import { render, fireEvent, cleanup } from '@testing-library/react';
import LoginForm from '.';
import LoginLogo from '../../svg/LoginLogo';

const Component = (props) => (
  <TestWrapper>
    <LoginForm {...props} />
  </TestWrapper>
);

describe('LoginForm - тест классов и style', () => {
  it('Тест отрисовки', () => {
    const container = render(<Component />);
    expect(container.queryByTestId('form').childElementCount).toBe(1);
  });
  it('Тест children', () => {
    const container = render(
      <Component>
        <div data-testid='testContent' className={'test'} />
      </Component>
    );
    expect(
      container.queryByTestId('form').childElementCount === 2 &&
        container.queryByTestId('testContent').className === 'test'
    ).toBeTruthy();
  });
  it('Тест logo', () => {
    const container = render(<Component />);
    const loginLogo = render(<LoginLogo />);
    expect(container.queryByTestId('logo').innerHTML).toBe(
      loginLogo.container.innerHTML
    );
  });
});
