import React from 'react';
import { TestWrapper } from 'helpers';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Favorite from '.';
import StarFavorited from '../../svg/StarFavorited';
import StarUnFavorited from '../../svg/StarUnFavorited';

const Component = (props) => (
  <TestWrapper>
    <Favorite {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

it('Тестирование isFavorite=false', () => {
  const container = render(<Component />);

  expect(container.queryByTestId('starUnFavorited').outerHTML).toBe(
    render(<StarUnFavorited />).container.innerHTML
  );

  cleanup();
});

it('Тестирование isFavorite=true', () => {
  const container = render(<Component isFavorite={true} />);

  expect(container.queryByTestId('starFavorited').outerHTML).toBe(
    render(<StarFavorited />).container.innerHTML
  );

  cleanup();
});
