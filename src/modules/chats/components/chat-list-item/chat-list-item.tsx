import React, { memo, useCallback } from 'react';
import { useTheme } from 'styled-components';

// components
import {
  ChatContactBrand,
  ChatButton,
  ChatContactInfoWrapper,
  ChatContactName,
  ChatLastMessage,
  ChatContactPhoto,
  ChatIconWrapper,
} from './chat-list-item.styled';
import { Icon } from 'modules/core/components/icon';

// utils
import { getStrapiUrlImage } from 'modules/core/utils';
import { useNavigator } from 'modules/core/hooks/use-navigator';

// styles
import { hPx } from 'styles/pixel-ratio';

import { ChatListItemProps } from './chat-list-item.interface';

export const ChatListItem = memo<ChatListItemProps>(({ item }) => {
  const navigator = useNavigator();
  const theme = useTheme();

  const handleChatPress = useCallback(() => {
    item.contact &&
      navigator.push('IncomingChat', {
        chatId: item.id,
        contact: item.contact,
      });
  }, [item, navigator]);

  return (
    <ChatButton onPress={handleChatPress}>
      <ChatContactPhoto
        source={
          item.contact?.image
            ? { uri: getStrapiUrlImage(item.contact.image.url) }
            : require('assets/images/nurse.png')
        }
      />
      <ChatContactInfoWrapper>
        <ChatContactBrand>{item.contact?.brand?.companyName}</ChatContactBrand>
        <ChatContactName>
          {item.contact?.prename} {item.contact?.name}
        </ChatContactName>
        <ChatLastMessage>
          {item.recentMessage?.messageText || '...'}
        </ChatLastMessage>
      </ChatContactInfoWrapper>
      <ChatIconWrapper>
        <Icon
          name={'forward'}
          color={theme.colors.black}
          height={hPx(14)}
          width={hPx(14)}
        />
      </ChatIconWrapper>
    </ChatButton>
  );
});
