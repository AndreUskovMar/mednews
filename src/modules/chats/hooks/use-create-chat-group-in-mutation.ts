import { useMutation } from 'react-query';
import firestore from '@react-native-firebase/firestore';
import { IChatItem } from 'modules/chats/types/chats-api.types';

export const useCreateChatGroupInMutation = () => {
  return useMutation((data: IChatItem) => {
    return firestore().collection('groups').doc(data.id).set(data);
  });
};
