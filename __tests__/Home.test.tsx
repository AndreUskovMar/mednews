import React from 'react';
// utils
import { renderWithProviders } from 'utils/render-with-providers';

import { News } from 'navigation/screens';

it('Contact renders correctly', () => {
  renderWithProviders(<News />);
});

it('Contact displays data', () => {
  const { getByText } = renderWithProviders(<News />);

  expect(getByText(/Willkommen in der App/)).toBeDefined();
  expect(getByText(/Logout/)).toBeDefined();
});
