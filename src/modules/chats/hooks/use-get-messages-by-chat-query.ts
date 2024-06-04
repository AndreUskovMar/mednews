import { useQuery, UseQueryOptions } from 'react-query';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { useNetInfo } from '@react-native-community/netinfo';

const GET_MESSAGES_BY_CHAT_CACHE_KEY = 'GET_MESSAGES_BY_CHAT';

export const useGetMessagesByChatQuery = (
  chatId: string,
  options?: UseQueryOptions<
    FirebaseFirestoreTypes.DocumentData,
    Error,
    FirebaseFirestoreTypes.DocumentData,
    [string, string]
  >
) => {
  const netInfo = useNetInfo();

  return useQuery(
    [GET_MESSAGES_BY_CHAT_CACHE_KEY, chatId],
    () => {
      if (!netInfo.isConnected && netInfo.type !== 'unknown') {
        throw new Error('Network Error');
      }

      return firestore()
        .collection('messages')
        .doc(chatId)
        .collection('data')
        .orderBy('updatedAt', 'desc');
    },
    options
  );
};
