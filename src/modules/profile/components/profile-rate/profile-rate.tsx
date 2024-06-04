import React, { memo, useCallback } from 'react';
import { Alert } from 'react-native';
import InAppReview from 'react-native-in-app-review';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from 'styled-components';

// components
import { ProfileRateWrapper } from './profile-rate.styled';
import { Icon } from 'modules/core/components/icon';
import { Typography } from 'modules/core/components';

// utils
import { hPx } from 'styles/pixel-ratio';

export const ProfileRate = memo(({ refetch }: { refetch: () => void }) => {
  const theme = useTheme();
  const netInfo = useNetInfo();

  const handleRate = useCallback(async () => {
    const isAvailable = InAppReview.isAvailable();

    if (!isAvailable) {
      Alert.alert(
        'Error =>',
        'This version of device not supported to rate app!'
      );

      return;
    }

    if (!netInfo.isConnected) {
      return refetch();
    }

    try {
      await InAppReview.RequestInAppReview();
    } catch (e) {
      Alert.alert('Error =>', JSON.stringify(e));
    }
  }, [refetch, netInfo]);

  return (
    <ProfileRateWrapper
      activeOpacity={theme.touchable.activeOpacity}
      onPress={handleRate}
    >
      <Typography variant={'h4'}>{'Bewerten Sie die Anwendung'}</Typography>

      <Icon
        name={'star'}
        color={theme.colors.lightBlue}
        height={hPx(20)}
        width={hPx(20)}
      />
    </ProfileRateWrapper>
  );
});
