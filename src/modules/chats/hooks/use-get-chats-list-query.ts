import { useQuery, UseQueryOptions } from 'react-query';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const GET_CHATS_LIST_CACHE_KEY = 'GET_CHATS_LIST';

export const useGetChatsListQuery = (
  savedChatsList: Array<string>,
  options?: UseQueryOptions<
    FirebaseFirestoreTypes.DocumentData,
    Error,
    FirebaseFirestoreTypes.DocumentData,
    [string, Array<string>]
  >
) => {
  return useQuery(
    [GET_CHATS_LIST_CACHE_KEY, savedChatsList],
    async () => {
      return firestore().collection('groups').where('id', 'in', savedChatsList);
    },
    options
  );
};
