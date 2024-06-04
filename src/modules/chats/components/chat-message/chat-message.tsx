import React, { memo } from 'react';
import { formatDistance } from 'date-fns';
import { de } from 'date-fns/locale';

// components
import {
  ChatMessageContainer,
  ChatMessageWrapper,
  ChatUserInfoWrapper,
  ChatUserNameWrapper,
} from './chat-message.styled';
import { ChatAvatar } from '../chat-avatar';
import { Typography } from 'modules/core/components/typography';

import { ChatMessageItemProps } from './chat-message-item.interface';

export const ChatMessage = memo(
  ({
    currentMessage,
  }: {
    currentMessage: ChatMessageItemProps | undefined;
  }) => {
    if (!currentMessage) {
      return null;
    }

    return (
      <ChatMessageContainer>
        <ChatUserInfoWrapper>
          <ChatAvatar photo={currentMessage.user.avatar} />
          <ChatUserNameWrapper>
            <Typography variant={'h4'}>
              {currentMessage.user.name?.trim() || 'Kein Name'}
            </Typography>
            <Typography variant={'small'}>
              {formatDistance(new Date(currentMessage.updatedAt), new Date(), {
                locale: de,
                addSuffix: true,
              })}
            </Typography>
          </ChatUserNameWrapper>
        </ChatUserInfoWrapper>
        <ChatMessageWrapper>
          <Typography variant={'body'}>{currentMessage.text}</Typography>
        </ChatMessageWrapper>
      </ChatMessageContainer>
    );
  }
);
