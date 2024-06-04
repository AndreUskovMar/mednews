import React from 'react';
// utils
import { renderWithProviders } from 'utils/render-with-providers';

import { Typography } from './typography';

it('Typography renders correctly', () => {
  renderWithProviders(<Typography variant={'body'} />);
});

it('Typography should contain text', () => {
  const { getByText } = renderWithProviders(
    <Typography variant={'body'}>Test</Typography>
  );

  expect(getByText('Test')).toBeDefined();
});
