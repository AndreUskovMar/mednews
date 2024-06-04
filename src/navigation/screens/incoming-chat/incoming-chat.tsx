import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Platform, Keyboard, Alert, ActivityIndicator } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { useNetInfo } from '@react-native-community/netinfo';

// components
import { Disconnection, Header } from 'modules/core/components';
import { ChatToolbarAction } from 'modules/chats/components/chat-toolbar-action';
import { ChatMessage } from 'modules/chats/components/chat-message';
import {
  Root,
  styles,
  ChatFooter,
  SendContainer,
  SendButtonTitle,
  LoadingContainer,
} from './incoming-chat.styled';

// redux
import { selectAuthValue } from 'modules/auth/redux/auth.selectors';

// hooks
import { useSetChatMessageInMutation } from 'modules/chats/hooks/use-set-chat-message-in-mutation';
import { useSetChatGroupInMutation } from 'modules/chats/hooks/use-set-chat-group-in-mutation';
import { useGetMessagesByChatQuery } from 'modules/chats/hooks/use-get-messages-by-chat-query';
import { useNavigator } from 'modules/core/hooks/use-navigator';

// utils
import { getErrorMessage } from 'modules/core/utils';

import { ParamList } from 'navigation/stacks/contact.stack';

import { ChatMessageItemProps } from 'modules/chats/components/chat-message/chat-message-item.interface';

export const IncomingChat = () => {
  const theme = useTheme();
  const route = useRoute<RouteProp<ParamList, 'IncomingChat'>>();
  const insets = useSafeAreaInsets();
  const netInfo = useNetInfo();
  const navigator = useNavigator();
  const user = useSelector(selectAuthValue);
  const setChatMessage = useSetChatMessageInMutation();
  const setChatGroup = useSetChatGroupInMutation();
  const getMessagesByChat = useGetMessagesByChatQuery(route.params.chatId, {
    enabled: netInfo.type !== 'unknown',
  });
  const errorMessage = getErrorMessage(getMessagesByChat.error);

  const [messages, setMessages] = useState<ChatMessageItemProps[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isInverted, setIsInverted] = useState(false);
  const [lastDocument, setLastDocument] =
    useState<FirebaseFirestoreTypes.DocumentData>();

  const giftedChatRef = useRef<any>(null);

  const bottomOffset = useMemo(
    () => (Platform.OS === 'ios' ? -insets.bottom : undefined),
    [insets]
  );

  const chatUser = useMemo(
    () => ({
      _id: user?.id || '',
      name: user?.name || '',
      avatar: user?.photo || '',
    }),
    [user]
  );

  const chatPharmacist = useMemo(
    () => ({
      _id: route.params.contact.id,
      name: `${route.params.contact.prename} ${route.params.contact.name}`,
      avatar: route.params.contact.image.url,
    }),
    [route.params.contact]
  );

  const getNextMessagesList = useCallback(
    (snapshot: FirebaseFirestoreTypes.DocumentData) => {
      setLastDocument(snapshot._docs[snapshot._docs.length - 1]);
      return snapshot._docs.map(
        (doc: { data: () => Array<ChatMessageItemProps> }) => doc.data()
      );
    },
    []
  );

  useEffect(() => {
    // giftedChatRef.current._messageContainerRef = null;
    const chatSubscriber = getMessagesByChat.data
      ?.limit(7)
      ?.onSnapshot((documentSnapshot: FirebaseFirestoreTypes.DocumentData) => {
        const msgs = getNextMessagesList(documentSnapshot);
        if (!isMounted) {
          setIsInverted(msgs.length > 5);
          setIsMounted(getMessagesByChat.isSuccess);
        } else {
          setMessages(isInverted ? msgs : msgs.reverse());
        }
      });

    return chatSubscriber;
  }, [
    getMessagesByChat.data,
    getMessagesByChat.isSuccess,
    getNextMessagesList,
    isInverted,
    isMounted,
  ]);

  const handleSend = useCallback(
    (mgs) => {
      Keyboard.dismiss();

      if (!netInfo.isConnected) {
        navigator.reset('Kontakt');
        return;
      }

      const newMessage = {
        ...mgs[0],
        chatId: route.params.chatId,
        type: 'text',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        wasRead: false,
        wasDeleted: false,
        user: {
          _id: user?.id || '',
        },
      };

      const chatGroup = {
        id: route.params.chatId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: user?.id,
        recentMessage: {
          messageText: mgs[0].text,
          wasRead: false,
          sentBy: user?.id || '',
        },
      };

      setChatMessage.mutate(newMessage, {
        onSuccess: () => {
          giftedChatRef.current.scrollToBottom(true);
          setChatGroup.mutate(chatGroup, {
            onError: (error) => {
              Alert.alert('Error =>', JSON.stringify(error));
            },
          });
        },
        onError: (error) => {
          Alert.alert('Error =>', JSON.stringify(error));
        },
      });
    },
    [setChatGroup, setChatMessage, route, user, netInfo, navigator]
  );

  if (errorMessage === 'Network Error') {
    return <Disconnection onPress={getMessagesByChat.refetch} isFullScreen />;
  }

  return (
    <Root>
      <Header displayBackButton />

      {!isMounted ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.orange} size={'large'} />
        </LoadingContainer>
      ) : (
        <GiftedChat
          ref={giftedChatRef}
          placeholder={'Schreiben Sie etwas...'}
          messages={messages}
          onSend={handleSend}
          loadEarlier={getMessagesByChat.isLoading}
          renderActions={() => <ChatToolbarAction />}
          renderChatFooter={() => (
            <ChatFooter
              height={
                giftedChatRef.current?.textInput?.isFocused() &&
                Platform.OS === 'ios'
                  ? 0
                  : 40
              }
            />
          )}
          renderMessage={(props) => {
            const currentMessage = {
              ...props.currentMessage,
              user:
                props.currentMessage?.user._id === chatUser._id
                  ? chatUser
                  : chatPharmacist,
            };

            return (
              <ChatMessage
                currentMessage={currentMessage as ChatMessageItemProps}
              />
            );
          }}
          renderSend={(props) => (
            <Send {...props}>
              <SendContainer>
                <SendButtonTitle>{'Senden'}</SendButtonTitle>
              </SendContainer>
            </Send>
          )}
          listViewProps={{
            scrollEventThrottle: 400,
            onScroll: ({ nativeEvent }: any) => {
              const paddingToTop = 80;
              const isCloseToTop =
                nativeEvent.contentSize.height -
                  nativeEvent.layoutMeasurement.height -
                  paddingToTop <=
                nativeEvent.contentOffset.y;

              if (!(messages.length % 7) && isCloseToTop) {
                getMessagesByChat.data
                  ?.startAfter(lastDocument)
                  .limit(7)
                  .onSnapshot(
                    (documentSnapshot: FirebaseFirestoreTypes.DocumentData) => {
                      if (!documentSnapshot._docs.length) {
                        return;
                      }

                      setMessages([
                        ...messages,
                        ...getNextMessagesList(documentSnapshot),
                      ]);
                    }
                  );
              }
            },
          }}
          bottomOffset={bottomOffset}
          textInputProps={{ style: styles.input }}
          // @ts-ignore
          containerStyle={styles.container}
          wrapInSafeArea={false}
          inverted={isInverted}
          isLoadingEarlier
          alwaysShowSend
          infiniteScroll
        />
      )}

      <ChatFooter height={30} />
    </Root>
  );
};
