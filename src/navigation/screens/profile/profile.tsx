import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  View,
} from 'react-native';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';

// components
import {
  Disconnection,
  Header,
  ShareBottomSheet,
} from 'modules/core/components';
import {
  Root,
  ProfileContent,
  ProfileFieldsWrapper,
  Separator,
} from './profile.styled';
import {
  ProfileField,
  ProfileShare,
  ProfileRate,
  ProfileLink,
} from 'modules/profile/components';

// hooks
import { useGetProfileByIdQuery } from 'modules/profile/hooks/use-get-profile-by-id-query';

// redux
import { selectAuthValue } from 'modules/auth/redux/auth.selectors';

// utils
import { useNavigator } from 'modules/core/hooks/use-navigator';
import { getErrorMessage } from 'modules/core/utils';

// styles
import { styles } from './profile.styled';

import { IProfileFieldNameType } from 'modules/profile/types/profile-api.types';

export const Profile = () => {
  const theme = useTheme();
  const navigator = useNavigator();
  const netInfo = useNetInfo();
  const user = useSelector(selectAuthValue);

  const [modalVisible, setModalVisible] = useState(false);

  const getProfileById = useGetProfileByIdQuery(user?.id ?? '', {
    enabled: Boolean(user?.id) && netInfo.type !== 'unknown',
  });

  const errorMessage = getErrorMessage(getProfileById.error);

  const profileFields: Array<IProfileFieldNameType> = useMemo(
    () => ['title', 'name', 'specialties', 'phone', 'email', 'address'],
    []
  );

  const handleNavigate = useCallback(
    (field: IProfileFieldNameType) => () => {
      navigator.push('ProfileEdit', { field, data: getProfileById.data });
    },
    [getProfileById.data, navigator]
  );

  const toggleBottomActionBar = useCallback(
    () => setModalVisible((prevState) => !prevState),
    []
  );

  const getValue = useCallback(
    (field: string) => {
      switch (field) {
        case 'name':
          return [
            getProfileById.data?.name.firstName,
            getProfileById.data?.name.lastName,
          ]
            .filter((item) => item)
            .join(' ');
        case 'address':
          return [
            getProfileById.data?.address.street,
            [
              getProfileById.data?.address.zip,
              getProfileById.data?.address.location,
            ]
              .filter((item) => item)
              .join(' '),
          ]
            .filter((item) => item)
            .join(', ');
        case 'specialties':
          return getProfileById.data?.specialties?.join(', ') ?? '';
        case 'title':
        case 'email':
        case 'phone':
          return getProfileById.data?.[field] ?? '';
        default:
          return '';
      }
    },
    [getProfileById.data]
  );

  return (
    <Root>
      <Header
        name={'Profil'}
        color={theme.colors.orange}
        displayBackButton={false}
      />

      {getProfileById.isLoading ? (
        <ActivityIndicator
          color={theme.colors.orange}
          size={'large'}
          style={styles.indicator}
        />
      ) : errorMessage === 'Network Error' ? (
        <View style={styles.emptyList}>
          <Disconnection
            onPress={getProfileById.refetch}
            isFullScreen={false}
          />
        </View>
      ) : (
        <ProfileContent
          refreshControl={
            <RefreshControl refreshing={getProfileById.isRefetching} />
          }
        >
          <ProfileFieldsWrapper>
            {profileFields.map((field) => (
              <ProfileField
                key={field}
                field={field}
                value={getValue(field)}
                onPress={handleNavigate(field)}
              />
            ))}
            <Separator />
            <ProfileLink title={'impressum'} refetch={getProfileById.refetch} />
            <ProfileLink
              title={'datenschutz'}
              refetch={getProfileById.refetch}
            />
          </ProfileFieldsWrapper>
          <ProfileShare onPress={toggleBottomActionBar} />
          <ProfileRate refetch={getProfileById.refetch} />
        </ProfileContent>
      )}

      {modalVisible && (
        <ShareBottomSheet
          type={'profile'}
          subject={'Empfehlen sie uns Weiter'}
          body={
            Platform.OS === 'ios'
              ? Config.APPLE_STORE_APP_URL
              : Config.GOOGLE_PLAY_APP_URL
          }
          modalVisible={modalVisible}
          onPress={toggleBottomActionBar}
        />
      )}
    </Root>
  );
};
