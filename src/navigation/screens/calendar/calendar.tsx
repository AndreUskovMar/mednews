import React, { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import { useTheme } from 'styled-components';

// components
import { Disconnection, Header } from 'modules/core/components';
import {
  EventsQuantity,
  Root,
  EmptyResultMessage,
  styles,
} from './calendar.styled';
import { CalendarCard } from 'modules/calendar/components';

// hooks
import { useGetCalendarListQuery } from 'modules/calendar/hooks/use-get-calendar-list-query';

// utils
import { getErrorMessage } from 'modules/core/utils';

import { ICalendarItem } from 'modules/calendar/types/calendar-api.types';

export const Calendar = () => {
  const theme = useTheme();
  const getCalendarList = useGetCalendarListQuery();
  const errorMessage = getErrorMessage(getCalendarList.error);

  const calendarList = useMemo(
    () =>
      getCalendarList.isSuccess
        ? getCalendarList.data?.pages
            .map((page) => {
              return page.data;
            })
            .flat()
        : undefined,
    [getCalendarList]
  );

  const onEndReached = useCallback(
    () => getCalendarList.fetchNextPage(),
    [getCalendarList]
  );

  const renderItem: ListRenderItem<ICalendarItem> = useCallback(({ item }) => {
    return <CalendarCard item={item} />;
  }, []);

  return (
    <Root>
      <Header
        name={'Kalender'}
        color={theme.colors.orange}
        displayBackButton={false}
      />

      {!getCalendarList.isLoading && !errorMessage && (
        <EventsQuantity>
          {getCalendarList.data?.pages[0].meta.pagination.total}{' '}
          {'Fortbildungen'}
        </EventsQuantity>
      )}

      <FlatList<ICalendarItem>
        data={calendarList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
        ListEmptyComponent={
          getCalendarList.isLoading ? (
            <ActivityIndicator color={theme.colors.orange} size={'large'} />
          ) : errorMessage === 'Network Error' ? (
            <Disconnection
              onPress={getCalendarList.refetch}
              isFullScreen={false}
            />
          ) : (
            <EmptyResultMessage>
              {'Es sind noch keine Fortbildungen verfügbar.'}
            </EmptyResultMessage>
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={getCalendarList.isRefetching}
            onRefresh={getCalendarList.refetch}
          />
        }
        contentContainerStyle={!calendarList?.length && styles.emptyList}
        style={styles.list}
      />
    </Root>
  );
};
