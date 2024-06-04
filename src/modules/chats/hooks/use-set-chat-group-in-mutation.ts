import { useMutation } from 'react-query';
import firestore from '@react-native-firebase/firestore';
import { IChatGroupListItem } from 'modules/chats/components/chat-list-item/chat-list-item.interface';

export const useSetChatGroupInMutation = () => {
  return useMutation((data: IChatGroupListItem) => {
    if (!data.recentMessage) {
      return firestore().collection('groups').doc(data.id).set(data);
    }
    return firestore().collection('groups').doc(data.id).update(data);
  });
};
