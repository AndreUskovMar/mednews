import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { JSHash, CONSTANTS } from 'react-native-hash';
import { useSelector } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

// components
import { Root, Separator, EmptyResultMessage } from './contacts.styled';
import {
  ContactItem,
  ContactBottomSheet,
  ContactsSearchForm,
} from 'modules/contacts/components';
import { Disconnection, Header } from 'modules/core/components';

// hooks
import { useGetContactsListQuery } from 'modules/contacts/hooks/use-get-contacts-list-query';
import { useGetSavedContactsListQuery } from 'modules/contacts/hooks/use-get-saved-contacts-list-query';
import { useGetSavedChatsListQuery } from 'modules/chats/hooks/use-get-saved-chats-list-query';
import { useSetSavedContactsInMutation } from 'modules/contacts/hooks/use-set-saved-contacts-in-mutation';
import { useCreateChatGroupInMutation } from 'modules/chats/hooks/use-create-chat-group-in-mutation';
import { useSetSavedChatsInMutation } from 'modules/chats/hooks/use-set-saved-chats-in-mutation';

// redux
import { selectAuthValue } from 'modules/auth/redux/auth.selectors';

// utils
import { useNavigator } from 'modules/core/hooks/use-navigator';
import { getErrorMessage } from 'modules/core/utils';

// styles
import { styles } from './contacts.styled';

import { IContactItem } from 'modules/contacts/types/contacts-api.types';

