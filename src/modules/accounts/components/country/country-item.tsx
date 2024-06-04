import React, { memo } from 'react';

// components
import { Typography } from 'modules/core/components';
import { Image, CountryButton } from './country-item.styled';

import { CountryItemProps } from './country-item.interface';

export const CountryItem = memo<CountryItemProps>(
  ({ item, disabled, showMyCountries }) => (
    <CountryButton
      disabled={disabled}
      onPress={() => showMyCountries(item.name)}
    >
      <Image source={item.image} />
      <Typography variant={'h4'}>{item.name}</Typography>
    </CountryButton>
  )
);
