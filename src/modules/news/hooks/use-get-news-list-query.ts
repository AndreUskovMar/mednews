import { useInfiniteQuery } from 'react-query';
import { axiosStrapiClient } from 'services/api/axiosStrapiClient';
import * as qs from 'qs';
import {
  GetNewsListResponse,
  GetNewsListParams,
} from 'modules/news/types/news-api.types';

const GET_NEWS_LIST_CACHE_KEY = 'GET_NEWS_LIST';

export const useGetNewsListQuery = () => {
  return useInfiniteQuery<GetNewsListResponse>(
    [GET_NEWS_LIST_CACHE_KEY],
    async ({ pageParam = 1 }: GetNewsListParams) => {
      const query = qs.stringify(
        {
          populate: ['teaserImage', 'brand', 'specializations'],
          sort: 'publishedAt:desc',
          pagination: {
            page: pageParam,
            pageSize: 100,
          },
        },
        {
          encodeValuesOnly: true,
        }
      );

      return await axiosStrapiClient.get(`/api/posts?${query}`);
    },
    {
      getNextPageParam: ({ meta }: GetNewsListResponse) => {
        if (meta.pagination.page < meta.pagination.total) {
          return meta.pagination.page + 1;
        }
      },
    }
  );
};
