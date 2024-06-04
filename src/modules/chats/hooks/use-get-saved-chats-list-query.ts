import { useQuery, UseQueryOptions } from 'react-query';
import firestore from '@react-native-firebase/firestore';

export const GET_SAVED_CHATS_LIST_CACHE_KEY = 'GET_SAVED_CHATS_LIST';

export const useGetSavedChatsListQuery = (
  userId: string,
  options?:
    | UseQueryOptions<Array<string>, Error, Array<string>, [string, string]>
    | undefined
) => {
  return useQuery(
    [GET_SAVED_CHATS_LIST_CACHE_KEY, userId],
    async () => {
      const response = (
        await firestore().collection('users').doc(userId).get()
      ).data();
      return response?.chats;
    },
    options
  );
};
