import React, { memo } from 'react';
import { useTheme } from 'styled-components';

// components
import { ProfileShareWrapper, ProfileShareText } from './profile-share.styled';
import { Icon } from 'modules/core/components/icon';

// utils
import { hPx } from 'styles/pixel-ratio';

import { ProfileShareProps } from './profile-share.interface';

export const ProfileShare = memo<ProfileShareProps>(({ onPress }) => {
  const theme = useTheme();
  return (
    <ProfileShareWrapper
      activeOpacity={theme.touchable.activeOpacity}
      onPress={onPress}
    >
      <ProfileShareText>{'Empfehlen Sie uns weiter'}</ProfileShareText>

      <Icon
        name={'share'}
        color={theme.colors.white}
        height={hPx(20)}
        width={hPx(20)}
      />
    </ProfileShareWrapper>
  );
});
