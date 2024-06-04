import { useQuery, UseQueryOptions } from 'react-query';
import { useNetInfo } from '@react-native-community/netinfo';
import firestore from '@react-native-firebase/firestore';

import { IProfileType } from 'modules/profile/types/profile-api.types';

export const GET_PROFILE_BY_ID_CACHE_KEY = 'GET_PROFILE_BY_ID';

export type ProfileResponseType = IProfileType | undefined;

export const useGetProfileByIdQuery = (
  userId: string,
  options?: UseQueryOptions<
    IProfileType,
    Error,
    ProfileResponseType,
    [string, string]
  >
) => {
  const netInfo = useNetInfo();

  return useQuery(
    [GET_PROFILE_BY_ID_CACHE_KEY, userId],
    async () => {
      if (!netInfo.isConnected && netInfo.type !== 'unknown') {
        throw new Error('Network Error');
      }

      const response = (
        await firestore().collection('users').doc(userId).get()
      ).data();

      return response?.profile;
    },
    options
  );
};
