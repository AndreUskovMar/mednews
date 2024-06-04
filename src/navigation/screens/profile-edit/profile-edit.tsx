import React, { useCallback, useContext, useMemo, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';

// components
import {
  Root,
  ProfileEditTitle,
  ProfileEditSubtitle,
  ProfileEditButtonWrapper,
  SafeArea,
  Separator,
} from './profile-edit.styled';
import { Button, Header } from 'modules/core/components';
import { ProfileInput } from 'modules/profile/components';
import { SpecialtyItem } from 'modules/accounts/components';

// hooks
import { useSetProfileByIdInMutation } from 'modules/profile/hooks/use-set-profile-by-id-in-mutation';
import { useNavigator } from 'modules/core/hooks/use-navigator';

// redux
import { selectAuthValue } from 'modules/auth/redux/auth.selectors';

// context
import { AccountsContext } from 'modules/accounts/context/accounts-provider';

// styles
import { styles } from './profile-edit.styled';

import { ParamList } from 'navigation/stacks/profile.stack';
import { ISpecialtyItem } from 'modules/accounts/components/specialty/specialty-item.interface';
import { IProfileFieldNameType } from 'modules/profile/types/profile-api.types';

export const initialProfile = {
  title: '',
  name: {
    firstName: '',
    lastName: '',
  },
  specialties: [],
  email: '',
  phone: '',
  address: {
    street: '',
    zip: '',
    location: '',
  },
};

export const ProfileEdit = () => {
  const navigator = useNavigator();
  const user = useSelector(selectAuthValue);
  const netInfo = useNetInfo();
  const route = useRoute<RouteProp<ParamList, 'ProfileEdit'>>();
  const { field, data } = route.params;

  const setProfileById = useSetProfileByIdInMutation();

  const { specialties } = useContext(AccountsContext);

  const [profile, setProfile] = useState(data || initialProfile);

  const fieldTitlesMap: Record<
    IProfileFieldNameType,
    { title: string; subtitle: string }
  > = useMemo(
    () => ({
      title: {
        title: 'Titel ändern',
        subtitle: 'Was haben Sie für einen Titel',
      },
      name: { title: 'Namen ändern', subtitle: 'Wie lautet Ihr Name' },
      specialties: {
        title: 'Fachrichtung ändern',
        subtitle:
          'Zu welchen Fachrichtungen möchten Sie Informationen erhalten',
      },
      phone: {
        title: 'Mobilnummer ändern',
        subtitle: 'Wie lautet Ihre Mobilnummer',
      },
      email: {
        title: 'E-Mail-Adresse ändern',
        subtitle: 'Wie lautet Ihre E-Mail-Adresse',
      },
      address: {
        title: 'Anschrift ändern',
        subtitle: 'Wie lautet die Adresse Ihrer Praxis / Ihrer Klinik',
      },
    }),
    []
  );

  const updateValue = useCallback(
    (key: string, value: string) => {
      switch (field) {
        case 'title':
        case 'phone':
        case 'email':
          return { ...profile, [key]: value };
        case 'name':
        case 'address':
          return {
            ...profile,
            [field]: {
              ...profile[field],
              [key]: value,
            },
          };
      }
    },
    [field, profile]
  );

  const handleChangeText = useCallback(
    (key: string) => (value: string) => {
      setProfile((prevState) => ({ ...prevState, ...updateValue(key, value) }));
    },
    [updateValue]
  );

  const handleChangeSpecialties = useCallback(
    (item, selected) => {
      const mySpecialties = profile.specialties!;
      const myNewSpecialties = selected
        ? mySpecialties.filter((i) => i !== item)
        : [...mySpecialties, item];

      if (myNewSpecialties.length) {
        setProfile((prevState) => ({
          ...prevState,
          specialties: myNewSpecialties,
        }));
      }
    },
    [profile]
  );

  const handleUpdateProfile = useCallback(() => {
    if (!netInfo.isConnected) {
      navigator.reset('Profil');
      return;
    }

    if (user) {
      setProfileById.mutate(
        { userId: user.id, profile },
        {
          onSuccess: navigator.back,
        }
      );
    }
  }, [navigator, netInfo, profile, setProfileById, user]);

  const renderItem: ListRenderItem<ISpecialtyItem> = useCallback(
    ({ item }) => (
      <SpecialtyItem
        item={item}
        selected={Boolean(profile?.specialties?.includes(item))}
        showMySpecialties={handleChangeSpecialties}
      />
    ),
    [profile, handleChangeSpecialties]
  );

  const { title, subtitle } = fieldTitlesMap[field];

  return (
    <SafeArea>
      <Header displayBackButton />
      <Root>
        <ProfileEditTitle>{title}</ProfileEditTitle>
        <ProfileEditSubtitle>{subtitle}?</ProfileEditSubtitle>

        {field === 'title' && (
          <ProfileInput
            label={'Titel'}
            placeholder={'Dr.'}
            value={profile?.title ?? ''}
            onChangeText={handleChangeText(field)}
          />
        )}

        {field === 'email' && (
          <ProfileInput
            label={'E-Mail'}
            placeholder={'mustermann@mail.com'}
            value={profile?.email ?? ''}
            onChangeText={handleChangeText(field)}
          />
        )}

        {field === 'phone' && (
          <ProfileInput
            label={'Mobilnummer'}
            placeholder={'0178 / 1234567'}
            value={profile?.phone ?? ''}
            onChangeText={handleChangeText(field)}
          />
        )}

        {field === 'name' && (
          <React.Fragment>
            <ProfileInput
              label={'Vorname'}
              placeholder={'Max'}
              value={profile?.name?.firstName ?? ''}
              onChangeText={handleChangeText('firstName')}
            />
            <ProfileInput
              label={'Nachname'}
              placeholder={'Mustermann'}
              value={profile?.name?.lastName ?? ''}
              onChangeText={handleChangeText('lastName')}
            />
          </React.Fragment>
        )}

        {field === 'address' && (
          <React.Fragment>
            <ProfileInput
              label={'Straße & Hausnummer'}
              placeholder={'Musterstraße 7'}
              value={profile?.address?.street ?? ''}
              onChangeText={handleChangeText('street')}
            />
            <ProfileInput
              label={'Postleitzahl'}
              placeholder={'12345'}
              value={profile?.address?.zip ?? ''}
              onChangeText={handleChangeText('zip')}
            />
            <ProfileInput
              label={'Ort'}
              placeholder={'Musterstadt'}
              value={profile?.address?.location ?? ''}
              onChangeText={handleChangeText('location')}
            />
          </React.Fragment>
        )}

        {field === 'specialties' && (
          <FlatList<ISpecialtyItem>
            data={specialties.sort()}
            renderItem={renderItem}
            ItemSeparatorComponent={Separator}
            keyExtractor={(item) => item}
            style={styles.list}
          />
        )}
      </Root>

      <ProfileEditButtonWrapper>
        <Button title={'Bestätigen'} onPress={handleUpdateProfile} />
      </ProfileEditButtonWrapper>
    </SafeArea>
  );
};
