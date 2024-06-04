import React from 'react';
// utils
import {renderWithProviders} from 'utils/render-with-providers';

import {Intro} from 'navigation/screens';

it('Intro renders correctly', () => {
  renderWithProviders(<Intro />);
});

it('Intro displays data', () => {
  const {getByText} = renderWithProviders(<Intro />);

  expect(getByText(/Orange Salamander/)).toBeDefined();
  expect(getByText(/Über DocCheck verifizieren/)).toBeDefined();
});
