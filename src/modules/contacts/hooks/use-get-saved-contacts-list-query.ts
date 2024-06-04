import { useQuery, UseQueryOptions } from 'react-query';
import firestore from '@react-native-firebase/firestore';

export const GET_SAVED_CONTACTS_LIST_CACHE_KEY = 'GET_SAVED_CONTACTS_LIST';

export const useGetSavedContactsListQuery = (
  userId: string,
  options?:
    | UseQueryOptions<Array<number>, Error, Array<number>, [string, string]>
    | undefined
) => {
  return useQuery(
    [GET_SAVED_CONTACTS_LIST_CACHE_KEY, userId],
    async () => {
      const response = (
        await firestore().collection('users').doc(userId).get()
      ).data();
      return response?.contacts;
    },
    options
  );
};
