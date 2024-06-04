import React, { memo } from 'react';

// components
import {
  Root,
  IconWrapper,
  MessageWrapper,
  Title,
  Message,
} from './toast-notification.styled';
import { Icon } from 'modules/core/components/icon';

// styles
import { wPx } from 'styles/pixel-ratio';

import { ToastNotificationProps } from './toast-notification.interface';

export const ToastNotification = memo<ToastNotificationProps>(({ toast }) => {
  return (
    <Root>
      <IconWrapper>
        <Icon name={'info'} width={wPx(45)} />
      </IconWrapper>
      <MessageWrapper>
        <Title>{'Hinweis'}</Title>
        <Message>{toast.message}</Message>
      </MessageWrapper>
    </Root>
  );
});
