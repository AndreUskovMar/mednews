import { useMutation } from 'react-query';
import firestore from '@react-native-firebase/firestore';

export const useSetChatMessageInMutation = () => {
  return useMutation(async (data: any) => {
    return firestore()
      .collection('messages')
      .doc(data.chatId)
      .collection('data')
      .add(data);
  });
};
