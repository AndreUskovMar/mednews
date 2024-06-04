import React, { useCallback, useMemo } from 'react';
import { View, Linking, Platform, Alert, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from 'styled-components/native';

// components
import { Typography, Header } from 'modules/core/components';
import {
  Root,
  Wrapper,
  Separator,
  SubtitleWithMargin,
  Subtitle,
  Title,
  LittleSubtitle,
  HorizontalWrapper,
  TextValue,
  Website,
} from './news-brand-info.styled';
import { NewsMiniCard } from 'modules/news/components/news-mini-card';
import { IconButton } from 'modules/core/components/icon-button';

// hooks
import { useGetNewsListByBrandQuery } from 'modules/news/hooks/use-get-news-list-by-brand-query';
import { useNavigator } from 'modules/core/hooks/use-navigator';

import { ParamList } from 'navigation/stacks/feed.stack';

export const renderTitle = (attributes: any) => {
  // if company is Orange Salamander
  if (attributes.companyName === 'Orange Salamander') {
    return attributes.companyName;
  }

  // if brand name exists, only return brand name
  if (attributes.name.trim()) {
    return attributes.name;
  }

  return [attributes.companyName, attributes.activeIngedrient]
    .filter((attribute: string | undefined) => attribute)
    .join(', ');
};

export const NewsBrandInfo = () => {
  const route = useRoute<RouteProp<ParamList, 'NewsContactInfo'>>();
  const theme = useTheme();
  const netInfo = useNetInfo();
  const navigator = useNavigator();
  const attributes = route.params.data?.attributes;
  const getNewsByBrand = useGetNewsListByBrandQuery(
    route.params.data?.id ?? 0,
    {
      enabled: !!route.params.data?.id,
    }
  );

  const recommendedNews = useMemo(
    () =>
      getNewsByBrand.data?.data.filter(
        (item) => item.id !== route.params.postId
      ),
    [getNewsByBrand, route]
  );

  const handleWebsite = useCallback(async () => {
    if (!netInfo.isConnected) {
      navigator.reset('News');
      return;
    }

    try {
      if (attributes) {
        await Linking.openURL(attributes.website);
      }
    } catch (error) {
      Alert.alert('Error =>', JSON.stringify(error));
    }
  }, [attributes, netInfo, navigator]);

  const handleCall = useCallback(async () => {
    try {
      if (attributes) {
        const phoneNumber = Platform.select({
          android: `tel:${attributes.hotline}`,
          ios: `telprompt:${attributes.hotline}`,
        });
        if (phoneNumber) {
          await Linking.openURL(phoneNumber);
        }
      }
    } catch (e) {
      Alert.alert('Error =>', JSON.stringify('You cannot call via simulator '));
    }
  }, [attributes]);

  if (!attributes) {
    return null;
  }

  return (
    <>
      <Header displayBackButton />

      <Root>
        <Wrapper>
          <Title>{renderTitle(attributes)}</Title>
          <SubtitleWithMargin>{'Beschreibung'}</SubtitleWithMargin>
          <TextValue variant={'body'}>{attributes.about}</TextValue>
          <Subtitle>{'Adresse'}</Subtitle>
          <TextValue>
            {attributes.companyName}, {attributes.street}, {attributes.zipcode},{' '}
            {attributes.city}, {attributes.country}
          </TextValue>
          <Subtitle>{'Webseite'}</Subtitle>
          <TouchableOpacity onPress={handleWebsite}>
            <Website>Zur Webseite des Anbieters</Website>
          </TouchableOpacity>
        </Wrapper>
        <Separator />

        {attributes.companyName !== 'Orange Salamander' && (
          <>
            <Wrapper>
              <Subtitle>{'Medizinischer InfoService'}</Subtitle>
              <LittleSubtitle>{'Kontakt'}</LittleSubtitle>
              <HorizontalWrapper>
                <View>
                  <Typography variant={'body'}>{'Service Hotline'}</Typography>
                  <TextValue>{attributes.hotline}</TextValue>
                </View>
                <IconButton
                  iconName={'phone'}
                  onPress={handleCall}
                  color={theme.colors.orange}
                  size={'medium'}
                />
              </HorizontalWrapper>
            </Wrapper>
            <Separator />
          </>
        )}

        {!!recommendedNews?.length && (
          <React.Fragment>
            <Wrapper>
              <SubtitleWithMargin>{'Weitere Beiträge'}</SubtitleWithMargin>
              {recommendedNews.map((item) => (
                <NewsMiniCard key={item.id} item={item} />
              ))}
            </Wrapper>
            <Separator />
          </React.Fragment>
        )}
      </Root>
    </>
  );
};
