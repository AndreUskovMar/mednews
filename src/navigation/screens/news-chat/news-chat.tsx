import React from 'react';

// components
import { Header, SafeArea, Typography } from 'modules/core/components';
import { Root } from './news-chat.styled';

export const NewsChat = () => {
  return (
    <SafeArea>
      <Header displayBackButton />

      <Root>
        <Typography variant={'h1'}>NewsChat</Typography>
      </Root>
    </SafeArea>
  );
};