export const Contacts = () => {
  const navigator = useNavigator();
  const route = useRoute();
  const theme = useTheme();
  const netInfo = useNetInfo();
  const user = useSelector(selectAuthValue);
  const getContactsList = useGetContactsListQuery();
  const setSavedContacts = useSetSavedContactsInMutation();
  const setSavedChats = useSetSavedChatsInMutation();
  const createChatGroup = useCreateChatGroupInMutation();
  const getSavedContactsList = useGetSavedContactsListQuery(user?.id ?? '', {
    enabled: Boolean(user?.id),
  });
  const getSavedChatsList = useGetSavedChatsListQuery(user?.id ?? '', {
    enabled: Boolean(user?.id),
  });

  const errorMessage = getErrorMessage(
    getContactsList.error || setSavedContacts.error || setSavedChats.error
  );

  const [search, setSearch] = useState({
    name: '',
    brand: '',
    isSearchResult: false,
  });
  const [modal, setModal] = useState({
    modalVisible: false,
    isMessage: false,
    item: Array.isArray(getContactsList.data) && getContactsList.data[0],
  });

  const isSearchScreen = useMemo(
    () => route.name === 'ContactsSearch',
    [route]
  );

  const isSaved = useMemo(() => {
    return !!getSavedContactsList.data?.find((id) => id === modal.item.id);
  }, [getSavedContactsList, modal]);

  const showBottomActionBar = useCallback(
    (item: IContactItem) =>
      setModal({ modalVisible: true, isMessage: false, item }),
    []
  );

  const hideBottomActionBar = useCallback(
    () => setModal({ ...modal, modalVisible: false }),
    [modal]
  );

  const handleRefetch = useCallback(() => {
    getContactsList.refetch();
    getSavedContactsList.refetch();
    getSavedChatsList.refetch();
  }, [getSavedChatsList, getContactsList, getSavedContactsList]);

  const checkInternetConnection = useCallback(() => {
    if (isSearchScreen) {
      navigator.back();
    }
    handleRefetch();
    hideBottomActionBar();
  }, [handleRefetch, isSearchScreen, navigator, hideBottomActionBar]);

  const handleSetSavedContacts = useCallback(
    (contact: number) => () => {
      if (!netInfo.isConnected) {
        checkInternetConnection();
        return;
      }

      const savedContactsList = getSavedContactsList.data || [];
      const data = {
        contacts: isSaved
          ? savedContactsList.filter((item) => item !== contact)
          : [...savedContactsList, contact],
        userId: user?.id ?? '',
      };
      setSavedContacts.mutate(data, {
        onSuccess: () => {
          setModal({ ...modal, isMessage: true });
        },
      });
    },
    [
      getSavedContactsList,
      isSaved,
      user,
      setSavedContacts,
      modal,
      checkInternetConnection,
      netInfo,
    ]
  );

  const handleNavigateInChat = useCallback(
    (contact: IContactItem) => async () => {
      if (!user) {
        return;
      }

      if (!netInfo.isConnected) {
        checkInternetConnection();
        return;
      }

      const members = [user.id, contact.id];
      const id = members.sort().join('&');
      const groupReference = await JSHash(id, CONSTANTS.HashAlgorithms.md5);

      const existingGroup = getSavedChatsList.data?.find(
        (chat) => chat === groupReference
      );

      const params = {
        chatId: groupReference,
        contact,
      };

      if (existingGroup) {
        hideBottomActionBar();
        navigator.push('IncomingChat', params);
      } else {
        const chatGroup = {
          id: groupReference,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          createdBy: user?.id,
          createdTo: contact.id,
        };

        createChatGroup.mutate(chatGroup, {
          onSuccess: () => {
            const savedChatsList = getSavedChatsList.data || [];
            const data = {
              chats: [...savedChatsList, groupReference],
              userId: user?.id ?? '',
            };
            setSavedChats.mutate(data, {
              onSuccess: () => {
                hideBottomActionBar();
                navigator.push('IncomingChat', params);
              },
              onError: (error) => {
                Alert.alert('Error =>', JSON.stringify(error));
              },
            });
          },
          onError: (error) => {
            Alert.alert('Error =>', JSON.stringify(error));
          },
        });
      }
    },
    [
      user,
      checkInternetConnection,
      getSavedChatsList,
      hideBottomActionBar,
      navigator,
      createChatGroup,
      setSavedChats,
      netInfo,
    ]
  );

  const handleFilterBySearchValue = useCallback(
    (contact) =>
      (`${contact.name} ${contact.prename}`.toLowerCase() ===
        search.name.toLowerCase() ||
        `${contact.prename} ${contact.name}`.toLowerCase() ===
          search.name.toLowerCase()) &&
      (contact.brand.name.toLowerCase().includes(search.brand.toLowerCase()) ||
        contact.brand.companyName
          .toLowerCase()
          .includes(search.brand.toLowerCase()) ||
        contact.brand.activeIngedrient
          .toLowerCase()
          .includes(search.brand.toLowerCase())),
    [search]
  );

  const renderItem: ListRenderItem<IContactItem> = useCallback(
    ({ item }) => {
      return (
        <ContactItem item={item} onPress={() => showBottomActionBar(item)} />
      );
    },
    [showBottomActionBar]
  );

  if (isSearchScreen && errorMessage === 'Network Error') {
    return <Disconnection onPress={getContactsList.refetch} isFullScreen />;
  }

  const contacts =
    (Array.isArray(getContactsList.data) &&
      !errorMessage &&
      getContactsList.data.filter((contact) =>
        isSearchScreen
          ? !Object.values(search).includes('') &&
            handleFilterBySearchValue(contact)
          : !!getSavedContactsList.data?.find((id) => id === contact.id)
      )) ||
    [];

  return (
    <Root>
      {isSearchScreen && (
        <Header
          name={'Kontakt hinzufügen'}
          color={theme.colors.orange}
          displayBackButton
        />
      )}

      <FlatList<IContactItem>
        data={contacts}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          getContactsList.isLoading ||
          getSavedContactsList.isLoading ||
          getSavedChatsList.isLoading ? (
            <ActivityIndicator
              color={theme.colors.orange}
              size={'large'}
              style={styles.indicator}
            />
          ) : errorMessage === 'Network Error' ? (
            <Disconnection onPress={handleRefetch} isFullScreen={false} />
          ) : (
            <EmptyResultMessage>
              {search.isSearchResult &&
                !contacts.length &&
                'Es wurde kein Ansprechpartner gefunden.'}
            </EmptyResultMessage>
          )
        }
        ListHeaderComponent={
          isSearchScreen ? (
            <ContactsSearchForm
              isSearchResult={search.isSearchResult}
              onSearch={(data) => setSearch({ ...data })}
            />
          ) : !errorMessage ? (
            ContactsSearchForm
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={
              getContactsList.isRefetching ||
              getSavedContactsList.isRefetching ||
              getSavedChatsList.isRefetching
            }
            onRefresh={handleRefetch}
          />
        }
        contentContainerStyle={
          !!errorMessage && !isSearchScreen && styles.emptyList
        }
        style={[styles.list, isSearchScreen && styles.listPadding]}
      />

      {modal.modalVisible && (
        <ContactBottomSheet
          modal={modal}
          isSaved={isSaved}
          disabled={
            setSavedContacts.isLoading ||
            setSavedChats.isLoading ||
            createChatGroup.isLoading
          }
          onPress={hideBottomActionBar}
          onToggleContact={handleSetSavedContacts(modal.item.id)}
          onNavigateInChat={handleNavigateInChat(modal.item)}
        />
      )}
    </Root>
  );
};
