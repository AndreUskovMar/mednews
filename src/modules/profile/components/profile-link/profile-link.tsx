import React, { memo, useCallback, useMemo } from 'react';
import { Alert, Linking } from 'react-native';
import Config from 'react-native-config';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from 'styled-components';

// components
import {
  ProfileLinkWrapper,
  ProfileLinkTitle,
  ProfileLinkSubtitle,
} from './profile-link.styled';

import { ProfileLinkProps } from './profile-link.interface';

export const ProfileLink = memo<ProfileLinkProps>(({ title, refetch }) => {
  const theme = useTheme();
  const netInfo = useNetInfo();

  const profileLinkMap: Record<
    ProfileLinkProps['title'],
    { subtitle: string; url: string }
  > = useMemo(
    () => ({
      impressum: {
        subtitle: 'Informationen zu Orange Salamander',
        url: Config.IMPRESSUM_URL,
      },
      datenschutz: {
        subtitle: 'Informationen zum Datenschutz',
        url: Config.DATENSCHUTZ_URL,
      },
    }),
    []
  );

  const { subtitle, url } = profileLinkMap[title];

  const handleWebsite = useCallback(async () => {
    if (!netInfo.isConnected) {
      return refetch();
    }

    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error =>', JSON.stringify(error));
    }
  }, [url, netInfo, refetch]);

  return (
    <ProfileLinkWrapper
      activeOpacity={theme.touchable.activeOpacity}
      onPress={handleWebsite}
    >
      <ProfileLinkTitle>{title}</ProfileLinkTitle>
      <ProfileLinkSubtitle>{subtitle}</ProfileLinkSubtitle>
    </ProfileLinkWrapper>
  );
});
