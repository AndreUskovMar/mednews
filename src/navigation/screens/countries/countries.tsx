import React, { useCallback, useState } from 'react';
import { ListRenderItem, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// components
import {
  Root,
  Separator,
  ButtonWrapper,
  FooterTypography,
  styles,
} from './countries.styled';
import { Title } from 'navigation/screens/intro/intro.styled';
import { Header, Typography, SafeArea, Button } from 'modules/core/components';
import { CountryItem, Footer } from 'modules/accounts/components';

// constants
import countries from 'modules/accounts/constants/country-names';

import { selectAuthValue } from 'modules/auth/redux/auth.selectors';
import { selectAccountsValue } from 'modules/accounts/redux/accounts.selectors';
import { accountsSet } from 'modules/accounts/redux/accounts.reducers';
import { ICountryItem } from 'modules/accounts/components/country/country-item.interface';

export const Countries = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectAuthValue);
  const accounts = useSelector(selectAccountsValue);
  const [myCountry, setMyCountry] = useState<string>('');

  const navigate = useCallback(async () => {
    if (data) {
      dispatch(accountsSet([...accounts, { id: data.id, myCountry }]));
    }
  }, [accounts, data, dispatch, myCountry]);

  const showMyCountries = useCallback(setMyCountry, [setMyCountry]);

  const renderItem: ListRenderItem<ICountryItem> = useCallback(
    ({ item }) => (
      <CountryItem
        item={item}
        disabled={item.name === myCountry}
        showMyCountries={showMyCountries}
      />
    ),
    [myCountry, showMyCountries]
  );

  return (
    <SafeArea>
      <Header displayBackButton />
      <Root>
        <Title>{'Land wählen'}</Title>
        <Typography variant={'h3'}>
          {'Wählen Sie das Land aus in dem Sie wohnen, um Studien zu finden.'}
        </Typography>

        <FlatList<ICountryItem>
          data={countries}
          renderItem={renderItem}
          ItemSeparatorComponent={Separator}
          keyExtractor={(item) => item.name}
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
            onPress={navigate}
            disabled={!myCountry.length}
          />
        </ButtonWrapper>
      </Footer>
    </SafeArea>
  );
};
