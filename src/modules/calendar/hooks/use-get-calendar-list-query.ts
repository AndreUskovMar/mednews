import { useInfiniteQuery } from 'react-query';
import { axiosStrapiClient } from 'services/api/axiosStrapiClient';
import * as qs from 'qs';
import {
  GetCalendarListResponse,
  GetCalendarListParams,
} from 'modules/calendar/types/calendar-api.types';
import { format, endOfDay } from 'date-fns';

const GET_CALENDAR_LIST_CACHE_KEY = 'GET_CALENDAR_LIST';

export const useGetCalendarListQuery = () => {
  return useInfiniteQuery<GetCalendarListResponse>(
    [GET_CALENDAR_LIST_CACHE_KEY],
    async ({ pageParam = 1 }: GetCalendarListParams) => {
      const endDate = format(endOfDay(new Date()), "yyyy-MM-dd'T'HH:mm:ss'Z'");
      const query = qs.stringify(
        {
          sort: 'startDate:asc',
          pagination: {
            page: pageParam,
            pageSize: 25,
          },
          filters: {
            endDate: {
              $gt: endDate,
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );

      return await axiosStrapiClient.get(`/api/events?${query}`);
    },
    {
      getNextPageParam: ({ meta }: GetCalendarListResponse) => {
        if (meta.pagination.page < meta.pagination.total) {
          return meta.pagination.page + 1;
        }
      },
    }
  );
};
