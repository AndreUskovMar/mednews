import React, { memo } from 'react';

// components
import {
  ChatIconWrapper,
  ChatToolbarActionWrapper,
} from './chat-toolbar-action.styled';
import { Icon } from 'modules/core/components/icon';
import { ChatAvatar } from 'modules/chats/components/chat-avatar';

// styles
import { wPx } from 'styles/pixel-ratio';

export const ChatToolbarAction = memo(
  ({ photo }: { photo?: string | undefined }) => {
    return (
      <ChatToolbarActionWrapper>
        <ChatAvatar photo={photo} />
        <ChatIconWrapper>
          <Icon name={'bubble'} width={wPx(18)} height={wPx(18)} />
        </ChatIconWrapper>
      </ChatToolbarActionWrapper>
    );
  }
);
