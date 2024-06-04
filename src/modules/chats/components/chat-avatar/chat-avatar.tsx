import React, { memo } from 'react';

// components
import { ChatContactPhoto } from './chat-avatar.styled';

// utils
import { getStrapiUrlImage } from 'modules/core/utils';

export const ChatAvatar = memo(({ photo }: { photo?: string | undefined }) => {
  return (
    <ChatContactPhoto
      source={
        photo
          ? { uri: getStrapiUrlImage(photo) }
          : require('assets/images/nurse.png')
      }
    />
  );
});
