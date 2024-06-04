import React, { memo } from 'react';

// components
import { IconWrapper, SpecialityButton } from './specialty-item.styled';
import { Typography } from 'modules/core/components';
import { Icon } from 'modules/core/components/icon';

import { SpecialtyItemProps } from './specialty-item.interface';

export const SpecialtyItem = memo<SpecialtyItemProps>(
  ({ item, selected, showMySpecialties }) => (
    <SpecialityButton
      {...{ selected }}
      onPress={() => showMySpecialties(item, selected)}
    >
      <IconWrapper {...{ selected }}>
        {selected && <Icon name={'done'} />}
      </IconWrapper>
      <Typography variant={'h4'}>{item}</Typography>
    </SpecialityButton>
  )
);
