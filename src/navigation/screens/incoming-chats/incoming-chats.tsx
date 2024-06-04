import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

// components
import {
  Root,
  Separator,
  styles,
  EmptyResultMessage,
} from './incoming-chats.styled';
import { ChatListItem } from 'modules/chats/components/chat-list-item';
import { Disconnection } from 'modules/core/components';

// hooks
import { useGetChatsListQuery } from 'modules/chats/hooks/use-get-chats-list-query';
import { useGetContactsListQuery } from 'modules/contacts/hooks/use-get-contacts-list-query';
import { useGetSavedChatsListQuery } from 'modules/chats/hooks/use-get-saved-chats-list-query';

// redux
import { selectAuthValue } from 'modules/auth/redux/auth.selectors';

// utils
import { getErrorMessage } from 'modules/core/utils';

import { IChatGroupListItem } from 'modules/chats/components/chat-list-item/chat-list-item.interface';

export const IncomingChats = () => {
  const theme = useTheme();
  const user = useSelector(selectAuthValue);
  const getSavedChatsList = useGetSavedChatsListQuery(user?.id ?? '', {
    enabled: Boolean(user?.id),
  });
  const getChatsList = useGetChatsListQuery(getSavedChatsList.data || [], {
    enabled: Boolean(getSavedChatsList.data),
  });
  const getContactsList = useGetContactsListQuery();
  const errorMessage = getErrorMessage(getContactsList.error);

  const [chatGroups, setChatGroups] = useState<Array<IChatGroupListItem>>([]);

  useEffect(() => {
    const chatGroupSubscriber = getChatsList.data?.onSnapshot(
      (snapshot: FirebaseFirestoreTypes.DocumentData) => {
        const groups =
          Array.isArray(getContactsList.data) && !errorMessage
            ? snapshot._docs.map(
                (doc: { data: () => Array<IChatGroupListItem> }) => doc.data()
              )
            : undefined;

        setChatGroups(groups);
      }
    );

    return chatGroupSubscriber;
  }, [getChatsList.data, getContactsList.data, errorMessage]);

  const getContact = useCallback(
    (item) => {
      return (
        Array.isArray(getContactsList.data) &&
        getContactsList.data.find((contact) => item.createdTo === contact.id)
      );
    },
    [getContactsList]
  );

  const handleRefetch = useCallback(() => {
    getChatsList.refetch();
    getSavedChatsList.refetch();
    getContactsList.refetch();
  }, [getSavedChatsList, getContactsList, getChatsList]);

  const renderItem: ListRenderItem<IChatGroupListItem> = useCallback(
    ({ item }) => {
      return (
        <ChatListItem item={{ ...item, ...{ contact: getContact(item) } }} />
      );
    },
    [getContact]
  );

  return (
    <Root>
      <FlatList<IChatGroupListItem>
        data={chatGroups}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          getChatsList.isLoading ||
          getSavedChatsList.isLoading ||
          getContactsList.isLoading ? (
            <ActivityIndicator color={theme.colors.orange} size={'large'} />
          ) : errorMessage === 'Network Error' ? (
            <Disconnection onPress={handleRefetch} isFullScreen={false} />
          ) : (
            <EmptyResultMessage>
              {'Zur Zeit ist noch kein Chat gestartet.'}
            </EmptyResultMessage>
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={
              getChatsList.isRefetching ||
              getSavedChatsList.isRefetching ||
              getContactsList.isRefetching
            }
            onRefresh={handleRefetch}
          />
        }
        contentContainerStyle={!chatGroups?.length && styles.emptyList}
        style={styles.list}
      />
    </Root>
  );
};
