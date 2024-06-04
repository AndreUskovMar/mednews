import React, { memo } from 'react';
import { useTheme } from 'styled-components/native';

// components
import { Typography } from 'modules/core/components';
import { Root, Input } from './profile-input.styled';

import { ProfileInputProps } from './profile-input.interface';

export const ProfileInput = memo<ProfileInputProps>(
  ({ label, placeholder, value, onChangeText }) => {
    const theme = useTheme();
    return (
      <Root>
        <Typography variant={'h4'}>{label}</Typography>
        <Input
          placeholder={placeholder}
          placeholderTextColor={theme.colors.tabGrey}
          value={value}
          onChangeText={onChangeText}
        />
      </Root>
    );
  }
);
