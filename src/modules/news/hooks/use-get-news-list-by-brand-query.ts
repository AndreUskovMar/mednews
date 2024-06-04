import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosResponse } from 'axios';
import * as qs from 'qs';

import { axiosStrapiClient } from 'services/api/axiosStrapiClient';

import { INewsItem } from 'modules/news/types/news-api.types';

const GET_NEWS_LIST_BY_BRAND_CACHE_KEY = 'GET_NEWS_LIST_BY_BRAND';

type ResponseType = AxiosResponse<Array<INewsItem>>;

export const useGetNewsListByBrandQuery = (
  brandId: number,
  options?: UseQueryOptions<ResponseType, Error, ResponseType, [string, number]>
) => {
  return useQuery(
    [GET_NEWS_LIST_BY_BRAND_CACHE_KEY, brandId],
    async () => {
      const query = qs.stringify(
        {
          populate: ['teaserImage', 'images', 'brand', 'videos'],
          filters: {
            brand: {
              id: brandId,
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );
      return await axiosStrapiClient.get(`/api/posts?${query}`);
    },
    options
  );
};
