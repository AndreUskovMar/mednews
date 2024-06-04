import { useMutation } from 'react-query';
import Config from 'react-native-config';
import { AxiosResponse } from 'axios';
import { axiosClient, OAUTH_PATH } from 'services/api/axiosClinet';
import { AuthResponse } from 'modules/auth/redux/auth.types';

export const useAuthUserByCodeInMutation = () => {
  return useMutation<AxiosResponse<AuthResponse>, Error, string>(
    (code: string) =>
      axiosClient.get(
        `${OAUTH_PATH}/?client_id=${Config.DC_CLIENT_ID}&client_secret=${Config.DC_SECRET}&code=${code}&grant_type=authorization_code`
      )
  );
};
