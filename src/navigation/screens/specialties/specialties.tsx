import React, { useEffect, useCallback, useState, useContext } from 'react';
import { ListRenderItem, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

// components
import {
  Root,
  Separator,
  ButtonWrapper,
  FooterTypography,
  styles,
} from './specialties.styled';
import { Title } from 'navigation/screens/intro/intro.styled';
import { Typography, SafeArea } from 'modules/core/components';
import { Footer, SpecialtyItem } from 'modules/accounts/components';
import { Button } from 'modules/core/components';

// hooks
import { useGetProfileByIdQuery } from 'modules/profile/hooks/use-get-profile-by-id-query';
import { useSetProfileByIdInMutation } from 'modules/profile/hooks/use-set-profile-by-id-in-mutation';

// redux
import { selectAuthValue } from 'modules/auth/redux/auth.selectors';

// context
import { AccountsContext } from 'modules/accounts/context/accounts-provider';

// utils
import { useNavigator } from 'modules/core/hooks/use-navigator';

import { ISpecialtyItem } from 'modules/accounts/components/specialty/specialty-item.interface';
import { initialProfile } from 'navigation/screens/profile-edit/profile-edit';

export const Specialties = () => {
  const navigator = useNavigator();
  const user = useSelector(selectAuthValue);
  const setProfileById = useSetProfileByIdInMutation();

  const getProfileById = useGetProfileByIdQuery(user?.id ?? '', {
    enabled: Boolean(user?.id),
  });

  const { specialties } = useContext(AccountsContext);

  const [mySpecialties, setMySpecialties] = useState<Array<string>>([]);

  useEffect(() => {
    if (getProfileById.data) {
      setMySpecialties(getProfileById.data?.specialties ?? []);
    }
  }, [getProfileById.data]);

  const showMySpecialties = useCallback(
    (item, selected) => {
      const myNewSpecialties = selected
        ? mySpecialties.filter((i) => i !== item)
        : [...mySpecialties, item];
      setMySpecialties(myNewSpecialties);
    },
    [mySpecialties]
  );

  const handleUpdateProfile = useCallback(() => {
    if (user) {
      const profile = {
        ...(getProfileById.data ?? initialProfile),
        specialties: mySpecialties,
      };

      setProfileById.mutate(
        {
          userId: user.id,
          profile,
        },
        {
          onSuccess: () => {
            navigator.push('Countries');
          },
        }
      );
    }
  }, [getProfileById, mySpecialties, navigator, setProfileById, user]);

  const renderItem: ListRenderItem<ISpecialtyItem> = useCallback(
    ({ item }) => (
      <SpecialtyItem
        item={item}
        selected={mySpecialties.includes(item)}
        showMySpecialties={showMySpecialties}
      />
    ),
    [mySpecialties, showMySpecialties]
  );

  return (
    <SafeArea>
      <Root>
        <Title>{'Fachrichtung wählen'}</Title>
        <Typography variant={'h3'}>
          {'Zu welchen Fachrichtungen möchten Sie Informationen erhalten?'}
        </Typography>

        <FlatList<ISpecialtyItem>
          data={specialties.sort()}
          renderItem={renderItem}
          ItemSeparatorComponent={Separator}
          keyExtractor={(item) => item}
          style={styles.list}
        />
      </Root>

      <Footer variant={'center'}>
        <FooterTypography>
          {'Die Auswahl kann jederzeit in den Einstellungen angepasst werden.'}
        </FooterTypography>
        <ButtonWrapper>
          <Button
            title={'Weiter'}
            onPress={handleUpdateProfile}
            disabled={!mySpecialties.length}
          />
        </ButtonWrapper>
      </Footer>
    </SafeArea>
  );
};
