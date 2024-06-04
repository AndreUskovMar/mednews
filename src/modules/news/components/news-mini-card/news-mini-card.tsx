import React, { memo, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Config from 'react-native-config';
import { format } from 'date-fns';
import { useTheme } from 'styled-components/native';

// components
import {
  Image,
  Text,
  Title,
  VerticalWrapper,
  HorizontalWrapper,
} from './news-mini-card.styled';
import { Icon } from 'modules/core/components/icon';

// utils
import { useNavigator } from 'modules/core/hooks/use-navigator';

// styles
import { hPx } from 'styles/pixel-ratio';

import { NewsItemProps } from './news-mini-card.interface';
import { renderSubtitle } from '../news-card/news-card';

export const NewsMiniCard = memo<NewsItemProps>(({ item }) => {
  const navigator = useNavigator();
  const theme = useTheme();

  const handleNewsPress = useCallback(() => {
    navigator.push('NewsDetail', { postId: item.id });
  }, [item, navigator]);

  return (
    <TouchableOpacity
      key={item.id}
      activeOpacity={theme.touchable.activeOpacity}
      onPress={handleNewsPress}
    >
      <HorizontalWrapper>
        <Image
          source={{
            uri: `${Config.STRAPI_URL}${item.attributes.teaserImage.data.attributes.url}`,
          }}
        />
        <View>
          <HorizontalWrapper>
            {item.attributes.brand.data && <Text>{renderSubtitle(item)}</Text>}
            <Text>
              {format(new Date(item.attributes.createdAt), 'dd.MM.yyyy')}
            </Text>
          </HorizontalWrapper>
          <HorizontalWrapper>
            <Title>{item.attributes.title}</Title>
          </HorizontalWrapper>
        </View>
        <VerticalWrapper>
          <Icon
            name={'forward'}
            color={theme.colors.black}
            height={hPx(18)}
            width={hPx(18)}
          />
        </VerticalWrapper>
      </HorizontalWrapper>
    </TouchableOpacity>
  );
});
