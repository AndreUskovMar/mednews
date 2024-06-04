import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components';

// components
import {
  ProfileFieldWrapper,
  ProfileFieldTitle,
  ProfileFieldValue,
} from './profile-field.styled';
import { Icon } from 'modules/core/components/icon';

// utils
import { hPx } from 'styles/pixel-ratio';

import { ProfileFieldProps } from './profile-field.interface';

export const ProfileField = memo<ProfileFieldProps>(
  ({ field, value, onPress }) => {
    const theme = useTheme();
    const fieldTitleMap: Record<ProfileFieldProps['field'], string> = useMemo(
      () => ({
        title: 'Titel',
        name: 'Name',
        specialties: 'Fachrichtung und Interessen',
        phone: 'Mobilnummer',
        email: 'E-Mail',
        address: 'Anschrift',
      }),
      []
    );

    const title = fieldTitleMap[field];

    return (
      <ProfileFieldWrapper
        activeOpacity={theme.touchable.activeOpacity}
        onPress={onPress}
      >
        <View>
          <ProfileFieldTitle>{title}</ProfileFieldTitle>
          <ProfileFieldValue>{value}</ProfileFieldValue>
        </View>

        <Icon
          name={'forward'}
          color={theme.colors.black}
          height={hPx(14)}
          width={hPx(14)}
        />
      </ProfileFieldWrapper>
    );
  }
);
