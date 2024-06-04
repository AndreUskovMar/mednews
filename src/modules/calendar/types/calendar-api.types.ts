export type ICalendarItem = {
  id: number;
  attributes: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    organizer: string;
    location: string;
    website: string;
    type: string;
    cmeStatus: string;
    cmePoints: number;
  };
};

export type ListMetaResponse = {
  pagination: {
    total: number;
    page: number;
  };
};

export type GetCalendarListParams = {
  pageParam?: number;
};

export type GetCalendarListResponse = {
  data: Array<ICalendarItem>;
  meta: ListMetaResponse;
};
