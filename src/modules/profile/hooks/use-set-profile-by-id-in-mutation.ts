import { useMutation, useQueryClient } from 'react-query';
import firestore from '@react-native-firebase/firestore';

import { GET_PROFILE_BY_ID_CACHE_KEY } from './use-get-profile-by-id-query';
import { IProfileType } from 'modules/profile/types/profile-api.types';

type RequestType = {
  profile: IProfileType;
  userId: string;
};

export const useSetProfileByIdInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: RequestType) => {
      return firestore()
        .collection('users')
        .doc(data.userId)
        .update({ profile: data.profile });
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(GET_PROFILE_BY_ID_CACHE_KEY);
      },
      onError: (error, context) => {
        queryClient.setQueryData(GET_PROFILE_BY_ID_CACHE_KEY, context);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(GET_PROFILE_BY_ID_CACHE_KEY);
      },
    }
  );
};
