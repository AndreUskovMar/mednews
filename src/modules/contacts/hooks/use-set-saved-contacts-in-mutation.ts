import { useMutation, useQueryClient } from 'react-query';
import firestore from '@react-native-firebase/firestore';

import { GET_SAVED_CONTACTS_LIST_CACHE_KEY } from './use-get-saved-contacts-list-query';

type RequestType = {
  contacts: Array<number>;
  userId: string;
};

export const useSetSavedContactsInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: RequestType) => {
      return firestore()
        .collection('users')
        .doc(data.userId)
        .update({ contacts: data.contacts });
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(GET_SAVED_CONTACTS_LIST_CACHE_KEY);
      },
      onError: (error, context) => {
        queryClient.setQueryData(GET_SAVED_CONTACTS_LIST_CACHE_KEY, context);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(GET_SAVED_CONTACTS_LIST_CACHE_KEY);
      },
    }
  );
};
