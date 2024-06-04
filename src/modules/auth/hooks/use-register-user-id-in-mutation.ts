import { useMutation } from 'react-query';
import firestore from '@react-native-firebase/firestore';

export const useRegisterUserIdInMutation = () => {
  return useMutation(async (userId: string) => {
    const response = await firestore().collection('users').doc(userId).get();
    if (!response.exists) {
      await firestore().collection('users').doc(userId).set({});
    }
  });
};
