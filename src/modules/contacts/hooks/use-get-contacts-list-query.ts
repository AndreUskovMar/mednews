import { useQuery } from 'react-query';
import * as qs from 'qs';
import { axiosStrapiClient } from 'services/api/axiosStrapiClient';

const GET_CONTACTS_LIST_CACHE_KEY = 'GET_CONTACTS_LIST';

export const useGetContactsListQuery = () => {
  return useQuery([GET_CONTACTS_LIST_CACHE_KEY], async () => {
    const query = qs.stringify(
      {
        populate: ['brand', 'role', 'image'],
        sort: 'name:asc',
        filters: {
          role: {
            type: {
              $contains: 'sales',
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    return await axiosStrapiClient.get(`/api/users?${query}`);
  });
};
