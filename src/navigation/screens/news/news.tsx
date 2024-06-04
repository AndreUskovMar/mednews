import React, { useMemo, useCallback, useEffect } from 'react';
import {
  ListRenderItem,
  RefreshControl,
  FlatList,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from 'styled-components/native';

// components
import { Root, Separator, styles } from './news.styled';
import { Disconnection, HeaderSalamander } from 'modules/core/components';
import { NewsCard } from 'modules/news/components';

// utils
import { useNavigator } from 'modules/core/hooks/use-navigator';
import { getErrorMessage } from 'modules/core/utils';

// hooks
import { useGetNewsListQuery } from 'modules/news/hooks/use-get-news-list-query';

import { INewsItem } from 'modules/news/types/news-api.types';
import { useSelector } from 'react-redux';
import { selectAuthValue } from 'modules/auth/redux/auth.selectors';

export const News = () => {
  const navigator = useNavigator();
  const theme = useTheme();
  const getNewsList = useGetNewsListQuery();
  const errorMessage = getErrorMessage(getNewsList.error);
  const user = useSelector(selectAuthValue);

  const userSpecialties = useMemo(() => {
    if (user?.specialties) {
      return Object.values(user?.specialties);
    }
  }, [user?.specialties]);

  const getPostId = useCallback(
    (url: string) => {
      const splitUrl = url.split('/');
      const id = splitUrl[splitUrl.length - 1];
      navigator.push('NewsDetail', { postId: id });
    },
    [navigator]
  );

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url && getNewsList.isLoading) {
        getPostId(url);
      }
    });
    const subscription = Linking.addEventListener('url', ({ url }) => {
      if (url && getNewsList.data) {
        getPostId(url);
      }
    });

    return subscription.remove;
  }, [getNewsList, getPostId]);

  const newsList = useMemo(
    () =>
      getNewsList.isSuccess
        ? getNewsList.data?.pages
            .map((page) => page.data)
            .flat()
            .filter((newsItem) => {
              const specializations =
                newsItem.attributes?.specializations?.data.map(
                  (specialization) => specialization.attributes.name
                );

              return specializations?.some((value) =>
                userSpecialties?.includes(value)
              );
            })
        : undefined,
    [getNewsList]
  );

  const onEndReached = useCallback(
    () => getNewsList.fetchNextPage(),
    [getNewsList]
  );

  const renderItem: ListRenderItem<INewsItem> = useCallback(({ item }) => {
    return <NewsCard item={item} />;
  }, []);

  return (
    <Root>
      <HeaderSalamander />
      <FlatList<INewsItem>
        data={newsList}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
        ListEmptyComponent={
          getNewsList.isLoading ? (
            <ActivityIndicator color={theme.colors.orange} size={'large'} />
          ) : errorMessage === 'Network Error' ? (
            <Disconnection onPress={getNewsList.refetch} isFullScreen={false} />
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={getNewsList.isRefetching}
            onRefresh={getNewsList.refetch}
          />
        }
        contentContainerStyle={!newsList?.length && styles.emptyList}
        style={styles.list}
      />
    </Root>
  );
};
