import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Linking } from 'react-native';
// @ts-ignore
import Markdown from 'react-native-markdown-package';
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { format } from 'date-fns';

// components
import {
  Header,
  ShareBottomSheet,
  Disconnection,
} from 'modules/core/components';
import { TextWrapper } from 'modules/news/components/news-card/news-card.styled';
import {
  Root,
  CreationDate,
  Subtitle,
  Title,
  Image,
  ImageWrapper,
  Separator,
  EmptyResultMessage,
} from './news-detail.styled';
import { NewsActionButton, NewsImageGallery } from 'modules/news/components';

// hooks
import { useGetNewsByIdQuery } from 'modules/news/hooks/use-get-news-by-id-query';
// import { usePiwikSdk } from 'modules/core/hooks/use-piwik-sdk';

// utils
import { getErrorMessage, getStrapiUrlImage } from 'modules/core/utils';

// styles
import { styles } from './news-detail.styled';

import { ParamList } from 'navigation/stacks/feed.stack';
import { renderSubtitle } from 'modules/news/components/news-card/news-card';

export const NewsDetail = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute<RouteProp<ParamList, 'NewsDetail'>>();
  const { postId } = route.params;
  // const { trackEvent } = usePiwikSdk(postId);
  const getNewsById = useGetNewsByIdQuery(postId);
  const errorMessage = getErrorMessage(getNewsById.error);
  const item = getNewsById.data?.data[0];

  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     if (getNewsById.isSuccess) {
  //       await trackEvent('viewArticle');
  //     }
  //   })();
  // }, [getNewsById.isSuccess]);

  const gallery = useMemo(() => {
    if (item) {
      return [
        ...(item.attributes.images.data || []),
        ...(item.attributes.videos.data || []),
      ].sort((a, b) =>
        a.attributes.createdAt >= b.attributes.createdAt ? 1 : -1
      );
    }
  }, [item]);

  const handleNewsPress = useCallback(
    (screen: string, data: object) => () => {
      navigation.dispatch(StackActions.push(screen, data));
    },
    [navigation]
  );

  const toggleBottomActionBar = useCallback(
    () => setModalVisible((prevState) => !prevState),
    []
  );

  if (errorMessage === 'Network Error') {
    return <Disconnection onPress={getNewsById.refetch} isFullScreen />;
  }

  return (
    <>
      <Header displayBackButton />
      <Root bounces={false} contentContainerStyle={!item && styles.emptyList}>
        {getNewsById.isLoading && (
          <ActivityIndicator color={theme.colors.orange} size={'large'} />
        )}

        {item && (
          <React.Fragment>
            <TextWrapper>
              {item.attributes.brand.data && (
                <Subtitle>{renderSubtitle(item)}</Subtitle>
              )}
              <Title>{item.attributes.title}</Title>
              <CreationDate>
                {format(new Date(item.attributes.createdAt), 'dd.MM.yyyy')}
              </CreationDate>
            </TextWrapper>

            <Image
              source={{
                uri: getStrapiUrlImage(
                  item.attributes.teaserImage.data.attributes.url
                ),
              }}
              aspectRatio={
                item.attributes.teaserImage.data.attributes.height /
                item.attributes.teaserImage.data.attributes.width
              }
            />

            <TextWrapper>
              <Markdown
                styles={{
                  text: { fontFamily: 'Mulish-Regular', fontSize: 18 },
                  strong: {
                    fontFamily: 'Mulish-Bold',
                    textAlign: 'left',
                  },
                  heading: {
                    fontFamily: 'Mulish-SemiBold',
                  },
                }}
                onLink={(url: string) => Linking.openURL(url)}
              >
                {item.attributes.content}
              </Markdown>
            </TextWrapper>

            <ImageWrapper>
              {gallery && <NewsImageGallery gallery={gallery} />}
            </ImageWrapper>

            {item.attributes.brand.data && (
              <NewsActionButton
                title={'Kontakt aufnehmen'}
                iconName={'forward'}
                onPress={handleNewsPress('NewsContactInfo', {
                  ...item.attributes.brand,
                  postId,
                })}
              />
            )}

            <NewsActionButton
              title={'Teilen'}
              iconName={'sharearrow'}
              onPress={toggleBottomActionBar}
            />

            {item.attributes.brand.data?.attributes.companyName !==
              'Orange Salamander' && (
              <NewsActionButton
                title={'Fachinfo'}
                iconName={'chain'}
                onPress={() => null}
              />
            )}

            <NewsActionButton
              title={'Quellen und Rechtstexte'}
              iconName={'balance'}
              onPress={handleNewsPress('NewsLegalInfo', {
                legalContent: item.attributes.legalContent,
              })}
            />

            <Separator />
          </React.Fragment>
        )}

        {!getNewsById.isLoading && !item && (
          <EmptyResultMessage>{'Post was not found'}</EmptyResultMessage>
        )}

        {modalVisible && item && (
          <ShareBottomSheet
            type={'news'}
            subject={item.attributes.title}
            body={`osala://news/${item.id}`}
            modalVisible={modalVisible}
            onPress={toggleBottomActionBar}
          />
        )}
      </Root>
    </>
  );
};
