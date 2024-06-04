import React, { memo, useCallback, useEffect } from 'react';
import { format } from 'date-fns';
import { useTheme } from 'styled-components/native';

// components
import {
  PublishDate,
  Image,
  NewsButton,
  Subtitle,
  TextWrapper,
} from './news-card.styled';
import { Typography } from 'modules/core/components';

// hooks
// import { usePiwikSdk } from 'modules/core/hooks/use-piwik-sdk';
import { useNavigator } from 'modules/core/hooks/use-navigator';

// utils
import { getStrapiUrlImage } from 'modules/core/utils';

import { NewsItemProps } from './news-card.interface';

export const renderSubtitle = (item: any) => {
  // if company is Orange Salamander
  if (
    item.attributes.brand.data.attributes.companyName === 'Orange Salamander'
  ) {
    return item.attributes.brand.data.attributes.companyName;
  }

  // if brand name exists, only return brand name
  if (item.attributes.brand.data.attributes.name.trim()) {
    return item.attributes.brand.data.attributes.name;
  }

  return [
    item.attributes.brand.data.attributes.companyName,
    item.attributes.brand.data.attributes.activeIngedrient,
  ]
    .filter((attribute: string | undefined) => attribute)
    .join(', ');
};

export const NewsCard = memo<NewsItemProps>(({ item }) => {
  // const { trackEvent } = usePiwikSdk(item.id);
  const navigator = useNavigator();
  const theme = useTheme();

  // useEffect(() => {
  //   (async () => {
  //     await trackEvent('previewArticle');
  //   })();
  // }, [item, trackEvent]);

  const handleNewsPress = useCallback(async () => {
    // await trackEvent('clickArticle');
    navigator.push('NewsDetail', { postId: item.id });
  }, [item, navigator]);

  return (
    <NewsButton
      activeOpacity={theme.touchable.activeOpacity}
      onPress={handleNewsPress}
    >
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
        {item.attributes.brand.data && (
          <Subtitle>{renderSubtitle(item)}</Subtitle>
        )}
        <Typography variant={'h3'}>{item.attributes.title}</Typography>
        <PublishDate>
          {format(new Date(item.attributes.publishedAt), 'dd.MM.yyyy')}
        </PublishDate>
      </TextWrapper>
    </NewsButton>
  );
});
