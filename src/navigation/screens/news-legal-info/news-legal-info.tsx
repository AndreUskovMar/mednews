import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

// components
import { Header } from 'modules/core/components';
import { Root, Title, Content } from './news-legal-info.styled';

import { ParamList } from 'navigation/stacks/feed.stack';

export const NewsLegalInfo = () => {
  const route = useRoute<RouteProp<ParamList, 'NewsLegalInfo'>>();
  return (
    <>
      <Header displayBackButton />

      <Root>
        <Title>{'Quellen & Rechtstexte'}</Title>
        <Content>{route.params.legalContent}</Content>
      </Root>
    </>
  );
};
