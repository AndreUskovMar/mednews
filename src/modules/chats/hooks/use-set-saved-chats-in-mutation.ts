import { useMutation, useQueryClient } from 'react-query';
import firestore from '@react-native-firebase/firestore';

import { GET_SAVED_CHATS_LIST_CACHE_KEY } from './use-get-saved-chats-list-query';

type RequestType = {
  chats: Array<string>;
  userId: string;
};

export const useSetSavedChatsInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: RequestType) => {
      return firestore()
        .collection('users')
        .doc(data.userId)
        .update({ chats: data.chats });
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(GET_SAVED_CHATS_LIST_CACHE_KEY);
      },
      onError: (error, context) => {
        queryClient.setQueryData(GET_SAVED_CHATS_LIST_CACHE_KEY, context);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(GET_SAVED_CHATS_LIST_CACHE_KEY);
      },
    }
  );
};
