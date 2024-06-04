import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosResponse } from 'axios';

import { axiosStrapiClient } from 'services/api/axiosStrapiClient';

import { ICalendarItem } from 'modules/calendar/types/calendar-api.types';

const GET_CALENDAR_BY_ID_CACHE_KEY = 'GET_CALENDAR_BY_ID';

type ResponseType = AxiosResponse<ICalendarItem>;

export const useGetCalendarByIdQuery = (
  eventId: string,
  options?: UseQueryOptions<ResponseType, Error, ResponseType, [string, string]>
) => {
  return useQuery(
    [GET_CALENDAR_BY_ID_CACHE_KEY, eventId],
    async () => {
      return await axiosStrapiClient.get(`/api/events/${eventId}`);
    },
    options
  );
};
