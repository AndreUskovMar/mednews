import React, { memo, useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components';

// components
import {
  Root,
  SearchButtonWrapper,
  SearchInput,
  SearchLabel,
  SearchResultLabel,
  SearchView,
  SearchViewPlaceholder,
} from './contacts-search-form.styled';
import { Icon } from 'modules/core/components/icon';
import { Button } from 'modules/core/components';

// utils
import { useNavigator } from 'modules/core/hooks/use-navigator';

import { ContactsSearchFormProps } from './contacts-search-form.interface';

export const ContactsSearchForm = memo(
  ({ onSearch, isSearchResult }: ContactsSearchFormProps) => {
    const navigator = useNavigator();
    const theme = useTheme();

    const data = useMemo(
      () => ({
        name: '',
        brand: '',
        isSearchResult: true,
      }),
      []
    );

    const handleNavigate = useCallback(() => {
      navigator.push('ContactsSearch');
    }, [navigator]);

    const handleChangeText = useCallback(
      (key: 'name' | 'brand') => (value: string) => {
        if (key in data) {
          return (data[key] = value);
        }
      },
      [data]
    );

    return onSearch ? (
      <Root>
        <SearchLabel>{'Unternehmen / Wirkstoffname'}</SearchLabel>
        <SearchInput
          placeholder={'z.B. Stada, Daosin...'}
          placeholderTextColor={theme.colors.tabGrey}
          onChangeText={handleChangeText('brand')}
        />

        <SearchLabel>{'Ansprechpartner'}</SearchLabel>
        <SearchInput
          placeholder={'z.B. Max Mustermann'}
          placeholderTextColor={theme.colors.tabGrey}
          onChangeText={handleChangeText('name')}
        />

        <SearchButtonWrapper>
          <Button title={'Suchen'} onPress={() => onSearch(data)} />
        </SearchButtonWrapper>

        {isSearchResult && (
          <SearchResultLabel>{'Suchergebnis'}</SearchResultLabel>
        )}
      </Root>
    ) : (
      <SearchView onPress={handleNavigate}>
        <Icon name={'addprofile'} />

        <SearchViewPlaceholder>
          {'Neuen Kontakt hinzufügen'}
        </SearchViewPlaceholder>
      </SearchView>
    );
  }
);
