import React from 'react';
import { fireEvent } from '@testing-library/react-native';
//utils
import { renderWithProviders } from 'utils/render-with-providers';

import { Button } from './button';

it('Button renders correctly', () => {
  renderWithProviders(<Button title={'test'} />);
});

it('Button should be clickable', () => {
  const press = jest.fn();

  const { getByText } = renderWithProviders(
    <Button title={'test'} onPress={press} />
  );

  fireEvent.press(getByText('test'));

  expect(press).toBeCalledTimes(1);
});
